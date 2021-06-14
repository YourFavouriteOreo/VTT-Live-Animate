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
        _lib_df_hotkeys_shim_js__WEBPACK_IMPORTED_MODULE_1__.hotkeys.registerGroup({
            name: 'liveanimate.animate',
            label: 'Live Animate',
            description: 'Hot keys for the live animate module' // <-- Optional
        });
        // @ts-ignore
        _lib_df_hotkeys_shim_js__WEBPACK_IMPORTED_MODULE_1__.hotkeys.registerShortcut({
            name: "liveanimate.animate",
            label: "Animate",
            group: 'liveanimate.animate',
            default: {
                key: _lib_df_hotkeys_shim_js__WEBPACK_IMPORTED_MODULE_1__.hotkeys.keys.KeyE,
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
            animationLock = false;
            this.document.setFlag("world", "isLiveAnimate", true);
        }
        else
            originalDragLeftDropHandler.call(this, event);
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
/******/ 	__webpack_require__.h = () => ("9e6d1ee15b185d299c48")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXZlYW5pbWF0ZS8uL3NyYy9saXZlYW5pbWF0ZS50cyIsIndlYnBhY2s6Ly9saXZlYW5pbWF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQXNFO0FBQ25CO0FBQ25ELElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQixNQUFNLE1BQU0sR0FBRztJQUNiLENBQUMsRUFBRSxDQUFDO0lBQ0osQ0FBQyxFQUFFLENBQUM7Q0FDTCxDQUFDO0FBQ0YsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBRTNCLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsdUVBQXVFLENBQ3hFLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUN0QixnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTs7SUFDdkIsSUFBSSxDQUFDLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLDBDQUFFLE1BQU0sR0FBRTtRQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxVQUFJLENBQUMsSUFBSSwwQ0FBRSxJQUFJO1lBQ2pCLFFBQUUsQ0FBQyxhQUFhLDBDQUFFLEtBQUssQ0FDckIscUdBQXFHLENBQ3RHLENBQUM7UUFDSixxREFBcUQ7UUFDckQsT0FBTztLQUNSO1NBQU07UUFDTCwwRUFBcUIsQ0FBQztZQUNwQixJQUFJLEVBQUUscUJBQXFCO1lBQzNCLEtBQUssRUFBRSxjQUFjO1lBQ3JCLFdBQVcsRUFBRSxzQ0FBc0MsQ0FBQyxlQUFlO1NBQ3BFLENBQUMsQ0FBQztR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Q0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3RDO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtLQUNGO0NBQ0Y7Ozs7Ozs7Ozs7O1VDekpELHNEIiwiZmlsZSI6Im1haW4uNWE1YjBhZTc3N2RkNDg0OTkwMTcuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUHJlbG9hZGVyIH0gZnJvbSBcIi4vbW9kdWxlL2hlbHBlci9UZW1wbGF0ZVByZWxvYWRlclwiO1xyXG5pbXBvcnQgeyBob3RrZXlzIH0gZnJvbSBcIi4vbGliLWRmLWhvdGtleXMuc2hpbS5qc1wiO1xyXG5sZXQgYW5pbWF0aW9uTG9jayA9IGZhbHNlO1xyXG5jb25zdCBvZmZzZXQgPSB7XHJcbiAgeDogMCxcclxuICB5OiAwLFxyXG59O1xyXG5sZXQgaXNCZWluZ1ByZXNzZWQgPSBmYWxzZTtcclxuXHJcbkhvb2tzLm9uY2UoXCJpbml0XCIsIGZ1bmN0aW9uICgpIHtcclxuICBjb25zb2xlLmxvZyhcclxuICAgIFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1MaXZlIEFuaW1hdGU9PT09PT09PT09PT09PT09PT09PT09PT09PT09XCJcclxuICApO1xyXG59KTtcclxuXHJcbkhvb2tzLm9uY2UoXCJpbml0XCIsICgpID0+IHtcclxuICBob29rRHJhZ0hhbmRsZXJzKFRva2VuKTtcclxufSk7XHJcblxyXG5Ib29rcy5vbmNlKFwicmVhZHlcIiwgKCkgPT4ge1xyXG4gIGlmICghZ2FtZS5tb2R1bGVzLmdldChcImxpYi1kZi1ob3RrZXlzXCIpPy5hY3RpdmUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJNaXNzaW5nIGxpYi1kZi1ob3RrZXlzIG1vZHVsZSBkZXBlbmRlbmN5XCIpO1xyXG4gICAgaWYgKGdhbWUudXNlcj8uaXNHTSlcclxuICAgICAgdWkubm90aWZpY2F0aW9ucz8uZXJyb3IoXHJcbiAgICAgICAgXCInTXkgTW9kdWxlJyByZXF1aXJlcyB0aGUgJ0xpYnJhcnk6IERGIEhvdGtleXMnIG1vZHVsZS4gUGxlYXNlIGluc3RhbGwgYW5kIGFjdGl2YXRlIHRoaXMgZGVwZW5kZW5jeS5cIlxyXG4gICAgICApO1xyXG4gICAgLy8gUGVyZm9ybSBhbHRlcm5hdGl2ZSBjb2RlIHRvIGhhbmRsZSBtaXNzaW5nIGxpYnJhcnlcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgaG90a2V5cy5yZWdpc3Rlckdyb3VwKHtcclxuICAgICAgbmFtZTogJ2xpdmVhbmltYXRlLmFuaW1hdGUnLCAvLyA8LSBNdXN0IGJlIHVuaXF1ZVxyXG4gICAgICBsYWJlbDogJ0xpdmUgQW5pbWF0ZScsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnSG90IGtleXMgZm9yIHRoZSBsaXZlIGFuaW1hdGUgbW9kdWxlJyAvLyA8LS0gT3B0aW9uYWxcclxuICAgIH0pO1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgaG90a2V5cy5yZWdpc3RlclNob3J0Y3V0KHtcclxuICAgICAgbmFtZTogXCJsaXZlYW5pbWF0ZS5hbmltYXRlXCIsXHJcbiAgICAgIGxhYmVsOiBcIkFuaW1hdGVcIixcclxuICAgICAgZ3JvdXA6ICdsaXZlYW5pbWF0ZS5hbmltYXRlJyxcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIGtleTogaG90a2V5cy5rZXlzLktleUUsXHJcbiAgICAgICAgYWx0OiBmYWxzZSxcclxuICAgICAgICBjdHJsOiBmYWxzZSxcclxuICAgICAgICBzaGlmdDogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIG9uS2V5RG93bjogKCkgPT4ge1xyXG4gICAgICAgIGlzQmVpbmdQcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgICAgb25LZXlVcDogKCkgPT4ge1xyXG4gICAgICAgIGlzQmVpbmdQcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaG9va0RyYWdIYW5kbGVycyhlbnRpdHlUeXBlKSB7XHJcbiAgZW50aXR5VHlwZS5wcm90b3R5cGUuYW5pbWF0ZU1vdmVtZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IG9yaWdpbmFsID0gZW50aXR5VHlwZS5wcm90b3R5cGUuYW5pbWF0ZU1vdmVtZW50O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyYXkpIHtcclxuICAgICAgY29uc3QgVG9rZW5Eb2N1bWVudCA9IHRoaXMuZG9jdW1lbnQ7XHJcbiAgICAgIGlmIChUb2tlbkRvY3VtZW50LmdldEZsYWcoXCJ3b3JsZFwiLCBcImlzTGl2ZUFuaW1hdGVcIikpIHtcclxuICAgICAgICB0aGlzLmRhdGEueCA9IHJheS5CLng7XHJcbiAgICAgICAgdGhpcy5kYXRhLnkgPSByYXkuQi55O1xyXG4gICAgICAgIHRoaXMuZGF0YS51cGRhdGUoeyB4OiByYXkuQi54LCB5OiByYXkuQi55IH0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU291cmNlKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm9ybWFsIHJheVwiKTtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xyXG4gICAgICByZXR1cm4gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSkoKTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxEcmFnTGVmdFN0YXJ0SGFuZGxlciA9IGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0U3RhcnQ7XHJcbiAgZW50aXR5VHlwZS5wcm90b3R5cGUuX29uRHJhZ0xlZnRTdGFydCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgdGhpcy5kb2N1bWVudC5zZXRGbGFnKFwid29ybGRcIiwgXCJpc0xpdmVBbmltYXRlXCIsIGZhbHNlKTtcclxuICAgIG9yaWdpbmFsRHJhZ0xlZnRTdGFydEhhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICBpZiAoaXNCZWluZ1ByZXNzZWQgfHwgYW5pbWF0aW9uTG9jaykge1xyXG4gICAgICBvZmZzZXQueCA9IHRoaXMuY2VudGVyLnggLSB0aGlzLng7XHJcbiAgICAgIG9mZnNldC55ID0gdGhpcy5jZW50ZXIueSAtIHRoaXMueTtcclxuICAgICAgaXNCZWluZ1ByZXNzZWQgPyAoYW5pbWF0aW9uTG9jayA9IHRydWUpIDogKGFuaW1hdGlvbkxvY2sgPSBmYWxzZSk7XHJcbiAgICAgIGNvbnN0IHRva2VuRG9jdW1lbnQgPSB0aGlzLmRvY3VtZW50O1xyXG4gICAgICBjb25zdCB0b2tlbiA9IHRva2VuRG9jdW1lbnQuX29iamVjdCBhcyBUb2tlbjtcclxuICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBldmVudC5kYXRhLmRlc3RpbmF0aW9uO1xyXG4gICAgICB0b2tlbkRvY3VtZW50LnNldEZsYWcoXCJ3b3JsZFwiLCBcImlzTGl2ZUFuaW1hdGVcIiwgdHJ1ZSk7XHJcbiAgICAgIHRva2VuLmRhdGEueCA9IGRlc3RpbmF0aW9uLnggLSBvZmZzZXQueDtcclxuICAgICAgdG9rZW4uZGF0YS55ID0gZGVzdGluYXRpb24ueSAtIG9mZnNldC55O1xyXG4gICAgICB0b2tlbkRvY3VtZW50LnVwZGF0ZSh0b2tlbi5kYXRhKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBvcmlnaW5hbERyYWdMZWZ0TW92ZUhhbmRsZXIgPSBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdE1vdmU7XHJcbiAgZW50aXR5VHlwZS5wcm90b3R5cGUuX29uRHJhZ0xlZnRNb3ZlID0gYXN5bmMgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAoaXNCZWluZ1ByZXNzZWQgfHwgYW5pbWF0aW9uTG9jaykge1xyXG4gICAgICBjb25zdCBpc1Rva2VuID0gdGhpcyBpbnN0YW5jZW9mIFRva2VuO1xyXG4gICAgICBpZiAoaXNUb2tlbikge1xyXG4gICAgICAgIGNvbnN0IHRva2VuRG9jdW1lbnQgPSB0aGlzLmRvY3VtZW50O1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5Eb2N1bWVudC5fb2JqZWN0IGFzIFRva2VuO1xyXG4gICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gZXZlbnQuZGF0YS5kZXN0aW5hdGlvbjtcclxuICAgICAgICB0b2tlbkRvY3VtZW50LnNldEZsYWcoXCJ3b3JsZFwiLCBcImlzTGl2ZUFuaW1hdGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdG9rZW4uZGF0YS54ID0gZGVzdGluYXRpb24ueCAtIG9mZnNldC54O1xyXG4gICAgICAgIHRva2VuLmRhdGEueSA9IGRlc3RpbmF0aW9uLnkgLSBvZmZzZXQueTtcclxuICAgICAgICB0b2tlbkRvY3VtZW50LnVwZGF0ZSh0b2tlbi5kYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3JpZ2luYWxEcmFnTGVmdE1vdmVIYW5kbGVyLmNhbGwodGhpcywgZXZlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9yaWdpbmFsRHJhZ0xlZnREcm9wSGFuZGxlciA9IGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0RHJvcDtcclxuXHJcbiAgZW50aXR5VHlwZS5wcm90b3R5cGUuX29uRHJhZ0xlZnREcm9wID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAoaXNCZWluZ1ByZXNzZWQgfHwgYW5pbWF0aW9uTG9jaykge1xyXG4gICAgICBhbmltYXRpb25Mb2NrID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZG9jdW1lbnQuc2V0RmxhZyhcIndvcmxkXCIsIFwiaXNMaXZlQW5pbWF0ZVwiLCB0cnVlKTtcclxuICAgIH0gZWxzZSBvcmlnaW5hbERyYWdMZWZ0RHJvcEhhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gY29uc3Qgb3JpZ2luYWxPbkNsaWNrTGVmdEhhbmRsZXIgPSBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25DbGlja0xlZnQ7XHJcbiAgLy8gZW50aXR5VHlwZS5wcm90b3R5cGUuX29uQ2xpY2tMZWZ0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgLy8gICBvcmlnaW5hbE9uQ2xpY2tMZWZ0SGFuZGxlci5jYWxsKHRoaXMsIGV2ZW50KTtcclxuICAvLyAgIGlmIChpc0JlaW5nUHJlc3NlZCkge1xyXG4gIC8vICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5vbm1vdXNlbW92ZSlcclxuICAvLyAgICAgY29uc29sZS5sb2coXCJDTElDSyBTUEVDSUFMXCIpO1xyXG4gIC8vICAgICBjb25zdCB0b2tlbiA9IHRoaXMgYXMgVG9rZW47XHJcbiAgICAgIFxyXG4gIC8vICAgICBjb25zb2xlLmxvZyh0b2tlbi5tb3VzZUludGVyYWN0aW9uTWFuYWdlcj8uaGFuZGxlcnMpO1xyXG4gIC8vICAgfSBcclxuICAvLyB9O1xyXG59XHJcblxyXG5cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XHJcbiAgaWYgKG1vZHVsZS5ob3QpIHtcclxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XHJcblxyXG4gICAgaWYgKG1vZHVsZS5ob3Quc3RhdHVzKCkgPT09IFwiYXBwbHlcIikge1xyXG4gICAgICBmb3IgKGNvbnN0IHRlbXBsYXRlIGluIF90ZW1wbGF0ZUNhY2hlKSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfdGVtcGxhdGVDYWNoZSwgdGVtcGxhdGUpKSB7XHJcbiAgICAgICAgICBkZWxldGUgX3RlbXBsYXRlQ2FjaGVbdGVtcGxhdGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgVGVtcGxhdGVQcmVsb2FkZXIucHJlbG9hZEhhbmRsZWJhcnNUZW1wbGF0ZXMoKS50aGVuKCgpID0+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IGFwcGxpY2F0aW9uIGluIHVpLndpbmRvd3MpIHtcclxuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodWkud2luZG93cywgYXBwbGljYXRpb24pKSB7XHJcbiAgICAgICAgICAgIHVpLndpbmRvd3NbYXBwbGljYXRpb25dLnJlbmRlcih0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI5ZTZkMWVlMTViMTg1ZDI5OWM0OFwiKSJdLCJzb3VyY2VSb290IjoiIn0=