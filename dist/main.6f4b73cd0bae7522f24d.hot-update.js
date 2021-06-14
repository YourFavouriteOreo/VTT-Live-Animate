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
/******/ 	__webpack_require__.h = () => ("d611409ae771c59e6167")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXZlYW5pbWF0ZS8uL3NyYy9saXZlYW5pbWF0ZS50cyIsIndlYnBhY2s6Ly9saXZlYW5pbWF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQXNFO0FBQ25CO0FBQ25ELElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQixNQUFNLE1BQU0sR0FBRztJQUNiLENBQUMsRUFBRSxDQUFDO0lBQ0osQ0FBQyxFQUFFLENBQUM7Q0FDTCxDQUFDO0FBQ0YsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBRTNCLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsdUVBQXVFLENBQ3hFLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUN0QixnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTs7SUFDdkIsSUFBSSxDQUFDLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLDBDQUFFLE1BQU0sR0FBRTtRQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxVQUFJLENBQUMsSUFBSSwwQ0FBRSxJQUFJO1lBQ2pCLFFBQUUsQ0FBQyxhQUFhLDBDQUFFLEtBQUssQ0FDckIscUdBQXFHLENBQ3RHLENBQUM7UUFDSixxREFBcUQ7UUFDckQsT0FBTztLQUNSO1NBQU07UUFDTCxhQUFhO1FBQ2IsNkVBQXdCLENBQUM7WUFDdkIsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFPLEVBQUU7Z0JBQ1AsR0FBRyxFQUFFLHNFQUFpQjtn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O0NBQ0Y7Ozs7Ozs7Ozs7O1VDdEpELHNEIiwiZmlsZSI6Im1haW4uNmY0YjczY2QwYmFlNzUyMmYyNGQuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUHJlbG9hZGVyIH0gZnJvbSBcIi4vbW9kdWxlL2hlbHBlci9UZW1wbGF0ZVByZWxvYWRlclwiO1xyXG5pbXBvcnQgeyBob3RrZXlzIH0gZnJvbSBcIi4vbGliLWRmLWhvdGtleXMuc2hpbS5qc1wiO1xyXG5sZXQgYW5pbWF0aW9uTG9jayA9IGZhbHNlO1xyXG5jb25zdCBvZmZzZXQgPSB7XHJcbiAgeDogMCxcclxuICB5OiAwLFxyXG59O1xyXG5sZXQgaXNCZWluZ1ByZXNzZWQgPSBmYWxzZTtcclxuXHJcbkhvb2tzLm9uY2UoXCJpbml0XCIsIGZ1bmN0aW9uICgpIHtcclxuICBjb25zb2xlLmxvZyhcclxuICAgIFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1MaXZlIEFuaW1hdGU9PT09PT09PT09PT09PT09PT09PT09PT09PT09XCJcclxuICApO1xyXG59KTtcclxuXHJcbkhvb2tzLm9uY2UoXCJpbml0XCIsICgpID0+IHtcclxuICBob29rRHJhZ0hhbmRsZXJzKFRva2VuKTtcclxufSk7XHJcblxyXG5Ib29rcy5vbmNlKFwicmVhZHlcIiwgKCkgPT4ge1xyXG4gIGlmICghZ2FtZS5tb2R1bGVzLmdldChcImxpYi1kZi1ob3RrZXlzXCIpPy5hY3RpdmUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJNaXNzaW5nIGxpYi1kZi1ob3RrZXlzIG1vZHVsZSBkZXBlbmRlbmN5XCIpO1xyXG4gICAgaWYgKGdhbWUudXNlcj8uaXNHTSlcclxuICAgICAgdWkubm90aWZpY2F0aW9ucz8uZXJyb3IoXHJcbiAgICAgICAgXCInTXkgTW9kdWxlJyByZXF1aXJlcyB0aGUgJ0xpYnJhcnk6IERGIEhvdGtleXMnIG1vZHVsZS4gUGxlYXNlIGluc3RhbGwgYW5kIGFjdGl2YXRlIHRoaXMgZGVwZW5kZW5jeS5cIlxyXG4gICAgICApO1xyXG4gICAgLy8gUGVyZm9ybSBhbHRlcm5hdGl2ZSBjb2RlIHRvIGhhbmRsZSBtaXNzaW5nIGxpYnJhcnlcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgaG90a2V5cy5yZWdpc3RlclNob3J0Y3V0KHtcclxuICAgICAgbmFtZTogXCJsaXZlYW5pbWF0ZS5hbmltYXRlXCIsXHJcbiAgICAgIGxhYmVsOiBcIkFuaW1hdGVcIixcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIGtleTogaG90a2V5cy5rZXlzLktleVQsXHJcbiAgICAgICAgYWx0OiBmYWxzZSxcclxuICAgICAgICBjdHJsOiBmYWxzZSxcclxuICAgICAgICBzaGlmdDogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIG9uS2V5RG93bjogKCkgPT4ge1xyXG4gICAgICAgIGlzQmVpbmdQcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgICAgb25LZXlVcDogKCkgPT4ge1xyXG4gICAgICAgIGlzQmVpbmdQcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaG9va0RyYWdIYW5kbGVycyhlbnRpdHlUeXBlKSB7XHJcbiAgZW50aXR5VHlwZS5wcm90b3R5cGUuYW5pbWF0ZU1vdmVtZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IG9yaWdpbmFsID0gZW50aXR5VHlwZS5wcm90b3R5cGUuYW5pbWF0ZU1vdmVtZW50O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyYXkpIHtcclxuICAgICAgY29uc3QgVG9rZW5Eb2N1bWVudCA9IHRoaXMuZG9jdW1lbnQ7XHJcbiAgICAgIGlmIChUb2tlbkRvY3VtZW50LmdldEZsYWcoXCJ3b3JsZFwiLCBcImlzTGl2ZUFuaW1hdGVcIikpIHtcclxuICAgICAgICB0aGlzLmRhdGEueCA9IHJheS5CLng7XHJcbiAgICAgICAgdGhpcy5kYXRhLnkgPSByYXkuQi55O1xyXG4gICAgICAgIHRoaXMuZGF0YS51cGRhdGUoeyB4OiByYXkuQi54LCB5OiByYXkuQi55IH0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU291cmNlKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibm9ybWFsIHJheVwiKTtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xyXG4gICAgICByZXR1cm4gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSkoKTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxEcmFnTGVmdFN0YXJ0SGFuZGxlciA9IGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0U3RhcnQ7XHJcbiAgZW50aXR5VHlwZS5wcm90b3R5cGUuX29uRHJhZ0xlZnRTdGFydCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgb3JpZ2luYWxEcmFnTGVmdFN0YXJ0SGFuZGxlci5jYWxsKHRoaXMsIGV2ZW50KTtcclxuICAgIGlmIChpc0JlaW5nUHJlc3NlZCB8fCBhbmltYXRpb25Mb2NrKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgICAgIG9mZnNldC54ID0gdGhpcy5jZW50ZXIueCAtIHRoaXMueDtcclxuICAgICAgb2Zmc2V0LnkgPSB0aGlzLmNlbnRlci55IC0gdGhpcy55O1xyXG4gICAgICBjb3VudCA9IDA7XHJcbiAgICAgIGlzQmVpbmdQcmVzc2VkID8gKGFuaW1hdGlvbkxvY2sgPSB0cnVlKSA6IChhbmltYXRpb25Mb2NrID0gZmFsc2UpO1xyXG4gICAgICBjb25zdCB0b2tlbkRvY3VtZW50ID0gdGhpcy5kb2N1bWVudDtcclxuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbkRvY3VtZW50Ll9vYmplY3QgYXMgVG9rZW47XHJcbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gZXZlbnQuZGF0YS5kZXN0aW5hdGlvbjtcclxuICAgICAgdG9rZW5Eb2N1bWVudC5zZXRGbGFnKFwid29ybGRcIiwgXCJpc0xpdmVBbmltYXRlXCIsIHRydWUpO1xyXG4gICAgICB0b2tlbi5kYXRhLnggPSBkZXN0aW5hdGlvbi54IC0gb2Zmc2V0Lng7XHJcbiAgICAgIHRva2VuLmRhdGEueSA9IGRlc3RpbmF0aW9uLnkgLSBvZmZzZXQueTtcclxuICAgICAgdG9rZW5Eb2N1bWVudC51cGRhdGUodG9rZW4uZGF0YSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxEcmFnTGVmdE1vdmVIYW5kbGVyID0gZW50aXR5VHlwZS5wcm90b3R5cGUuX29uRHJhZ0xlZnRNb3ZlO1xyXG4gIGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0TW92ZSA9IGFzeW5jIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKGlzQmVpbmdQcmVzc2VkIHx8IGFuaW1hdGlvbkxvY2spIHtcclxuICAgICAgY291bnQgKz0gMTtcclxuICAgICAgY29uc3QgaXNUb2tlbiA9IHRoaXMgaW5zdGFuY2VvZiBUb2tlbjtcclxuICAgICAgaWYgKGlzVG9rZW4pIHtcclxuICAgICAgICBjb25zdCB0b2tlbkRvY3VtZW50ID0gdGhpcy5kb2N1bWVudDtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHRva2VuRG9jdW1lbnQuX29iamVjdCBhcyBUb2tlbjtcclxuICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGV2ZW50LmRhdGEuZGVzdGluYXRpb247XHJcbiAgICAgICAgdG9rZW5Eb2N1bWVudC5zZXRGbGFnKFwid29ybGRcIiwgXCJpc0xpdmVBbmltYXRlXCIsIHRydWUpO1xyXG4gICAgICAgIHRva2VuLmRhdGEueCA9IGRlc3RpbmF0aW9uLnggLSBvZmZzZXQueDtcclxuICAgICAgICB0b2tlbi5kYXRhLnkgPSBkZXN0aW5hdGlvbi55IC0gb2Zmc2V0Lnk7XHJcbiAgICAgICAgdG9rZW5Eb2N1bWVudC51cGRhdGUodG9rZW4uZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9yaWdpbmFsRHJhZ0xlZnRNb3ZlSGFuZGxlci5jYWxsKHRoaXMsIGV2ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBvcmlnaW5hbERyYWdMZWZ0RHJvcEhhbmRsZXIgPSBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdERyb3A7XHJcblxyXG4gIGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0RHJvcCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKGlzQmVpbmdQcmVzc2VkIHx8IGFuaW1hdGlvbkxvY2spIHtcclxuICAgICAgYW5pbWF0aW9uTG9jayA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmRvY3VtZW50LnNldEZsYWcoXCJ3b3JsZFwiLCBcImlzTGl2ZUFuaW1hdGVcIiwgdHJ1ZSk7XHJcbiAgICB9IGVsc2Ugb3JpZ2luYWxEcmFnTGVmdERyb3BIYW5kbGVyLmNhbGwodGhpcywgZXZlbnQpO1xyXG4gIH07XHJcblxyXG4gIC8vIGNvbnN0IG9yaWdpbmFsT25DbGlja0xlZnRIYW5kbGVyID0gZW50aXR5VHlwZS5wcm90b3R5cGUuX29uQ2xpY2tMZWZ0O1xyXG4gIC8vIGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkNsaWNrTGVmdCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gIC8vICAgb3JpZ2luYWxPbkNsaWNrTGVmdEhhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgLy8gICBpZiAoaXNCZWluZ1ByZXNzZWQpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coZG9jdW1lbnQub25tb3VzZW1vdmUpXHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiQ0xJQ0sgU1BFQ0lBTFwiKTtcclxuICAvLyAgICAgY29uc3QgdG9rZW4gPSB0aGlzIGFzIFRva2VuO1xyXG4gICAgICBcclxuICAvLyAgICAgY29uc29sZS5sb2codG9rZW4ubW91c2VJbnRlcmFjdGlvbk1hbmFnZXI/LmhhbmRsZXJzKTtcclxuICAvLyAgIH0gXHJcbiAgLy8gfTtcclxufVxyXG5cclxuXHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xyXG4gIGlmIChtb2R1bGUuaG90KSB7XHJcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xyXG5cclxuICAgIGlmIChtb2R1bGUuaG90LnN0YXR1cygpID09PSBcImFwcGx5XCIpIHtcclxuICAgICAgZm9yIChjb25zdCB0ZW1wbGF0ZSBpbiBfdGVtcGxhdGVDYWNoZSkge1xyXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX3RlbXBsYXRlQ2FjaGUsIHRlbXBsYXRlKSkge1xyXG4gICAgICAgICAgZGVsZXRlIF90ZW1wbGF0ZUNhY2hlW3RlbXBsYXRlXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIFRlbXBsYXRlUHJlbG9hZGVyLnByZWxvYWRIYW5kbGViYXJzVGVtcGxhdGVzKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBhcHBsaWNhdGlvbiBpbiB1aS53aW5kb3dzKSB7XHJcbiAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHVpLndpbmRvd3MsIGFwcGxpY2F0aW9uKSkge1xyXG4gICAgICAgICAgICB1aS53aW5kb3dzW2FwcGxpY2F0aW9uXS5yZW5kZXIodHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZDYxMTQwOWFlNzcxYzU5ZTYxNjdcIikiXSwic291cmNlUm9vdCI6IiJ9