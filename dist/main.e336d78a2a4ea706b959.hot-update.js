self["webpackHotUpdateliveanimate"]("main",{

/***/ "./src/liveanimate.ts":
/*!****************************!*\
  !*** ./src/liveanimate.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_helper_TemplatePreloader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/helper/TemplatePreloader */ "./src/module/helper/TemplatePreloader.ts");
/* harmony import */ var _lib_df_hotkeys_shim_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib-df-hotkeys.shim.js */ "./src/lib-df-hotkeys.shim.js");


let count = 0;
let animationLock = false;
const offset = {
    x: 0,
    y: 0,
};
let isBeingPressed = false;
Hooks.once("init", function () {
    console.log("=============================Live Animate============================");
});
Hooks.once("init", () => {
    hookDragHandlers(Token);
});
Hooks.once("ready", () => {
    var _a, _b, _c;
    if (!((_a = game.modules.get("lib-df-hotkeys")) === null || _a === void 0 ? void 0 : _a.active)) {
        console.error("Missing lib-df-hotkeys module dependency");
        if ((_b = game.user) === null || _b === void 0 ? void 0 : _b.isGM)
            (_c = ui.notifications) === null || _c === void 0 ? void 0 : _c.error("'My Module' requires the 'Library: DF Hotkeys' module. Please install and activate this dependency.");
        // Perform alternative code to handle missing library
        return;
    }
    else {
        // @ts-ignore
        _lib_df_hotkeys_shim_js__WEBPACK_IMPORTED_MODULE_1__.hotkeys.registerShortcut({
            name: "liveanimate.animate",
            label: "Animate",
            default: {
                key: _lib_df_hotkeys_shim_js__WEBPACK_IMPORTED_MODULE_1__.hotkeys.keys.KeyT,
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
        originalDragLeftStartHandler.call(this, event);
        if (isBeingPressed || animationLock) {
            console.log(event);
            console.log(this);
            offset.x = this.center.x - this.x;
            offset.y = this.center.y - this.y;
            count = 0;
            isBeingPressed ? (animationLock = true) : (animationLock = false);
            const tokenDocument = this.document;
            const token = tokenDocument._object;
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
            count += 1;
            const isToken = this instanceof Token;
            if (isToken) {
                const tokenDocument = this.document;
                const token = tokenDocument._object;
                const destination = event.data.destination;
                tokenDocument.setFlag("world", "isLiveAnimate", true);
                token.data.x = destination.x - offset.x;
                token.data.y = destination.y - offset.y;
                tokenDocument.update(token.data);
            }
        }
        else {
            originalDragLeftMoveHandler.call(this, event);
        }
    };
    const originalDragLeftDropHandler = entityType.prototype._onDragLeftDrop;
    entityType.prototype._onDragLeftDrop = function (event) {
        if (isBeingPressed || animationLock) {
            console.log(count);
            animationLock = false;
            this.document.setFlag("world", "isLiveAnimate", true);
            console.log("alternative");
        }
        else
            originalDragLeftDropHandler.call(this, event);
    };
    const originalOnClickLeftHandler = entityType.prototype._onClickLeft;
    entityType.prototype._onClickLeft = function (event) {
        var _a, _b;
        if (isBeingPressed) {
            console.log("CLICK SPECIAL");
            const token = this;
            // @ts-ignore
            (_a = token.mouseInteractionManager) === null || _a === void 0 ? void 0 : _a.state = 3;
            console.log((_b = token.mouseInteractionManager) === null || _b === void 0 ? void 0 : _b.handlers.mousemove);
        }
        else {
            originalOnClickLeftHandler.call(this, event);
        }
    };
    // const originalDragLeftCancelHandler = entityType.prototype._onDragLeftCancel
    // entityType.prototype._onDragLeftCancel = function (event) {
    // 	const eventHandled = onEntityDragLeftCancel.call(this, event)
    // 	if (!eventHandled)
    // 		originalDragLeftCancelHandler.call(this, event)
    // }
}
// Hooks.once("canvasReady", async () => {
// const canvas = document.getElementById("board") as HTMLCanvasElement
//   console.log("testing");
//   const testTokenDocument = await game.scenes
//     ?.get("VQYlkveMWwN6hcFt")
//     ?.["tokens"].get("h1y2srljkhQXKUYN");
//   const testToken = testTokenDocument._object as Token;
//   setInterval(async () => {
//     console.log(`x position: ${testToken.data.x}`);
//     console.log(`y position: ${testToken.data.y}`);
// testToken.data.x = mousePosition.x+950
// testToken.data.y = mousePosition.y+640;
//     console.log(await testTokenDocument.update(testToken.data));
//   }, 1000);
// canvas.addEventListener('mousemove', function (evt) {
//     const mousePos = getMousePos(canvas, evt);
//     mousePosition = mousePos
//   }, false);
// });
// function getMousePos(canvas, evt) {
//     const rect = canvas.getBoundingClientRect();
//     return {
//       x: evt.clientX - rect.left,
//       y: evt.clientY - rect.top
//     };
//   }
if (true) {
    if (true) {
        module.hot.accept();
        if (module.hot.status() === "apply") {
            for (const template in _templateCache) {
                if (Object.prototype.hasOwnProperty.call(_templateCache, template)) {
                    delete _templateCache[template];
                }
            }
            _module_helper_TemplatePreloader__WEBPACK_IMPORTED_MODULE_0__.TemplatePreloader.preloadHandlebarsTemplates().then(() => {
                for (const application in ui.windows) {
                    if (Object.prototype.hasOwnProperty.call(ui.windows, application)) {
                        ui.windows[application].render(true);
                    }
                }
            });
        }
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("af629bbc47fdbcde3917")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXZlYW5pbWF0ZS8uL3NyYy9saXZlYW5pbWF0ZS50cyIsIndlYnBhY2s6Ly9saXZlYW5pbWF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQXNFO0FBQ25CO0FBRW5ELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNkLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQixNQUFNLE1BQU0sR0FBRztJQUNiLENBQUMsRUFBRSxDQUFDO0lBQ0osQ0FBQyxFQUFFLENBQUM7Q0FDTCxDQUFDO0FBQ0YsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBRTNCLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsdUVBQXVFLENBQ3hFLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUN0QixnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTs7SUFDdkIsSUFBSSxDQUFDLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLDBDQUFFLE1BQU0sR0FBRTtRQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxVQUFJLENBQUMsSUFBSSwwQ0FBRSxJQUFJO1lBQ2pCLFFBQUUsQ0FBQyxhQUFhLDBDQUFFLEtBQUssQ0FDckIscUdBQXFHLENBQ3RHLENBQUM7UUFDSixxREFBcUQ7UUFDckQsT0FBTztLQUNSO1NBQU07UUFDTCxhQUFhO1FBQ2IsNkVBQXdCLENBQUM7WUFDdkIsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFP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LDhCQUE4QjtBQUM5QixzREFBc0Q7QUFDdEQsc0RBQXNEO0FBQ3RELHlDQUF5QztBQUN6QywwQ0FBMEM7QUFDMUMsbUVBQW1FO0FBQ25FLGNBQWM7QUFFZCx3REFBd0Q7QUFDeEQsaURBQWlEO0FBQ2pELCtCQUErQjtBQUMvQixlQUFlO0FBQ2YsTUFBTTtBQUVOLHNDQUFzQztBQUN0QyxtREFBbUQ7QUFDbkQsZUFBZTtBQUNmLG9DQUFvQztBQUNwQyxrQ0FBa0M7QUFDbEMsU0FBUztBQUNULE1BQU07QUFFTixJQUFJLElBQXNDLEVBQUU7SUFDMUMsSUFBSSxJQUFVLEVBQUU7UUFDZCxpQkFBaUIsRUFBRSxDQUFDO1FBRXBCLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLE9BQU8sRUFBRTtZQUNuQyxLQUFLLE1BQU0sUUFBUSxJQUFJLGNBQWMsRUFBRTtnQkFDckMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxFQUFFO29CQUNsRSxPQUFPLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDakM7YUFDRjtZQUVELDBHQUE0QyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDdkQsS0FBSyxNQUFNLFdBQVcsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO29CQUNwQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxFQUFFO3dCQUNqRSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDdEM7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0tBQ0Y7Q0FDRjs7Ozs7Ozs7Ozs7VUMvTEQsc0QiLCJmaWxlIjoibWFpbi5lMzM2ZDc4YTJhNGVhNzA2Yjk1OS5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGVtcGxhdGVQcmVsb2FkZXIgfSBmcm9tIFwiLi9tb2R1bGUvaGVscGVyL1RlbXBsYXRlUHJlbG9hZGVyXCI7XHJcbmltcG9ydCB7IGhvdGtleXMgfSBmcm9tIFwiLi9saWItZGYtaG90a2V5cy5zaGltLmpzXCI7XHJcblxyXG5sZXQgY291bnQgPSAwO1xyXG5sZXQgYW5pbWF0aW9uTG9jayA9IGZhbHNlO1xyXG5jb25zdCBvZmZzZXQgPSB7XHJcbiAgeDogMCxcclxuICB5OiAwLFxyXG59O1xyXG5sZXQgaXNCZWluZ1ByZXNzZWQgPSBmYWxzZTtcclxuXHJcbkhvb2tzLm9uY2UoXCJpbml0XCIsIGZ1bmN0aW9uICgpIHtcclxuICBjb25zb2xlLmxvZyhcclxuICAgIFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1MaXZlIEFuaW1hdGU9PT09PT09PT09PT09PT09PT09PT09PT09PT09XCJcclxuICApO1xyXG59KTtcclxuXHJcbkhvb2tzLm9uY2UoXCJpbml0XCIsICgpID0+IHtcclxuICBob29rRHJhZ0hhbmRsZXJzKFRva2VuKTtcclxufSk7XHJcblxyXG5Ib29rcy5vbmNlKFwicmVhZHlcIiwgKCkgPT4ge1xyXG4gIGlmICghZ2FtZS5tb2R1bGVzLmdldChcImxpYi1kZi1ob3RrZXlzXCIpPy5hY3RpdmUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJNaXNzaW5nIGxpYi1kZi1ob3RrZXlzIG1vZHVsZSBkZXBlbmRlbmN5XCIpO1xyXG4gICAgaWYgKGdhbWUudXNlcj8uaXNHTSlcclxuICAgICAgdWkubm90aWZpY2F0aW9ucz8uZXJyb3IoXHJcbiAgICAgICAgXCInTXkgTW9kdWxlJyByZXF1aXJlcyB0aGUgJ0xpYnJhcnk6IERGIEhvdGtleXMnIG1vZHVsZS4gUGxlYXNlIGluc3RhbGwgYW5kIGFjdGl2YXRlIHRoaXMgZGVwZW5kZW5jeS5cIlxyXG4gICAgICApO1xyXG4gICAgLy8gUGVyZm9ybSBhbHRlcm5hdGl2ZSBjb2RlIHRvIGhhbmRsZSBtaXNzaW5nIGxpYnJhcnlcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgaG90a2V5cy5yZWdpc3RlclNob3J0Y3V0KHtcclxuICAgICAgbmFtZTogXCJsaXZlYW5pbWF0ZS5hbmltYXRlXCIsXHJcbiAgICAgIGxhYmVsOiBcIkFuaW1hdGVcIixcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIGtleTogaG90a2V5cy5rZXlzLktleVQsXHJcbiAgICAgICAgYWx0OiBmYWxzZSxcclxuICAgICAgICBjdHJsOiBmYWxzZSxcclxuICAgICAgICBzaGlmdDogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIG9uS2V5RG93bjogKCkgPT4ge1xyXG4gICAgICAgIGlzQmVpbmdQcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgICAgb25LZXlVcDogKCkgPT4ge1xyXG4gICAgICAgIGlzQmVpbmdQcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaG9va0RyYWdIYW5kbGVycyhlbnRpdHlUeXBlKSB7XHJcbiAgZW50aXR5VHlwZS5wcm90b3R5cGUuYW5pbWF0ZU1vdmVtZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IG9yaWdpbmFsID0gZW50aXR5VHlwZS5wcm90b3R5cGUuYW5pbWF0ZU1vdmVtZW50O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyYXkpIHtcclxuICAgICAgY29uc3QgVG9rZW5Eb2N1bWVudCA9IHRoaXMuZG9jdW1lbnQ7XHJcbiAgICAgIGlmIChUb2tlbkRvY3VtZW50LmdldEZsYWcoXCJ3b3JsZFwiLCBcImlzTGl2ZUFuaW1hdGVcIikpIHtcclxuICAgICAgICB0aGlzLmRhdGEueCA9IHJheS5CLng7XHJcbiAgICAgICAgdGhpcy5kYXRhLnkgPSByYXkuQi55O1xyXG4gICAgICAgIHRoaXMuZGF0YS51cGRhdGUoeyB4OiByYXkuQi54LCB5OiByYXkuQi55IH0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU291cmNlKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm9ybWFsIHJheVwiKTtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xyXG4gICAgICByZXR1cm4gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSkoKTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxEcmFnTGVmdFN0YXJ0SGFuZGxlciA9IGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0U3RhcnQ7XHJcbiAgZW50aXR5VHlwZS5wcm90b3R5cGUuX29uRHJhZ0xlZnRTdGFydCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgb3JpZ2luYWxEcmFnTGVmdFN0YXJ0SGFuZGxlci5jYWxsKHRoaXMsIGV2ZW50KTtcclxuICAgIGlmIChpc0JlaW5nUHJlc3NlZCB8fCBhbmltYXRpb25Mb2NrKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgIG9mZnNldC54ID0gdGhpcy5jZW50ZXIueCAtIHRoaXMueDtcclxuICAgICAgb2Zmc2V0LnkgPSB0aGlzLmNlbnRlci55IC0gdGhpcy55O1xyXG4gICAgICBjb3VudCA9IDA7XHJcbiAgICAgIGlzQmVpbmdQcmVzc2VkID8gKGFuaW1hdGlvbkxvY2sgPSB0cnVlKSA6IChhbmltYXRpb25Mb2NrID0gZmFsc2UpO1xyXG4gICAgICBjb25zdCB0b2tlbkRvY3VtZW50ID0gdGhpcy5kb2N1bWVudDtcclxuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbkRvY3VtZW50Ll9vYmplY3QgYXMgVG9rZW47XHJcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gZXZlbnQuZGF0YS5kZXN0aW5hdGlvbjtcclxuICAgICAgdG9rZW5Eb2N1bWVudC5zZXRGbGFnKFwid29ybGRcIiwgXCJpc0xpdmVBbmltYXRlXCIsIHRydWUpO1xyXG4gICAgICB0b2tlbi5kYXRhLnggPSBkZXN0aW5hdGlvbi54IC0gb2Zmc2V0Lng7XHJcbiAgICAgIHRva2VuLmRhdGEueSA9IGRlc3RpbmF0aW9uLnkgLSBvZmZzZXQueTtcclxuICAgICAgdG9rZW5Eb2N1bWVudC51cGRhdGUodG9rZW4uZGF0YSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxEcmFnTGVmdE1vdmVIYW5kbGVyID0gZW50aXR5VHlwZS5wcm90b3R5cGUuX29uRHJhZ0xlZnRNb3ZlO1xyXG4gIGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0TW92ZSA9IGFzeW5jIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKGlzQmVpbmdQcmVzc2VkIHx8IGFuaW1hdGlvbkxvY2spIHtcclxuICAgICAgY291bnQgKz0gMTtcclxuICAgICAgY29uc3QgaXNUb2tlbiA9IHRoaXMgaW5zdGFuY2VvZiBUb2tlbjtcclxuICAgICAgaWYgKGlzVG9rZW4pIHtcclxuICAgICAgICBjb25zdCB0b2tlbkRvY3VtZW50ID0gdGhpcy5kb2N1bWVudDtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHRva2VuRG9jdW1lbnQuX29iamVjdCBhcyBUb2tlbjtcclxuICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGV2ZW50LmRhdGEuZGVzdGluYXRpb247XHJcbiAgICAgICAgdG9rZW5Eb2N1bWVudC5zZXRGbGFnKFwid29ybGRcIiwgXCJpc0xpdmVBbmltYXRlXCIsIHRydWUpO1xyXG4gICAgICAgIHRva2VuLmRhdGEueCA9IGRlc3RpbmF0aW9uLnggLSBvZmZzZXQueDtcclxuICAgICAgICB0b2tlbi5kYXRhLnkgPSBkZXN0aW5hdGlvbi55IC0gb2Zmc2V0Lnk7XHJcbiAgICAgICAgdG9rZW5Eb2N1bWVudC51cGRhdGUodG9rZW4uZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9yaWdpbmFsRHJhZ0xlZnRNb3ZlSGFuZGxlci5jYWxsKHRoaXMsIGV2ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBvcmlnaW5hbERyYWdMZWZ0RHJvcEhhbmRsZXIgPSBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdERyb3A7XHJcblxyXG4gIGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0RHJvcCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKGlzQmVpbmdQcmVzc2VkIHx8IGFuaW1hdGlvbkxvY2spIHtcclxuICAgICAgY29uc29sZS5sb2coY291bnQpO1xyXG4gICAgICBhbmltYXRpb25Mb2NrID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZG9jdW1lbnQuc2V0RmxhZyhcIndvcmxkXCIsIFwiaXNMaXZlQW5pbWF0ZVwiLCB0cnVlKTtcclxuICAgICAgY29uc29sZS5sb2coXCJhbHRlcm5hdGl2ZVwiKTtcclxuICAgIH0gZWxzZSBvcmlnaW5hbERyYWdMZWZ0RHJvcEhhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxPbkNsaWNrTGVmdEhhbmRsZXIgPSBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25DbGlja0xlZnQ7XHJcbiAgZW50aXR5VHlwZS5wcm90b3R5cGUuX29uQ2xpY2tMZWZ0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAoaXNCZWluZ1ByZXNzZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJDTElDSyBTUEVDSUFMXCIpO1xyXG4gICAgICBjb25zdCB0b2tlbiA9IHRoaXMgYXMgVG9rZW47XHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgdG9rZW4ubW91c2VJbnRlcmFjdGlvbk1hbmFnZXI/LnN0YXRlID0gMztcclxuICAgICAgY29uc29sZS5sb2codG9rZW4ubW91c2VJbnRlcmFjdGlvbk1hbmFnZXI/LmhhbmRsZXJzLm1vdXNlbW92ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3JpZ2luYWxPbkNsaWNrTGVmdEhhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gY29uc3Qgb3JpZ2luYWxEcmFnTGVmdENhbmNlbEhhbmRsZXIgPSBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdENhbmNlbFxyXG4gIC8vIGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0Q2FuY2VsID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgLy8gXHRjb25zdCBldmVudEhhbmRsZWQgPSBvbkVudGl0eURyYWdMZWZ0Q2FuY2VsLmNhbGwodGhpcywgZXZlbnQpXHJcbiAgLy8gXHRpZiAoIWV2ZW50SGFuZGxlZClcclxuICAvLyBcdFx0b3JpZ2luYWxEcmFnTGVmdENhbmNlbEhhbmRsZXIuY2FsbCh0aGlzLCBldmVudClcclxuICAvLyB9XHJcbn1cclxuXHJcbi8vIEhvb2tzLm9uY2UoXCJjYW52YXNSZWFkeVwiLCBhc3luYyAoKSA9PiB7XHJcbi8vIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIikgYXMgSFRNTENhbnZhc0VsZW1lbnRcclxuXHJcbi8vICAgY29uc29sZS5sb2coXCJ0ZXN0aW5nXCIpO1xyXG4vLyAgIGNvbnN0IHRlc3RUb2tlbkRvY3VtZW50ID0gYXdhaXQgZ2FtZS5zY2VuZXNcclxuLy8gICAgID8uZ2V0KFwiVlFZbGt2ZU1Xd042aGNGdFwiKVxyXG4vLyAgICAgPy5bXCJ0b2tlbnNcIl0uZ2V0KFwiaDF5MnNybGpraFFYS1VZTlwiKTtcclxuLy8gICBjb25zdCB0ZXN0VG9rZW4gPSB0ZXN0VG9rZW5Eb2N1bWVudC5fb2JqZWN0IGFzIFRva2VuO1xyXG5cclxuLy8gICBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XHJcbi8vICAgICBjb25zb2xlLmxvZyhgeCBwb3NpdGlvbjogJHt0ZXN0VG9rZW4uZGF0YS54fWApO1xyXG4vLyAgICAgY29uc29sZS5sb2coYHkgcG9zaXRpb246ICR7dGVzdFRva2VuLmRhdGEueX1gKTtcclxuLy8gdGVzdFRva2VuLmRhdGEueCA9IG1vdXNlUG9zaXRpb24ueCs5NTBcclxuLy8gdGVzdFRva2VuLmRhdGEueSA9IG1vdXNlUG9zaXRpb24ueSs2NDA7XHJcbi8vICAgICBjb25zb2xlLmxvZyhhd2FpdCB0ZXN0VG9rZW5Eb2N1bWVudC51cGRhdGUodGVzdFRva2VuLmRhdGEpKTtcclxuLy8gICB9LCAxMDAwKTtcclxuXHJcbi8vIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZXZ0KSB7XHJcbi8vICAgICBjb25zdCBtb3VzZVBvcyA9IGdldE1vdXNlUG9zKGNhbnZhcywgZXZ0KTtcclxuLy8gICAgIG1vdXNlUG9zaXRpb24gPSBtb3VzZVBvc1xyXG4vLyAgIH0sIGZhbHNlKTtcclxuLy8gfSk7XHJcblxyXG4vLyBmdW5jdGlvbiBnZXRNb3VzZVBvcyhjYW52YXMsIGV2dCkge1xyXG4vLyAgICAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgIHg6IGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0LFxyXG4vLyAgICAgICB5OiBldnQuY2xpZW50WSAtIHJlY3QudG9wXHJcbi8vICAgICB9O1xyXG4vLyAgIH1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XHJcbiAgaWYgKG1vZHVsZS5ob3QpIHtcclxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XHJcblxyXG4gICAgaWYgKG1vZHVsZS5ob3Quc3RhdHVzKCkgPT09IFwiYXBwbHlcIikge1xyXG4gICAgICBmb3IgKGNvbnN0IHRlbXBsYXRlIGluIF90ZW1wbGF0ZUNhY2hlKSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfdGVtcGxhdGVDYWNoZSwgdGVtcGxhdGUpKSB7XHJcbiAgICAgICAgICBkZWxldGUgX3RlbXBsYXRlQ2FjaGVbdGVtcGxhdGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgVGVtcGxhdGVQcmVsb2FkZXIucHJlbG9hZEhhbmRsZWJhcnNUZW1wbGF0ZXMoKS50aGVuKCgpID0+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IGFwcGxpY2F0aW9uIGluIHVpLndpbmRvd3MpIHtcclxuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodWkud2luZG93cywgYXBwbGljYXRpb24pKSB7XHJcbiAgICAgICAgICAgIHVpLndpbmRvd3NbYXBwbGljYXRpb25dLnJlbmRlcih0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJhZjYyOWJiYzQ3ZmRiY2RlMzkxN1wiKSJdLCJzb3VyY2VSb290IjoiIn0=