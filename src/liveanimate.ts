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
    // Perform alternative code to handle missing library
    return;
  } else {
    hotkeys.registerGroup({
      name: 'liveanimate.animate', // <- Must be unique
      label: 'Live Animate',
      description: 'Hot keys for the live animate module' // <-- Optional
    });
    // @ts-ignore
    hotkeys.registerShortcut({
      name: "liveanimate.animate",
      label: "Animate",
      group: 'liveanimate.animate',
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

function hookDragHandlers(entityType) {
  entityType.prototype.animateMovement = (function () {
    const original = entityType.prototype.animateMovement;
    return function (ray) {
      const TokenDocument = this.document;
      if (TokenDocument.getFlag("world", "isLiveAnimate")) {
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
  entityType.prototype._onDragLeftStart = function (event) {
    this.document.setFlag("world", "isLiveAnimate", false);
    originalDragLeftStartHandler.call(this, event);
    if (isBeingPressed || animationLock) {
      offset.x = this.center.x - this.x;
      offset.y = this.center.y - this.y;
      isBeingPressed ? (animationLock = true) : (animationLock = false);
      const tokenDocument = this.document;
      const token = tokenDocument._object as Token;
      const destination = event.data.destination;
      tokenDocument.setFlag("world", "isLiveAnimate", true);
      token.data.x = destination.x - offset.x;
      token.data.y = destination.y - offset.y;
      tokenDocument.update(token.data);
    }
  };

  const originalDragLeftMoveHandler = entityType.prototype._onDragLeftMove;
  entityType.prototype._onDragLeftMove = async function (event) {
    if (isBeingPressed || animationLock) {
      const isToken = this instanceof Token;
      if (isToken) {
        const tokenDocument = this.document;
        const token = tokenDocument._object as Token;
        const destination = event.data.destination;
        tokenDocument.setFlag("world", "isLiveAnimate", true);
        token.data.x = destination.x - offset.x;
        token.data.y = destination.y - offset.y;
        tokenDocument.update(token.data);
      }
    } else {
      originalDragLeftMoveHandler.call(this, event);
    }
  };

  const originalDragLeftDropHandler = entityType.prototype._onDragLeftDrop;

  entityType.prototype._onDragLeftDrop = function (event) {
    if (isBeingPressed || animationLock) {
      animationLock = false;
      this.document.setFlag("world", "isLiveAnimate", true);
    } else originalDragLeftDropHandler.call(this, event);
  };

  // const originalOnClickLeftHandler = entityType.prototype._onClickLeft;
  // entityType.prototype._onClickLeft = function (event) {
  //   originalOnClickLeftHandler.call(this, event);
  //   if (isBeingPressed) {
  //     console.log(document.onmousemove)
  //     console.log("CLICK SPECIAL");
  //     const token = this as Token;
      
  //     console.log(token.mouseInteractionManager?.handlers);
  //   } 
  // };
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
