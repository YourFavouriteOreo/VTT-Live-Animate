import { TemplatePreloader } from "./module/helper/TemplatePreloader";
import { hotkeys } from "./lib-df-hotkeys.shim.js";
let animationLock = false;
const offset = {
  x: 0,
  y: 0,
};
let isBeingPressed = false;

Hooks.once("init", function () {
  console.log(
    "=============================Live Animate============================"
  );
});

Hooks.once("init", () => {
  hookDragHandlers(Token);
});

Hooks.once("ready", () => {
  if (!game.modules.get("lib-df-hotkeys")?.active) {
    console.error("Missing lib-df-hotkeys module dependency");
    if (game.user?.isGM)
      ui.notifications?.error(
        "'My Module' requires the 'Library: DF Hotkeys' module. Please install and activate this dependency."
      );
    return;
  } else {
    hotkeys.registerGroup({
      name: "liveanimate.animate", 
      label: "Live Animate",
      description: "Hot keys for the live animate module", 
    });
    // @ts-ignore
    hotkeys.registerShortcut({
      name: "liveanimate.animate",
      label: "Animate",
      group: "liveanimate.animate",
      default: {
        key: hotkeys.keys.KeyE,
        alt: false,
        ctrl: false,
        shift: false,
      },
      onKeyDown: () => {
        isBeingPressed = true;
      },
      onKeyUp: () => {
        isBeingPressed = false;
      },
    });
  }
});

function moveToken(tokenDocument, x, y) {
  // Move Token accounting for offset inorder to center token on cursor
  const token = tokenDocument._object as Token;
  token.data.x = x - offset.x;
  token.data.y = y - offset.y;
  tokenDocument.update(token.data);
}

function hookDragHandlers(entityType) {
  entityType.prototype.animateMovement = (function () {
    const original = entityType.prototype.animateMovement;
    return function (ray) {
      const TokenDocument = this.document;
      if (TokenDocument.getFlag("world", "isLiveAnimate")) {
        // Skip animation movement
        this.data.x = ray.B.x;
        this.data.y = ray.B.y;
        this.data.update({ x: ray.B.x, y: ray.B.y });
        this.updateSource();
        return;
      }
      console.log("normal ray");
      // eslint-disable-next-line prefer-rest-params
      return original.apply(this, arguments);
    };
  })();

  const originalDragLeftStartHandler = entityType.prototype._onDragLeftStart;
  // This function is ran when foundry decides the token is being dragged
  entityType.prototype._onDragLeftStart = async function (event) {
    // Check for keybind and GM
    if (isBeingPressed && game.user?.isGM) {
      // Calculate Offset
      offset.x = this.center.x - this.x;
      offset.y = this.center.y - this.y;
      // Lock to live animate so that GM can let go of keybind and monologue
      isBeingPressed ? (animationLock = true) : (animationLock = false);
      const tokenDocument = this.document;
      const destination = event.data.destination;
      await tokenDocument.setFlag("world", "isLiveAnimate", true);
      tokenDocument.update(this.data);
      moveToken(tokenDocument, destination.x, destination.y);
    } else {
      await this.document.setFlag("world", "isLiveAnimate", false);
      originalDragLeftStartHandler.call(this, event);
    }
  };

  const originalDragLeftMoveHandler = entityType.prototype._onDragLeftMove;
  entityType.prototype._onDragLeftMove = async function (event) {
    // Check for animation lock and animate
    if (animationLock) {
      const isToken = this instanceof Token;
      if (isToken) {
        const destination = event.data.destination;
        moveToken(this.document,destination.x,destination.y)
      }
    } else {
      originalDragLeftMoveHandler.call(this, event);
    }
  };

  const originalDragLeftDropHandler = entityType.prototype._onDragLeftDrop;

  entityType.prototype._onDragLeftDrop = function (event) {
    if (animationLock) {
      animationLock = false;
      this.document.setFlag("world", "isLiveAnimate", true);
    } else originalDragLeftDropHandler.call(this, event);
  };
}

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();

    if (module.hot.status() === "apply") {
      for (const template in _templateCache) {
        if (Object.prototype.hasOwnProperty.call(_templateCache, template)) {
          delete _templateCache[template];
        }
      }

      TemplatePreloader.preloadHandlebarsTemplates().then(() => {
        for (const application in ui.windows) {
          if (Object.prototype.hasOwnProperty.call(ui.windows, application)) {
            ui.windows[application].render(true);
          }
        }
      });
    }
  }
}
