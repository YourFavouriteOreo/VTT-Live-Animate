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
/******/ 	__webpack_require__.h = () => ("02e5b025a45d7aa769f4")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXZlYW5pbWF0ZS8uL3NyYy9saXZlYW5pbWF0ZS50cyIsIndlYnBhY2s6Ly9saXZlYW5pbWF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQXNFO0FBQ25CO0FBQ25ELElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQixNQUFNLE1BQU0sR0FBRztJQUNiLENBQUMsRUFBRSxDQUFDO0lBQ0osQ0FBQyxFQUFFLENBQUM7Q0FDTCxDQUFDO0FBQ0YsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBRTNCLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsdUVBQXVFLENBQ3hFLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUN0QixnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTs7SUFDdkIsSUFBSSxDQUFDLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLDBDQUFFLE1BQU0sR0FBRTtRQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxVQUFJLENBQUMsSUFBSSwwQ0FBRSxJQUFJO1lBQ2pCLFFBQUUsQ0FBQyxhQUFhLDBDQUFFLEtBQUssQ0FDckIscUdBQXFHLENBQ3RHLENBQUM7UUFDSixxREFBcUQ7UUFDckQsT0FBTztLQUNSO1NBQU07UUFDTCwwRUFBcUIsQ0FBQztZQUNwQixJQUFJLEVBQUUscUJBQXFCO1lBQzNCLEtBQUssRUFBRSxjQUFjO1lBQ3JCLFdBQVcsRUFBRSxzQ0FBc0MsQ0FBQyxlQUFlO1NBQ3BFLENBQUMsQ0FBQztR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QUFPLEVBQUUsV0FBVyxDQUFDLEVBQUU7d0JBQ2pFLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUN0QztpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtDQUNGOzs7Ozs7Ozs7OztVQzVKRCxzRCIsImZpbGUiOiJtYWluLmQ2MTE0MDlhZTc3MWM1OWU2MTY3LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVByZWxvYWRlciB9IGZyb20gXCIuL21vZHVsZS9oZWxwZXIvVGVtcGxhdGVQcmVsb2FkZXJcIjtcclxuaW1wb3J0IHsgaG90a2V5cyB9IGZyb20gXCIuL2xpYi1kZi1ob3RrZXlzLnNoaW0uanNcIjtcclxubGV0IGFuaW1hdGlvbkxvY2sgPSBmYWxzZTtcclxuY29uc3Qgb2Zmc2V0ID0ge1xyXG4gIHg6IDAsXHJcbiAgeTogMCxcclxufTtcclxubGV0IGlzQmVpbmdQcmVzc2VkID0gZmFsc2U7XHJcblxyXG5Ib29rcy5vbmNlKFwiaW5pdFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc29sZS5sb2coXHJcbiAgICBcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09TGl2ZSBBbmltYXRlPT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiXHJcbiAgKTtcclxufSk7XHJcblxyXG5Ib29rcy5vbmNlKFwiaW5pdFwiLCAoKSA9PiB7XHJcbiAgaG9va0RyYWdIYW5kbGVycyhUb2tlbik7XHJcbn0pO1xyXG5cclxuSG9va3Mub25jZShcInJlYWR5XCIsICgpID0+IHtcclxuICBpZiAoIWdhbWUubW9kdWxlcy5nZXQoXCJsaWItZGYtaG90a2V5c1wiKT8uYWN0aXZlKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiTWlzc2luZyBsaWItZGYtaG90a2V5cyBtb2R1bGUgZGVwZW5kZW5jeVwiKTtcclxuICAgIGlmIChnYW1lLnVzZXI/LmlzR00pXHJcbiAgICAgIHVpLm5vdGlmaWNhdGlvbnM/LmVycm9yKFxyXG4gICAgICAgIFwiJ015IE1vZHVsZScgcmVxdWlyZXMgdGhlICdMaWJyYXJ5OiBERiBIb3RrZXlzJyBtb2R1bGUuIFBsZWFzZSBpbnN0YWxsIGFuZCBhY3RpdmF0ZSB0aGlzIGRlcGVuZGVuY3kuXCJcclxuICAgICAgKTtcclxuICAgIC8vIFBlcmZvcm0gYWx0ZXJuYXRpdmUgY29kZSB0byBoYW5kbGUgbWlzc2luZyBsaWJyYXJ5XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgIGhvdGtleXMucmVnaXN0ZXJHcm91cCh7XHJcbiAgICAgIG5hbWU6ICdsaXZlYW5pbWF0ZS5hbmltYXRlJywgLy8gPC0gTXVzdCBiZSB1bmlxdWVcclxuICAgICAgbGFiZWw6ICdMaXZlIEFuaW1hdGUnLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ0hvdCBrZXlzIGZvciB0aGUgbGl2ZSBhbmltYXRlIG1vZHVsZScgLy8gPC0tIE9wdGlvbmFsXHJcbiAgICB9KTtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGhvdGtleXMucmVnaXN0ZXJTaG9ydGN1dCh7XHJcbiAgICAgIG5hbWU6IFwibGl2ZWFuaW1hdGUuYW5pbWF0ZVwiLFxyXG4gICAgICBsYWJlbDogXCJBbmltYXRlXCIsXHJcbiAgICAgIGdyb3VwOiAnbGl2ZWFuaW1hdGUuYW5pbWF0ZScsXHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBrZXk6IGhvdGtleXMua2V5cy5LZXlULFxyXG4gICAgICAgIGFsdDogZmFsc2UsXHJcbiAgICAgICAgY3RybDogZmFsc2UsXHJcbiAgICAgICAgc2hpZnQ6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgICBvbktleURvd246ICgpID0+IHtcclxuICAgICAgICBpc0JlaW5nUHJlc3NlZCA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uS2V5VXA6ICgpID0+IHtcclxuICAgICAgICBpc0JlaW5nUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGhvb2tEcmFnSGFuZGxlcnMoZW50aXR5VHlwZSkge1xyXG4gIGVudGl0eVR5cGUucHJvdG90eXBlLmFuaW1hdGVNb3ZlbWVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbCA9IGVudGl0eVR5cGUucHJvdG90eXBlLmFuaW1hdGVNb3ZlbWVudDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAocmF5KSB7XHJcbiAgICAgIGNvbnN0IFRva2VuRG9jdW1lbnQgPSB0aGlzLmRvY3VtZW50O1xyXG4gICAgICBpZiAoVG9rZW5Eb2N1bWVudC5nZXRGbGFnKFwid29ybGRcIiwgXCJpc0xpdmVBbmltYXRlXCIpKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhLnggPSByYXkuQi54O1xyXG4gICAgICAgIHRoaXMuZGF0YS55ID0gcmF5LkIueTtcclxuICAgICAgICB0aGlzLmRhdGEudXBkYXRlKHsgeDogcmF5LkIueCwgeTogcmF5LkIueSB9KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNvdXJjZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vcm1hbCByYXlcIik7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcclxuICAgICAgcmV0dXJuIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH0pKCk7XHJcblxyXG4gIGNvbnN0IG9yaWdpbmFsRHJhZ0xlZnRTdGFydEhhbmRsZXIgPSBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdFN0YXJ0O1xyXG4gIGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0U3RhcnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIG9yaWdpbmFsRHJhZ0xlZnRTdGFydEhhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICBpZiAoaXNCZWluZ1ByZXNzZWQgfHwgYW5pbWF0aW9uTG9jaykge1xyXG4gICAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICBvZmZzZXQueCA9IHRoaXMuY2VudGVyLnggLSB0aGlzLng7XHJcbiAgICAgIG9mZnNldC55ID0gdGhpcy5jZW50ZXIueSAtIHRoaXMueTtcclxuICAgICAgY291bnQgPSAwO1xyXG4gICAgICBpc0JlaW5nUHJlc3NlZCA/IChhbmltYXRpb25Mb2NrID0gdHJ1ZSkgOiAoYW5pbWF0aW9uTG9jayA9IGZhbHNlKTtcclxuICAgICAgY29uc3QgdG9rZW5Eb2N1bWVudCA9IHRoaXMuZG9jdW1lbnQ7XHJcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5Eb2N1bWVudC5fb2JqZWN0IGFzIFRva2VuO1xyXG4gICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGV2ZW50LmRhdGEuZGVzdGluYXRpb247XHJcbiAgICAgIHRva2VuRG9jdW1lbnQuc2V0RmxhZyhcIndvcmxkXCIsIFwiaXNMaXZlQW5pbWF0ZVwiLCB0cnVlKTtcclxuICAgICAgdG9rZW4uZGF0YS54ID0gZGVzdGluYXRpb24ueCAtIG9mZnNldC54O1xyXG4gICAgICB0b2tlbi5kYXRhLnkgPSBkZXN0aW5hdGlvbi55IC0gb2Zmc2V0Lnk7XHJcbiAgICAgIHRva2VuRG9jdW1lbnQudXBkYXRlKHRva2VuLmRhdGEpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9yaWdpbmFsRHJhZ0xlZnRNb3ZlSGFuZGxlciA9IGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0TW92ZTtcclxuICBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdE1vdmUgPSBhc3luYyBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChpc0JlaW5nUHJlc3NlZCB8fCBhbmltYXRpb25Mb2NrKSB7XHJcbiAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgIGNvbnN0IGlzVG9rZW4gPSB0aGlzIGluc3RhbmNlb2YgVG9rZW47XHJcbiAgICAgIGlmIChpc1Rva2VuKSB7XHJcbiAgICAgICAgY29uc3QgdG9rZW5Eb2N1bWVudCA9IHRoaXMuZG9jdW1lbnQ7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbkRvY3VtZW50Ll9vYmplY3QgYXMgVG9rZW47XHJcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBldmVudC5kYXRhLmRlc3RpbmF0aW9uO1xyXG4gICAgICAgIHRva2VuRG9jdW1lbnQuc2V0RmxhZyhcIndvcmxkXCIsIFwiaXNMaXZlQW5pbWF0ZVwiLCB0cnVlKTtcclxuICAgICAgICB0b2tlbi5kYXRhLnggPSBkZXN0aW5hdGlvbi54IC0gb2Zmc2V0Lng7XHJcbiAgICAgICAgdG9rZW4uZGF0YS55ID0gZGVzdGluYXRpb24ueSAtIG9mZnNldC55O1xyXG4gICAgICAgIHRva2VuRG9jdW1lbnQudXBkYXRlKHRva2VuLmRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcmlnaW5hbERyYWdMZWZ0TW92ZUhhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxEcmFnTGVmdERyb3BIYW5kbGVyID0gZW50aXR5VHlwZS5wcm90b3R5cGUuX29uRHJhZ0xlZnREcm9wO1xyXG5cclxuICBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdERyb3AgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChpc0JlaW5nUHJlc3NlZCB8fCBhbmltYXRpb25Mb2NrKSB7XHJcbiAgICAgIGFuaW1hdGlvbkxvY2sgPSBmYWxzZTtcclxuICAgICAgdGhpcy5kb2N1bWVudC5zZXRGbGFnKFwid29ybGRcIiwgXCJpc0xpdmVBbmltYXRlXCIsIHRydWUpO1xyXG4gICAgfSBlbHNlIG9yaWdpbmFsRHJhZ0xlZnREcm9wSGFuZGxlci5jYWxsKHRoaXMsIGV2ZW50KTtcclxuICB9O1xyXG5cclxuICAvLyBjb25zdCBvcmlnaW5hbE9uQ2xpY2tMZWZ0SGFuZGxlciA9IGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkNsaWNrTGVmdDtcclxuICAvLyBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25DbGlja0xlZnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAvLyAgIG9yaWdpbmFsT25DbGlja0xlZnRIYW5kbGVyLmNhbGwodGhpcywgZXZlbnQpO1xyXG4gIC8vICAgaWYgKGlzQmVpbmdQcmVzc2VkKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKGRvY3VtZW50Lm9ubW91c2Vtb3ZlKVxyXG4gIC8vICAgICBjb25zb2xlLmxvZyhcIkNMSUNLIFNQRUNJQUxcIik7XHJcbiAgLy8gICAgIGNvbnN0IHRva2VuID0gdGhpcyBhcyBUb2tlbjtcclxuICAgICAgXHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKHRva2VuLm1vdXNlSW50ZXJhY3Rpb25NYW5hZ2VyPy5oYW5kbGVycyk7XHJcbiAgLy8gICB9IFxyXG4gIC8vIH07XHJcbn1cclxuXHJcblxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIpIHtcclxuICBpZiAobW9kdWxlLmhvdCkge1xyXG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcclxuXHJcbiAgICBpZiAobW9kdWxlLmhvdC5zdGF0dXMoKSA9PT0gXCJhcHBseVwiKSB7XHJcbiAgICAgIGZvciAoY29uc3QgdGVtcGxhdGUgaW4gX3RlbXBsYXRlQ2FjaGUpIHtcclxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF90ZW1wbGF0ZUNhY2hlLCB0ZW1wbGF0ZSkpIHtcclxuICAgICAgICAgIGRlbGV0ZSBfdGVtcGxhdGVDYWNoZVt0ZW1wbGF0ZV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBUZW1wbGF0ZVByZWxvYWRlci5wcmVsb2FkSGFuZGxlYmFyc1RlbXBsYXRlcygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgYXBwbGljYXRpb24gaW4gdWkud2luZG93cykge1xyXG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh1aS53aW5kb3dzLCBhcHBsaWNhdGlvbikpIHtcclxuICAgICAgICAgICAgdWkud2luZG93c1thcHBsaWNhdGlvbl0ucmVuZGVyKHRydWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjAyZTViMDI1YTQ1ZDdhYTc2OWY0XCIpIl0sInNvdXJjZVJvb3QiOiIifQ==