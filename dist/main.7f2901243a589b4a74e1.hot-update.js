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
            console.log((_b = token.mouseInteractionManager) === null || _b === void 0 ? void 0 : _b.handlers.mousemove());
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
/******/ 	__webpack_require__.h = () => ("532deae79523c199c8eb")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXZlYW5pbWF0ZS8uL3NyYy9saXZlYW5pbWF0ZS50cyIsIndlYnBhY2s6Ly9saXZlYW5pbWF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQXNFO0FBQ25CO0FBRW5ELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNkLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQixNQUFNLE1BQU0sR0FBRztJQUNiLENBQUMsRUFBRSxDQUFDO0lBQ0osQ0FBQyxFQUFFLENBQUM7Q0FDTCxDQUFDO0FBQ0YsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBRTNCLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsdUVBQXVFLENBQ3hFLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUN0QixnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTs7SUFDdkIsSUFBSSxDQUFDLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLDBDQUFFLE1BQU0sR0FBRTtRQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxVQUFJLENBQUMsSUFBSSwwQ0FBRSxJQUFJO1lBQ2pCLFFBQUUsQ0FBQyxhQUFhLDBDQUFFLEtBQUssQ0FDckIscUdBQXFHLENBQ3RHLENBQUM7UUFDSixxREFBcUQ7UUFDckQsT0FBTztLQUNSO1NBQU07UUFDTCxhQUFhO1FBQ2IsNkVBQXdCLENBQUM7WUFDdkIsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFP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QUEwRDtBQUUxRCw4QkFBOEI7QUFDOUIsc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUN0RCx5Q0FBeUM7QUFDekMsMENBQTBDO0FBQzFDLG1FQUFtRTtBQUNuRSxjQUFjO0FBRWQsd0RBQXdEO0FBQ3hELGlEQUFpRDtBQUNqRCwrQkFBK0I7QUFDL0IsZUFBZTtBQUNmLE1BQU07QUFFTixzQ0FBc0M7QUFDdEMsbURBQW1EO0FBQ25ELGVBQWU7QUFDZixvQ0FBb0M7QUFDcEMsa0NBQWtDO0FBQ2xDLFNBQVM7QUFDVCxNQUFNO0FBRU4sSUFBSSxJQUFzQyxFQUFFO0lBQzFDLElBQUksSUFBVSxFQUFFO1FBQ2QsaUJBQWlCLEVBQUUsQ0FBQztRQUVwQixJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxPQUFPLEVBQUU7WUFDbkMsS0FBSyxNQUFNLFFBQVEsSUFBSSxjQUFjLEVBQUU7Z0JBQ3JDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsRUFBRTtvQkFDbEUsT0FBTyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7WUFFRCwwR0FBNEMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ3ZELEtBQUssTUFBTSxXQUFXLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTtvQkFDcEMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsRUFBRTt3QkFDakUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3RDO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtLQUNGO0NBQ0Y7Ozs7Ozs7Ozs7O1VDL0xELHNEIiwiZmlsZSI6Im1haW4uN2YyOTAxMjQzYTU4OWI0YTc0ZTEuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUHJlbG9hZGVyIH0gZnJvbSBcIi4vbW9kdWxlL2hlbHBlci9UZW1wbGF0ZVByZWxvYWRlclwiO1xyXG5pbXBvcnQgeyBob3RrZXlzIH0gZnJvbSBcIi4vbGliLWRmLWhvdGtleXMuc2hpbS5qc1wiO1xyXG5cclxubGV0IGNvdW50ID0gMDtcclxubGV0IGFuaW1hdGlvbkxvY2sgPSBmYWxzZTtcclxuY29uc3Qgb2Zmc2V0ID0ge1xyXG4gIHg6IDAsXHJcbiAgeTogMCxcclxufTtcclxubGV0IGlzQmVpbmdQcmVzc2VkID0gZmFsc2U7XHJcblxyXG5Ib29rcy5vbmNlKFwiaW5pdFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc29sZS5sb2coXHJcbiAgICBcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09TGl2ZSBBbmltYXRlPT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiXHJcbiAgKTtcclxufSk7XHJcblxyXG5Ib29rcy5vbmNlKFwiaW5pdFwiLCAoKSA9PiB7XHJcbiAgaG9va0RyYWdIYW5kbGVycyhUb2tlbik7XHJcbn0pO1xyXG5cclxuSG9va3Mub25jZShcInJlYWR5XCIsICgpID0+IHtcclxuICBpZiAoIWdhbWUubW9kdWxlcy5nZXQoXCJsaWItZGYtaG90a2V5c1wiKT8uYWN0aXZlKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiTWlzc2luZyBsaWItZGYtaG90a2V5cyBtb2R1bGUgZGVwZW5kZW5jeVwiKTtcclxuICAgIGlmIChnYW1lLnVzZXI/LmlzR00pXHJcbiAgICAgIHVpLm5vdGlmaWNhdGlvbnM/LmVycm9yKFxyXG4gICAgICAgIFwiJ015IE1vZHVsZScgcmVxdWlyZXMgdGhlICdMaWJyYXJ5OiBERiBIb3RrZXlzJyBtb2R1bGUuIFBsZWFzZSBpbnN0YWxsIGFuZCBhY3RpdmF0ZSB0aGlzIGRlcGVuZGVuY3kuXCJcclxuICAgICAgKTtcclxuICAgIC8vIFBlcmZvcm0gYWx0ZXJuYXRpdmUgY29kZSB0byBoYW5kbGUgbWlzc2luZyBsaWJyYXJ5XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGhvdGtleXMucmVnaXN0ZXJTaG9ydGN1dCh7XHJcbiAgICAgIG5hbWU6IFwibGl2ZWFuaW1hdGUuYW5pbWF0ZVwiLFxyXG4gICAgICBsYWJlbDogXCJBbmltYXRlXCIsXHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBrZXk6IGhvdGtleXMua2V5cy5LZXlULFxyXG4gICAgICAgIGFsdDogZmFsc2UsXHJcbiAgICAgICAgY3RybDogZmFsc2UsXHJcbiAgICAgICAgc2hpZnQ6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgICBvbktleURvd246ICgpID0+IHtcclxuICAgICAgICBpc0JlaW5nUHJlc3NlZCA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uS2V5VXA6ICgpID0+IHtcclxuICAgICAgICBpc0JlaW5nUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGhvb2tEcmFnSGFuZGxlcnMoZW50aXR5VHlwZSkge1xyXG4gIGVudGl0eVR5cGUucHJvdG90eXBlLmFuaW1hdGVNb3ZlbWVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbCA9IGVudGl0eVR5cGUucHJvdG90eXBlLmFuaW1hdGVNb3ZlbWVudDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAocmF5KSB7XHJcbiAgICAgIGNvbnN0IFRva2VuRG9jdW1lbnQgPSB0aGlzLmRvY3VtZW50O1xyXG4gICAgICBpZiAoVG9rZW5Eb2N1bWVudC5nZXRGbGFnKFwid29ybGRcIiwgXCJpc0xpdmVBbmltYXRlXCIpKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhLnggPSByYXkuQi54O1xyXG4gICAgICAgIHRoaXMuZGF0YS55ID0gcmF5LkIueTtcclxuICAgICAgICB0aGlzLmRhdGEudXBkYXRlKHsgeDogcmF5LkIueCwgeTogcmF5LkIueSB9KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNvdXJjZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vcm1hbCByYXlcIik7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcclxuICAgICAgcmV0dXJuIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH0pKCk7XHJcblxyXG4gIGNvbnN0IG9yaWdpbmFsRHJhZ0xlZnRTdGFydEhhbmRsZXIgPSBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdFN0YXJ0O1xyXG4gIGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0U3RhcnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIG9yaWdpbmFsRHJhZ0xlZnRTdGFydEhhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICBpZiAoaXNCZWluZ1ByZXNzZWQgfHwgYW5pbWF0aW9uTG9jaykge1xyXG4gICAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICBvZmZzZXQueCA9IHRoaXMuY2VudGVyLnggLSB0aGlzLng7XHJcbiAgICAgIG9mZnNldC55ID0gdGhpcy5jZW50ZXIueSAtIHRoaXMueTtcclxuICAgICAgY291bnQgPSAwO1xyXG4gICAgICBpc0JlaW5nUHJlc3NlZCA/IChhbmltYXRpb25Mb2NrID0gdHJ1ZSkgOiAoYW5pbWF0aW9uTG9jayA9IGZhbHNlKTtcclxuICAgICAgY29uc3QgdG9rZW5Eb2N1bWVudCA9IHRoaXMuZG9jdW1lbnQ7XHJcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5Eb2N1bWVudC5fb2JqZWN0IGFzIFRva2VuO1xyXG4gICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGV2ZW50LmRhdGEuZGVzdGluYXRpb247XHJcbiAgICAgIHRva2VuRG9jdW1lbnQuc2V0RmxhZyhcIndvcmxkXCIsIFwiaXNMaXZlQW5pbWF0ZVwiLCB0cnVlKTtcclxuICAgICAgdG9rZW4uZGF0YS54ID0gZGVzdGluYXRpb24ueCAtIG9mZnNldC54O1xyXG4gICAgICB0b2tlbi5kYXRhLnkgPSBkZXN0aW5hdGlvbi55IC0gb2Zmc2V0Lnk7XHJcbiAgICAgIHRva2VuRG9jdW1lbnQudXBkYXRlKHRva2VuLmRhdGEpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9yaWdpbmFsRHJhZ0xlZnRNb3ZlSGFuZGxlciA9IGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0TW92ZTtcclxuICBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdE1vdmUgPSBhc3luYyBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChpc0JlaW5nUHJlc3NlZCB8fCBhbmltYXRpb25Mb2NrKSB7XHJcbiAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgIGNvbnN0IGlzVG9rZW4gPSB0aGlzIGluc3RhbmNlb2YgVG9rZW47XHJcbiAgICAgIGlmIChpc1Rva2VuKSB7XHJcbiAgICAgICAgY29uc3QgdG9rZW5Eb2N1bWVudCA9IHRoaXMuZG9jdW1lbnQ7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbkRvY3VtZW50Ll9vYmplY3QgYXMgVG9rZW47XHJcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBldmVudC5kYXRhLmRlc3RpbmF0aW9uO1xyXG4gICAgICAgIHRva2VuRG9jdW1lbnQuc2V0RmxhZyhcIndvcmxkXCIsIFwiaXNMaXZlQW5pbWF0ZVwiLCB0cnVlKTtcclxuICAgICAgICB0b2tlbi5kYXRhLnggPSBkZXN0aW5hdGlvbi54IC0gb2Zmc2V0Lng7XHJcbiAgICAgICAgdG9rZW4uZGF0YS55ID0gZGVzdGluYXRpb24ueSAtIG9mZnNldC55O1xyXG4gICAgICAgIHRva2VuRG9jdW1lbnQudXBkYXRlKHRva2VuLmRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcmlnaW5hbERyYWdMZWZ0TW92ZUhhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxEcmFnTGVmdERyb3BIYW5kbGVyID0gZW50aXR5VHlwZS5wcm90b3R5cGUuX29uRHJhZ0xlZnREcm9wO1xyXG5cclxuICBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdERyb3AgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChpc0JlaW5nUHJlc3NlZCB8fCBhbmltYXRpb25Mb2NrKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGNvdW50KTtcclxuICAgICAgYW5pbWF0aW9uTG9jayA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmRvY3VtZW50LnNldEZsYWcoXCJ3b3JsZFwiLCBcImlzTGl2ZUFuaW1hdGVcIiwgdHJ1ZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiYWx0ZXJuYXRpdmVcIik7XHJcbiAgICB9IGVsc2Ugb3JpZ2luYWxEcmFnTGVmdERyb3BIYW5kbGVyLmNhbGwodGhpcywgZXZlbnQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9yaWdpbmFsT25DbGlja0xlZnRIYW5kbGVyID0gZW50aXR5VHlwZS5wcm90b3R5cGUuX29uQ2xpY2tMZWZ0O1xyXG4gIGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkNsaWNrTGVmdCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKGlzQmVpbmdQcmVzc2VkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQ0xJQ0sgU1BFQ0lBTFwiKTtcclxuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzIGFzIFRva2VuO1xyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIHRva2VuLm1vdXNlSW50ZXJhY3Rpb25NYW5hZ2VyPy5zdGF0ZSA9IDM7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRva2VuLm1vdXNlSW50ZXJhY3Rpb25NYW5hZ2VyPy5oYW5kbGVycy5tb3VzZW1vdmUoKSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9yaWdpbmFsT25DbGlja0xlZnRIYW5kbGVyLmNhbGwodGhpcywgZXZlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIGNvbnN0IG9yaWdpbmFsRHJhZ0xlZnRDYW5jZWxIYW5kbGVyID0gZW50aXR5VHlwZS5wcm90b3R5cGUuX29uRHJhZ0xlZnRDYW5jZWxcclxuICAvLyBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdENhbmNlbCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gIC8vIFx0Y29uc3QgZXZlbnRIYW5kbGVkID0gb25FbnRpdHlEcmFnTGVmdENhbmNlbC5jYWxsKHRoaXMsIGV2ZW50KVxyXG4gIC8vIFx0aWYgKCFldmVudEhhbmRsZWQpXHJcbiAgLy8gXHRcdG9yaWdpbmFsRHJhZ0xlZnRDYW5jZWxIYW5kbGVyLmNhbGwodGhpcywgZXZlbnQpXHJcbiAgLy8gfVxyXG59XHJcblxyXG4vLyBIb29rcy5vbmNlKFwiY2FudmFzUmVhZHlcIiwgYXN5bmMgKCkgPT4ge1xyXG4vLyBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50XHJcblxyXG4vLyAgIGNvbnNvbGUubG9nKFwidGVzdGluZ1wiKTtcclxuLy8gICBjb25zdCB0ZXN0VG9rZW5Eb2N1bWVudCA9IGF3YWl0IGdhbWUuc2NlbmVzXHJcbi8vICAgICA/LmdldChcIlZRWWxrdmVNV3dONmhjRnRcIilcclxuLy8gICAgID8uW1widG9rZW5zXCJdLmdldChcImgxeTJzcmxqa2hRWEtVWU5cIik7XHJcbi8vICAgY29uc3QgdGVzdFRva2VuID0gdGVzdFRva2VuRG9jdW1lbnQuX29iamVjdCBhcyBUb2tlbjtcclxuXHJcbi8vICAgc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xyXG4vLyAgICAgY29uc29sZS5sb2coYHggcG9zaXRpb246ICR7dGVzdFRva2VuLmRhdGEueH1gKTtcclxuLy8gICAgIGNvbnNvbGUubG9nKGB5IHBvc2l0aW9uOiAke3Rlc3RUb2tlbi5kYXRhLnl9YCk7XHJcbi8vIHRlc3RUb2tlbi5kYXRhLnggPSBtb3VzZVBvc2l0aW9uLngrOTUwXHJcbi8vIHRlc3RUb2tlbi5kYXRhLnkgPSBtb3VzZVBvc2l0aW9uLnkrNjQwO1xyXG4vLyAgICAgY29uc29sZS5sb2coYXdhaXQgdGVzdFRva2VuRG9jdW1lbnQudXBkYXRlKHRlc3RUb2tlbi5kYXRhKSk7XHJcbi8vICAgfSwgMTAwMCk7XHJcblxyXG4vLyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGV2dCkge1xyXG4vLyAgICAgY29uc3QgbW91c2VQb3MgPSBnZXRNb3VzZVBvcyhjYW52YXMsIGV2dCk7XHJcbi8vICAgICBtb3VzZVBvc2l0aW9uID0gbW91c2VQb3NcclxuLy8gICB9LCBmYWxzZSk7XHJcbi8vIH0pO1xyXG5cclxuLy8gZnVuY3Rpb24gZ2V0TW91c2VQb3MoY2FudmFzLCBldnQpIHtcclxuLy8gICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICB4OiBldnQuY2xpZW50WCAtIHJlY3QubGVmdCxcclxuLy8gICAgICAgeTogZXZ0LmNsaWVudFkgLSByZWN0LnRvcFxyXG4vLyAgICAgfTtcclxuLy8gICB9XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xyXG4gIGlmIChtb2R1bGUuaG90KSB7XHJcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xyXG5cclxuICAgIGlmIChtb2R1bGUuaG90LnN0YXR1cygpID09PSBcImFwcGx5XCIpIHtcclxuICAgICAgZm9yIChjb25zdCB0ZW1wbGF0ZSBpbiBfdGVtcGxhdGVDYWNoZSkge1xyXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX3RlbXBsYXRlQ2FjaGUsIHRlbXBsYXRlKSkge1xyXG4gICAgICAgICAgZGVsZXRlIF90ZW1wbGF0ZUNhY2hlW3RlbXBsYXRlXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIFRlbXBsYXRlUHJlbG9hZGVyLnByZWxvYWRIYW5kbGViYXJzVGVtcGxhdGVzKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBhcHBsaWNhdGlvbiBpbiB1aS53aW5kb3dzKSB7XHJcbiAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHVpLndpbmRvd3MsIGFwcGxpY2F0aW9uKSkge1xyXG4gICAgICAgICAgICB1aS53aW5kb3dzW2FwcGxpY2F0aW9uXS5yZW5kZXIodHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNTMyZGVhZTc5NTIzYzE5OWM4ZWJcIikiXSwic291cmNlUm9vdCI6IiJ9