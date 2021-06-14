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
let offset = {
    x: 0,
    y: 0
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
    if (!((_a = game.modules.get('lib-df-hotkeys')) === null || _a === void 0 ? void 0 : _a.active)) {
        console.error('Missing lib-df-hotkeys module dependency');
        if ((_b = game.user) === null || _b === void 0 ? void 0 : _b.isGM)
            (_c = ui.notifications) === null || _c === void 0 ? void 0 : _c.error("'My Module' requires the 'Library: DF Hotkeys' module. Please install and activate this dependency.");
        // Perform alternative code to handle missing library
        return;
    }
    else {
        // @ts-ignore
        _lib_df_hotkeys_shim_js__WEBPACK_IMPORTED_MODULE_1__.hotkeys.registerShortcut({
            name: 'liveanimate.animate',
            label: 'Animate',
            default: { key: _lib_df_hotkeys_shim_js__WEBPACK_IMPORTED_MODULE_1__.hotkeys.keys.KeyT, alt: false, ctrl: false, shift: false },
            onKeyDown: () => { isBeingPressed = true; },
            onKeyUp: () => { isBeingPressed = false; },
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
        console.log(event);
        console.log(this);
        console.log(offset);
        count = 0;
    };
    const originalDragLeftMoveHandler = entityType.prototype._onDragLeftMove;
    entityType.prototype._onDragLeftMove = async function (event) {
        if (isBeingPressed) {
            count += 1;
            const isToken = this instanceof Token;
            if (isToken) {
                const tokenDocument = this.document;
                const token = tokenDocument._object;
                const destination = event.data.destination;
                tokenDocument.setFlag("world", "isLiveAnimate", true);
                token.data.x = destination.x;
                token.data.y = destination.y;
                tokenDocument.update(token.data);
            }
        }
        else {
            originalDragLeftMoveHandler.call(this, event);
        }
    };
    const originalDragLeftDropHandler = entityType.prototype._onDragLeftDrop;
    entityType.prototype._onDragLeftDrop = function (event) {
        if (isBeingPressed) {
            console.log(count);
            console.log("alternative");
        }
        else
            originalDragLeftDropHandler.call(this, event);
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
/******/ 	__webpack_require__.h = () => ("e557138e1458ed444b88")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXZlYW5pbWF0ZS8uL3NyYy9saXZlYW5pbWF0ZS50cyIsIndlYnBhY2s6Ly9saXZlYW5pbWF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQXNFO0FBQ25CO0FBRW5ELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNkLElBQUksTUFBTSxHQUFHO0lBQ1gsQ0FBQyxFQUFDLENBQUM7SUFDSCxDQUFDLEVBQUMsQ0FBQztDQUNKO0FBQ0QsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBRTNCLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsdUVBQXVFLENBQ3hFLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUN0QixnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUUsRUFBRTs7SUFDdEIsSUFBSSxDQUFDLFdBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLDBDQUFFLE1BQU0sR0FBRTtRQUNqRCxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxVQUFJLENBQUMsSUFBSSwwQ0FBRSxJQUFJO1lBQ2xCLFFBQUUsQ0FBQyxhQUFhLDBDQUFFLEtBQUssQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO1FBQ2hJLHFEQUFxRDtRQUNyRCxPQUFPO0tBQ1A7U0FDSztRQUNILGFBQWE7UUFDYiw2RUFBd0IsQ0FBQztZQUN2QixJQUFJLEVBQUUscUJBQXFCO1lBQzNCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxzRUFBaUIsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUMxRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsY0FBYyxHQUFHLElBQUksR0FBQztZQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsY0FBYyxHQUFDLEtBQUssR0FBQztTQUN2QyxDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQztBQUVGLFNBQVMsZ0JBQWdCLENBQUMsVUFBVTtJQUNsQyxVQUFVLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxDQUFDO1FBQ3RDLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDO1FBQ3RELE9BQU8sVUFBVSxHQUFHO1lBQ2xCLE1BQU0sYUFBYSxHQUFJLElBQUksQ0FBQyxRQUFRO1lBQ3BDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNwQixPQUFPO2FBQ1I7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztZQUN6Qiw4Q0FBOEM7WUFDOUMsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN6QyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNMLE1BQU0sNEJBQTRCLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztJQUMzRSxVQUFVLENBQUMsU0FBUyxDQUFDLGdCQUFnQixHQUFHLFVBQVUsS0FBSztRQUNyRCw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ25CLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDLENBQUM7SUFFRixNQUFNLDJCQUEyQixHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDO0lBQ3pFLFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLEtBQUssV0FBVyxLQUFLO1FBQzFELElBQUksY0FBYyxFQUFFO1lBQ2xCLEtBQUssSUFBRyxDQUFDLENBQUM7WUFDVixNQUFNLE9BQU8sR0FBRyxJQUFJLFlBQVksS0FBSyxDQUFDO1lBQ3RDLElBQUksT0FBTyxFQUFFO2dCQUNYLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ3BDLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxPQUFnQixDQUFDO2dCQUM3QyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDM0MsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUMsZUFBZSxFQUFDLElBQUksQ0FBQztnQkFDbkQsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ2pDO1NBQ0Y7YUFBTTtZQUNMLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDL0M7SUFDSCxDQUFDLENBQUM7SUFFRixNQUFNLDJCQUEyQixHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDO0lBRXpFLFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLFVBQVUsS0FBSztRQUNwRCxJQUFJLGNBQWMsRUFBRTtZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzVCOztZQUFNLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDO0lBRUYsK0VBQStFO0lBQy9FLDhEQUE4RDtJQUM5RCxpRUFBaUU7SUFDakUsc0JBQXNCO0lBQ3RCLG9EQUFvRDtJQUNwRCxJQUFJO0FBQ04sQ0FBQztBQUVELDBDQUEwQztBQUMxQyx1RUFBdUU7QUFFdkUsNEJBQTRCO0FBQzVCLGdEQUFnRDtBQUNoRCxnQ0FBZ0M7QUFDaEMsNENBQTRDO0FBQzVDLDBEQUEwRDtBQUUxRCw4QkFBOEI7QUFDOUIsc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUN0RCx5Q0FBeUM7QUFDekMsMENBQTBDO0FBQzFDLG1FQUFtRTtBQUNuRSxjQUFjO0FBRWQsd0RBQXdEO0FBQ3hELGlEQUFpRDtBQUNqRCwrQkFBK0I7QUFDL0IsZUFBZTtBQUNmLE1BQU07QUFFTixzQ0FBc0M7QUFDdEMsbURBQW1EO0FBQ25ELGVBQWU7QUFDZixvQ0FBb0M7QUFDcEMsa0NBQWtDO0FBQ2xDLFNBQVM7QUFDVCxNQUFNO0FBRU4sSUFBSSxJQUFzQyxFQUFFO0lBQzFDLElBQUksSUFBVSxFQUFFO1FBQ2QsaUJBQWlCLEVBQUUsQ0FBQztRQUVwQixJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxPQUFPLEVBQUU7WUFDbkMsS0FBSyxNQUFNLFFBQVEsSUFBSSxjQUFjLEVBQUU7Z0JBQ3JDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsRUFBRTtvQkFDbEUsT0FBTyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7WUFFRCwwR0FBNEMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ3ZELEtBQUssTUFBTSxXQUFXLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRTtvQkFDcEMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsRUFBRTt3QkFDakUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3RDO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtLQUNGO0NBQ0Y7Ozs7Ozs7Ozs7O1VDekpELHNEIiwiZmlsZSI6Im1haW4uODA3ZGFmOTc5NzMzZTY1ZTg0NDEuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUHJlbG9hZGVyIH0gZnJvbSBcIi4vbW9kdWxlL2hlbHBlci9UZW1wbGF0ZVByZWxvYWRlclwiO1xyXG5pbXBvcnQgeyBob3RrZXlzIH0gZnJvbSAnLi9saWItZGYtaG90a2V5cy5zaGltLmpzJztcclxuXHJcbmxldCBjb3VudCA9IDA7XHJcbmxldCBvZmZzZXQgPSB7XHJcbiAgeDowLFxyXG4gIHk6MFxyXG59XHJcbmxldCBpc0JlaW5nUHJlc3NlZCA9IGZhbHNlO1xyXG5cclxuSG9va3Mub25jZShcImluaXRcIiwgZnVuY3Rpb24gKCkge1xyXG4gIGNvbnNvbGUubG9nKFxyXG4gICAgXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PUxpdmUgQW5pbWF0ZT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIlxyXG4gICk7XHJcbn0pO1xyXG5cclxuSG9va3Mub25jZShcImluaXRcIiwgKCkgPT4ge1xyXG4gIGhvb2tEcmFnSGFuZGxlcnMoVG9rZW4pO1xyXG59KTtcclxuXHJcbkhvb2tzLm9uY2UoXCJyZWFkeVwiLCAoKT0+e1xyXG4gIGlmICghZ2FtZS5tb2R1bGVzLmdldCgnbGliLWRmLWhvdGtleXMnKT8uYWN0aXZlKSB7XHJcblx0XHRjb25zb2xlLmVycm9yKCdNaXNzaW5nIGxpYi1kZi1ob3RrZXlzIG1vZHVsZSBkZXBlbmRlbmN5Jyk7XHJcblx0XHRpZiAoZ2FtZS51c2VyPy5pc0dNKVxyXG5cdFx0XHR1aS5ub3RpZmljYXRpb25zPy5lcnJvcihcIidNeSBNb2R1bGUnIHJlcXVpcmVzIHRoZSAnTGlicmFyeTogREYgSG90a2V5cycgbW9kdWxlLiBQbGVhc2UgaW5zdGFsbCBhbmQgYWN0aXZhdGUgdGhpcyBkZXBlbmRlbmN5LlwiKTtcclxuXHRcdC8vIFBlcmZvcm0gYWx0ZXJuYXRpdmUgY29kZSB0byBoYW5kbGUgbWlzc2luZyBsaWJyYXJ5XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG4gIGVsc2Uge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgaG90a2V5cy5yZWdpc3RlclNob3J0Y3V0KHtcclxuICAgICAgbmFtZTogJ2xpdmVhbmltYXRlLmFuaW1hdGUnLFxyXG4gICAgICBsYWJlbDogJ0FuaW1hdGUnLFxyXG4gICAgICBkZWZhdWx0OiB7IGtleTogaG90a2V5cy5rZXlzLktleVQsIGFsdDogZmFsc2UsIGN0cmw6IGZhbHNlLCBzaGlmdDogZmFsc2UgfSxcclxuICAgICAgb25LZXlEb3duOiAoKSA9PiB7IGlzQmVpbmdQcmVzc2VkID0gdHJ1ZX0sXHJcbiAgICAgIG9uS2V5VXA6ICgpID0+IHsgaXNCZWluZ1ByZXNzZWQ9ZmFsc2V9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gaG9va0RyYWdIYW5kbGVycyhlbnRpdHlUeXBlKSB7XHJcbiAgZW50aXR5VHlwZS5wcm90b3R5cGUuYW5pbWF0ZU1vdmVtZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IG9yaWdpbmFsID0gZW50aXR5VHlwZS5wcm90b3R5cGUuYW5pbWF0ZU1vdmVtZW50O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyYXkpIHtcclxuICAgICAgY29uc3QgVG9rZW5Eb2N1bWVudCAgPSB0aGlzLmRvY3VtZW50XHJcbiAgICAgIGlmIChUb2tlbkRvY3VtZW50LmdldEZsYWcoXCJ3b3JsZFwiLFwiaXNMaXZlQW5pbWF0ZVwiKSkge1xyXG4gICAgICAgIHRoaXMuZGF0YS54ID0gcmF5LkIueDtcclxuICAgICAgICB0aGlzLmRhdGEueSA9IHJheS5CLnk7IFxyXG4gICAgICAgIHRoaXMuZGF0YS51cGRhdGUoe3g6IHJheS5CLngsIHk6IHJheS5CLnl9KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNvdXJjZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhcIm5vcm1hbCByYXlcIilcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xyXG4gICAgICByZXR1cm4gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9KSgpO1xyXG4gIGNvbnN0IG9yaWdpbmFsRHJhZ0xlZnRTdGFydEhhbmRsZXIgPSBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdFN0YXJ0O1xyXG4gIGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0U3RhcnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIG9yaWdpbmFsRHJhZ0xlZnRTdGFydEhhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICBjb25zb2xlLmxvZyhldmVudClcclxuICAgIGNvbnNvbGUubG9nKHRoaXMpXHJcbiAgICBjb25zb2xlLmxvZyhvZmZzZXQpXHJcbiAgICBjb3VudCA9IDA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxEcmFnTGVmdE1vdmVIYW5kbGVyID0gZW50aXR5VHlwZS5wcm90b3R5cGUuX29uRHJhZ0xlZnRNb3ZlO1xyXG4gIGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0TW92ZSA9IGFzeW5jIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKGlzQmVpbmdQcmVzc2VkKSB7XHJcbiAgICAgIGNvdW50ICs9MTtcclxuICAgICAgY29uc3QgaXNUb2tlbiA9IHRoaXMgaW5zdGFuY2VvZiBUb2tlbjtcclxuICAgICAgaWYgKGlzVG9rZW4pIHtcclxuICAgICAgICBjb25zdCB0b2tlbkRvY3VtZW50ID0gdGhpcy5kb2N1bWVudDtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHRva2VuRG9jdW1lbnQuX29iamVjdCBhcyBUb2tlbjtcclxuICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGV2ZW50LmRhdGEuZGVzdGluYXRpb247XHJcbiAgICAgICAgdG9rZW5Eb2N1bWVudC5zZXRGbGFnKFwid29ybGRcIixcImlzTGl2ZUFuaW1hdGVcIix0cnVlKVxyXG4gICAgICAgIHRva2VuLmRhdGEueCA9IGRlc3RpbmF0aW9uLng7IFxyXG4gICAgICAgIHRva2VuLmRhdGEueSA9IGRlc3RpbmF0aW9uLnk7ICBcclxuICAgICAgICB0b2tlbkRvY3VtZW50LnVwZGF0ZSh0b2tlbi5kYXRhKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcmlnaW5hbERyYWdMZWZ0TW92ZUhhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxEcmFnTGVmdERyb3BIYW5kbGVyID0gZW50aXR5VHlwZS5wcm90b3R5cGUuX29uRHJhZ0xlZnREcm9wO1xyXG5cclxuICBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdERyb3AgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChpc0JlaW5nUHJlc3NlZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhjb3VudClcclxuICAgICAgY29uc29sZS5sb2coXCJhbHRlcm5hdGl2ZVwiKTtcclxuICAgIH0gZWxzZSBvcmlnaW5hbERyYWdMZWZ0RHJvcEhhbmRsZXIuY2FsbCh0aGlzLCBldmVudCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gY29uc3Qgb3JpZ2luYWxEcmFnTGVmdENhbmNlbEhhbmRsZXIgPSBlbnRpdHlUeXBlLnByb3RvdHlwZS5fb25EcmFnTGVmdENhbmNlbFxyXG4gIC8vIGVudGl0eVR5cGUucHJvdG90eXBlLl9vbkRyYWdMZWZ0Q2FuY2VsID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgLy8gXHRjb25zdCBldmVudEhhbmRsZWQgPSBvbkVudGl0eURyYWdMZWZ0Q2FuY2VsLmNhbGwodGhpcywgZXZlbnQpXHJcbiAgLy8gXHRpZiAoIWV2ZW50SGFuZGxlZClcclxuICAvLyBcdFx0b3JpZ2luYWxEcmFnTGVmdENhbmNlbEhhbmRsZXIuY2FsbCh0aGlzLCBldmVudClcclxuICAvLyB9XHJcbn1cclxuXHJcbi8vIEhvb2tzLm9uY2UoXCJjYW52YXNSZWFkeVwiLCBhc3luYyAoKSA9PiB7XHJcbi8vIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIikgYXMgSFRNTENhbnZhc0VsZW1lbnRcclxuXHJcbi8vICAgY29uc29sZS5sb2coXCJ0ZXN0aW5nXCIpO1xyXG4vLyAgIGNvbnN0IHRlc3RUb2tlbkRvY3VtZW50ID0gYXdhaXQgZ2FtZS5zY2VuZXNcclxuLy8gICAgID8uZ2V0KFwiVlFZbGt2ZU1Xd042aGNGdFwiKVxyXG4vLyAgICAgPy5bXCJ0b2tlbnNcIl0uZ2V0KFwiaDF5MnNybGpraFFYS1VZTlwiKTtcclxuLy8gICBjb25zdCB0ZXN0VG9rZW4gPSB0ZXN0VG9rZW5Eb2N1bWVudC5fb2JqZWN0IGFzIFRva2VuO1xyXG5cclxuLy8gICBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XHJcbi8vICAgICBjb25zb2xlLmxvZyhgeCBwb3NpdGlvbjogJHt0ZXN0VG9rZW4uZGF0YS54fWApO1xyXG4vLyAgICAgY29uc29sZS5sb2coYHkgcG9zaXRpb246ICR7dGVzdFRva2VuLmRhdGEueX1gKTtcclxuLy8gdGVzdFRva2VuLmRhdGEueCA9IG1vdXNlUG9zaXRpb24ueCs5NTBcclxuLy8gdGVzdFRva2VuLmRhdGEueSA9IG1vdXNlUG9zaXRpb24ueSs2NDA7XHJcbi8vICAgICBjb25zb2xlLmxvZyhhd2FpdCB0ZXN0VG9rZW5Eb2N1bWVudC51cGRhdGUodGVzdFRva2VuLmRhdGEpKTtcclxuLy8gICB9LCAxMDAwKTtcclxuXHJcbi8vIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZXZ0KSB7XHJcbi8vICAgICBjb25zdCBtb3VzZVBvcyA9IGdldE1vdXNlUG9zKGNhbnZhcywgZXZ0KTtcclxuLy8gICAgIG1vdXNlUG9zaXRpb24gPSBtb3VzZVBvc1xyXG4vLyAgIH0sIGZhbHNlKTtcclxuLy8gfSk7XHJcblxyXG4vLyBmdW5jdGlvbiBnZXRNb3VzZVBvcyhjYW52YXMsIGV2dCkge1xyXG4vLyAgICAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgIHg6IGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0LFxyXG4vLyAgICAgICB5OiBldnQuY2xpZW50WSAtIHJlY3QudG9wXHJcbi8vICAgICB9O1xyXG4vLyAgIH1cclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XHJcbiAgaWYgKG1vZHVsZS5ob3QpIHtcclxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XHJcblxyXG4gICAgaWYgKG1vZHVsZS5ob3Quc3RhdHVzKCkgPT09IFwiYXBwbHlcIikge1xyXG4gICAgICBmb3IgKGNvbnN0IHRlbXBsYXRlIGluIF90ZW1wbGF0ZUNhY2hlKSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfdGVtcGxhdGVDYWNoZSwgdGVtcGxhdGUpKSB7XHJcbiAgICAgICAgICBkZWxldGUgX3RlbXBsYXRlQ2FjaGVbdGVtcGxhdGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgVGVtcGxhdGVQcmVsb2FkZXIucHJlbG9hZEhhbmRsZWJhcnNUZW1wbGF0ZXMoKS50aGVuKCgpID0+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IGFwcGxpY2F0aW9uIGluIHVpLndpbmRvd3MpIHtcclxuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodWkud2luZG93cywgYXBwbGljYXRpb24pKSB7XHJcbiAgICAgICAgICAgIHVpLndpbmRvd3NbYXBwbGljYXRpb25dLnJlbmRlcih0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJlNTU3MTM4ZTE0NThlZDQ0NGI4OFwiKSJdLCJzb3VyY2VSb290IjoiIn0=