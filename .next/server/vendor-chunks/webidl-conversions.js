"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/webidl-conversions";
exports.ids = ["vendor-chunks/webidl-conversions"];
exports.modules = {

/***/ "(ssr)/./node_modules/webidl-conversions/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/webidl-conversions/lib/index.js ***!
  \******************************************************/
/***/ ((module) => {

eval("\n\nvar conversions = {};\nmodule.exports = conversions;\n\nfunction sign(x) {\n    return x < 0 ? -1 : 1;\n}\n\nfunction evenRound(x) {\n    // Round x to the nearest integer, choosing the even integer if it lies halfway between two.\n    if ((x % 1) === 0.5 && (x & 1) === 0) { // [even number].5; round down (i.e. floor)\n        return Math.floor(x);\n    } else {\n        return Math.round(x);\n    }\n}\n\nfunction createNumberConversion(bitLength, typeOpts) {\n    if (!typeOpts.unsigned) {\n        --bitLength;\n    }\n    const lowerBound = typeOpts.unsigned ? 0 : -Math.pow(2, bitLength);\n    const upperBound = Math.pow(2, bitLength) - 1;\n\n    const moduloVal = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength) : Math.pow(2, bitLength);\n    const moduloBound = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength - 1) : Math.pow(2, bitLength - 1);\n\n    return function(V, opts) {\n        if (!opts) opts = {};\n\n        let x = +V;\n\n        if (opts.enforceRange) {\n            if (!Number.isFinite(x)) {\n                throw new TypeError(\"Argument is not a finite number\");\n            }\n\n            x = sign(x) * Math.floor(Math.abs(x));\n            if (x < lowerBound || x > upperBound) {\n                throw new TypeError(\"Argument is not in byte range\");\n            }\n\n            return x;\n        }\n\n        if (!isNaN(x) && opts.clamp) {\n            x = evenRound(x);\n\n            if (x < lowerBound) x = lowerBound;\n            if (x > upperBound) x = upperBound;\n            return x;\n        }\n\n        if (!Number.isFinite(x) || x === 0) {\n            return 0;\n        }\n\n        x = sign(x) * Math.floor(Math.abs(x));\n        x = x % moduloVal;\n\n        if (!typeOpts.unsigned && x >= moduloBound) {\n            return x - moduloVal;\n        } else if (typeOpts.unsigned) {\n            if (x < 0) {\n              x += moduloVal;\n            } else if (x === -0) { // don't return negative zero\n              return 0;\n            }\n        }\n\n        return x;\n    }\n}\n\nconversions[\"void\"] = function () {\n    return undefined;\n};\n\nconversions[\"boolean\"] = function (val) {\n    return !!val;\n};\n\nconversions[\"byte\"] = createNumberConversion(8, { unsigned: false });\nconversions[\"octet\"] = createNumberConversion(8, { unsigned: true });\n\nconversions[\"short\"] = createNumberConversion(16, { unsigned: false });\nconversions[\"unsigned short\"] = createNumberConversion(16, { unsigned: true });\n\nconversions[\"long\"] = createNumberConversion(32, { unsigned: false });\nconversions[\"unsigned long\"] = createNumberConversion(32, { unsigned: true });\n\nconversions[\"long long\"] = createNumberConversion(32, { unsigned: false, moduloBitLength: 64 });\nconversions[\"unsigned long long\"] = createNumberConversion(32, { unsigned: true, moduloBitLength: 64 });\n\nconversions[\"double\"] = function (V) {\n    const x = +V;\n\n    if (!Number.isFinite(x)) {\n        throw new TypeError(\"Argument is not a finite floating-point value\");\n    }\n\n    return x;\n};\n\nconversions[\"unrestricted double\"] = function (V) {\n    const x = +V;\n\n    if (isNaN(x)) {\n        throw new TypeError(\"Argument is NaN\");\n    }\n\n    return x;\n};\n\n// not quite valid, but good enough for JS\nconversions[\"float\"] = conversions[\"double\"];\nconversions[\"unrestricted float\"] = conversions[\"unrestricted double\"];\n\nconversions[\"DOMString\"] = function (V, opts) {\n    if (!opts) opts = {};\n\n    if (opts.treatNullAsEmptyString && V === null) {\n        return \"\";\n    }\n\n    return String(V);\n};\n\nconversions[\"ByteString\"] = function (V, opts) {\n    const x = String(V);\n    let c = undefined;\n    for (let i = 0; (c = x.codePointAt(i)) !== undefined; ++i) {\n        if (c > 255) {\n            throw new TypeError(\"Argument is not a valid bytestring\");\n        }\n    }\n\n    return x;\n};\n\nconversions[\"USVString\"] = function (V) {\n    const S = String(V);\n    const n = S.length;\n    const U = [];\n    for (let i = 0; i < n; ++i) {\n        const c = S.charCodeAt(i);\n        if (c < 0xD800 || c > 0xDFFF) {\n            U.push(String.fromCodePoint(c));\n        } else if (0xDC00 <= c && c <= 0xDFFF) {\n            U.push(String.fromCodePoint(0xFFFD));\n        } else {\n            if (i === n - 1) {\n                U.push(String.fromCodePoint(0xFFFD));\n            } else {\n                const d = S.charCodeAt(i + 1);\n                if (0xDC00 <= d && d <= 0xDFFF) {\n                    const a = c & 0x3FF;\n                    const b = d & 0x3FF;\n                    U.push(String.fromCodePoint((2 << 15) + (2 << 9) * a + b));\n                    ++i;\n                } else {\n                    U.push(String.fromCodePoint(0xFFFD));\n                }\n            }\n        }\n    }\n\n    return U.join('');\n};\n\nconversions[\"Date\"] = function (V, opts) {\n    if (!(V instanceof Date)) {\n        throw new TypeError(\"Argument is not a Date object\");\n    }\n    if (isNaN(V)) {\n        return undefined;\n    }\n\n    return V;\n};\n\nconversions[\"RegExp\"] = function (V, opts) {\n    if (!(V instanceof RegExp)) {\n        V = new RegExp(V);\n    }\n\n    return V;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2ViaWRsLWNvbnZlcnNpb25zL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDLG9CQUFvQjtBQUNoRTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsY0FBYyxxQkFBcUI7QUFDbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtEQUFrRCxpQkFBaUI7QUFDbkUsbURBQW1ELGdCQUFnQjs7QUFFbkUsb0RBQW9ELGlCQUFpQjtBQUNyRSw2REFBNkQsZ0JBQWdCOztBQUU3RSxtREFBbUQsaUJBQWlCO0FBQ3BFLDREQUE0RCxnQkFBZ0I7O0FBRTVFLHdEQUF3RCxzQ0FBc0M7QUFDOUYsaUVBQWlFLHFDQUFxQzs7QUFFdEc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQ0FBc0M7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYmlkbC1jb252ZXJzaW9ucy9saWIvaW5kZXguanM/NGQyNCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIGNvbnZlcnNpb25zID0ge307XG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnNpb25zO1xuXG5mdW5jdGlvbiBzaWduKHgpIHtcbiAgICByZXR1cm4geCA8IDAgPyAtMSA6IDE7XG59XG5cbmZ1bmN0aW9uIGV2ZW5Sb3VuZCh4KSB7XG4gICAgLy8gUm91bmQgeCB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyLCBjaG9vc2luZyB0aGUgZXZlbiBpbnRlZ2VyIGlmIGl0IGxpZXMgaGFsZndheSBiZXR3ZWVuIHR3by5cbiAgICBpZiAoKHggJSAxKSA9PT0gMC41ICYmICh4ICYgMSkgPT09IDApIHsgLy8gW2V2ZW4gbnVtYmVyXS41OyByb3VuZCBkb3duIChpLmUuIGZsb29yKVxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh4KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU51bWJlckNvbnZlcnNpb24oYml0TGVuZ3RoLCB0eXBlT3B0cykge1xuICAgIGlmICghdHlwZU9wdHMudW5zaWduZWQpIHtcbiAgICAgICAgLS1iaXRMZW5ndGg7XG4gICAgfVxuICAgIGNvbnN0IGxvd2VyQm91bmQgPSB0eXBlT3B0cy51bnNpZ25lZCA/IDAgOiAtTWF0aC5wb3coMiwgYml0TGVuZ3RoKTtcbiAgICBjb25zdCB1cHBlckJvdW5kID0gTWF0aC5wb3coMiwgYml0TGVuZ3RoKSAtIDE7XG5cbiAgICBjb25zdCBtb2R1bG9WYWwgPSB0eXBlT3B0cy5tb2R1bG9CaXRMZW5ndGggPyBNYXRoLnBvdygyLCB0eXBlT3B0cy5tb2R1bG9CaXRMZW5ndGgpIDogTWF0aC5wb3coMiwgYml0TGVuZ3RoKTtcbiAgICBjb25zdCBtb2R1bG9Cb3VuZCA9IHR5cGVPcHRzLm1vZHVsb0JpdExlbmd0aCA/IE1hdGgucG93KDIsIHR5cGVPcHRzLm1vZHVsb0JpdExlbmd0aCAtIDEpIDogTWF0aC5wb3coMiwgYml0TGVuZ3RoIC0gMSk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oViwgb3B0cykge1xuICAgICAgICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcblxuICAgICAgICBsZXQgeCA9ICtWO1xuXG4gICAgICAgIGlmIChvcHRzLmVuZm9yY2VSYW5nZSkge1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoeCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnQgaXMgbm90IGEgZmluaXRlIG51bWJlclwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgeCA9IHNpZ24oeCkgKiBNYXRoLmZsb29yKE1hdGguYWJzKHgpKTtcbiAgICAgICAgICAgIGlmICh4IDwgbG93ZXJCb3VuZCB8fCB4ID4gdXBwZXJCb3VuZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBpcyBub3QgaW4gYnl0ZSByYW5nZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzTmFOKHgpICYmIG9wdHMuY2xhbXApIHtcbiAgICAgICAgICAgIHggPSBldmVuUm91bmQoeCk7XG5cbiAgICAgICAgICAgIGlmICh4IDwgbG93ZXJCb3VuZCkgeCA9IGxvd2VyQm91bmQ7XG4gICAgICAgICAgICBpZiAoeCA+IHVwcGVyQm91bmQpIHggPSB1cHBlckJvdW5kO1xuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh4KSB8fCB4ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHggPSBzaWduKHgpICogTWF0aC5mbG9vcihNYXRoLmFicyh4KSk7XG4gICAgICAgIHggPSB4ICUgbW9kdWxvVmFsO1xuXG4gICAgICAgIGlmICghdHlwZU9wdHMudW5zaWduZWQgJiYgeCA+PSBtb2R1bG9Cb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuIHggLSBtb2R1bG9WYWw7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZU9wdHMudW5zaWduZWQpIHtcbiAgICAgICAgICAgIGlmICh4IDwgMCkge1xuICAgICAgICAgICAgICB4ICs9IG1vZHVsb1ZhbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeCA9PT0gLTApIHsgLy8gZG9uJ3QgcmV0dXJuIG5lZ2F0aXZlIHplcm9cbiAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geDtcbiAgICB9XG59XG5cbmNvbnZlcnNpb25zW1widm9pZFwiXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuY29udmVyc2lvbnNbXCJib29sZWFuXCJdID0gZnVuY3Rpb24gKHZhbCkge1xuICAgIHJldHVybiAhIXZhbDtcbn07XG5cbmNvbnZlcnNpb25zW1wiYnl0ZVwiXSA9IGNyZWF0ZU51bWJlckNvbnZlcnNpb24oOCwgeyB1bnNpZ25lZDogZmFsc2UgfSk7XG5jb252ZXJzaW9uc1tcIm9jdGV0XCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbig4LCB7IHVuc2lnbmVkOiB0cnVlIH0pO1xuXG5jb252ZXJzaW9uc1tcInNob3J0XCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbigxNiwgeyB1bnNpZ25lZDogZmFsc2UgfSk7XG5jb252ZXJzaW9uc1tcInVuc2lnbmVkIHNob3J0XCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbigxNiwgeyB1bnNpZ25lZDogdHJ1ZSB9KTtcblxuY29udmVyc2lvbnNbXCJsb25nXCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbigzMiwgeyB1bnNpZ25lZDogZmFsc2UgfSk7XG5jb252ZXJzaW9uc1tcInVuc2lnbmVkIGxvbmdcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDMyLCB7IHVuc2lnbmVkOiB0cnVlIH0pO1xuXG5jb252ZXJzaW9uc1tcImxvbmcgbG9uZ1wiXSA9IGNyZWF0ZU51bWJlckNvbnZlcnNpb24oMzIsIHsgdW5zaWduZWQ6IGZhbHNlLCBtb2R1bG9CaXRMZW5ndGg6IDY0IH0pO1xuY29udmVyc2lvbnNbXCJ1bnNpZ25lZCBsb25nIGxvbmdcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDMyLCB7IHVuc2lnbmVkOiB0cnVlLCBtb2R1bG9CaXRMZW5ndGg6IDY0IH0pO1xuXG5jb252ZXJzaW9uc1tcImRvdWJsZVwiXSA9IGZ1bmN0aW9uIChWKSB7XG4gICAgY29uc3QgeCA9ICtWO1xuXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoeCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IGlzIG5vdCBhIGZpbml0ZSBmbG9hdGluZy1wb2ludCB2YWx1ZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4geDtcbn07XG5cbmNvbnZlcnNpb25zW1widW5yZXN0cmljdGVkIGRvdWJsZVwiXSA9IGZ1bmN0aW9uIChWKSB7XG4gICAgY29uc3QgeCA9ICtWO1xuXG4gICAgaWYgKGlzTmFOKHgpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBpcyBOYU5cIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHg7XG59O1xuXG4vLyBub3QgcXVpdGUgdmFsaWQsIGJ1dCBnb29kIGVub3VnaCBmb3IgSlNcbmNvbnZlcnNpb25zW1wiZmxvYXRcIl0gPSBjb252ZXJzaW9uc1tcImRvdWJsZVwiXTtcbmNvbnZlcnNpb25zW1widW5yZXN0cmljdGVkIGZsb2F0XCJdID0gY29udmVyc2lvbnNbXCJ1bnJlc3RyaWN0ZWQgZG91YmxlXCJdO1xuXG5jb252ZXJzaW9uc1tcIkRPTVN0cmluZ1wiXSA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgaWYgKCFvcHRzKSBvcHRzID0ge307XG5cbiAgICBpZiAob3B0cy50cmVhdE51bGxBc0VtcHR5U3RyaW5nICYmIFYgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIFN0cmluZyhWKTtcbn07XG5cbmNvbnZlcnNpb25zW1wiQnl0ZVN0cmluZ1wiXSA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgY29uc3QgeCA9IFN0cmluZyhWKTtcbiAgICBsZXQgYyA9IHVuZGVmaW5lZDtcbiAgICBmb3IgKGxldCBpID0gMDsgKGMgPSB4LmNvZGVQb2ludEF0KGkpKSAhPT0gdW5kZWZpbmVkOyArK2kpIHtcbiAgICAgICAgaWYgKGMgPiAyNTUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBpcyBub3QgYSB2YWxpZCBieXRlc3RyaW5nXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHg7XG59O1xuXG5jb252ZXJzaW9uc1tcIlVTVlN0cmluZ1wiXSA9IGZ1bmN0aW9uIChWKSB7XG4gICAgY29uc3QgUyA9IFN0cmluZyhWKTtcbiAgICBjb25zdCBuID0gUy5sZW5ndGg7XG4gICAgY29uc3QgVSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGNvbnN0IGMgPSBTLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPiAweERGRkYpIHtcbiAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludChjKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoMHhEQzAwIDw9IGMgJiYgYyA8PSAweERGRkYpIHtcbiAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgweEZGRkQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpID09PSBuIC0gMSkge1xuICAgICAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgweEZGRkQpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IFMuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICAgICAgICAgICAgaWYgKDB4REMwMCA8PSBkICYmIGQgPD0gMHhERkZGKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBjICYgMHgzRkY7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSBkICYgMHgzRkY7XG4gICAgICAgICAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgoMiA8PCAxNSkgKyAoMiA8PCA5KSAqIGEgKyBiKSk7XG4gICAgICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBVLnB1c2goU3RyaW5nLmZyb21Db2RlUG9pbnQoMHhGRkZEKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFUuam9pbignJyk7XG59O1xuXG5jb252ZXJzaW9uc1tcIkRhdGVcIl0gPSBmdW5jdGlvbiAoViwgb3B0cykge1xuICAgIGlmICghKFYgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnQgaXMgbm90IGEgRGF0ZSBvYmplY3RcIik7XG4gICAgfVxuICAgIGlmIChpc05hTihWKSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBWO1xufTtcblxuY29udmVyc2lvbnNbXCJSZWdFeHBcIl0gPSBmdW5jdGlvbiAoViwgb3B0cykge1xuICAgIGlmICghKFYgaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgICAgIFYgPSBuZXcgUmVnRXhwKFYpO1xuICAgIH1cblxuICAgIHJldHVybiBWO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/webidl-conversions/lib/index.js\n");

/***/ }),

/***/ "(action-browser)/./node_modules/webidl-conversions/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/webidl-conversions/lib/index.js ***!
  \******************************************************/
/***/ ((module) => {

eval("\n\nvar conversions = {};\nmodule.exports = conversions;\n\nfunction sign(x) {\n    return x < 0 ? -1 : 1;\n}\n\nfunction evenRound(x) {\n    // Round x to the nearest integer, choosing the even integer if it lies halfway between two.\n    if ((x % 1) === 0.5 && (x & 1) === 0) { // [even number].5; round down (i.e. floor)\n        return Math.floor(x);\n    } else {\n        return Math.round(x);\n    }\n}\n\nfunction createNumberConversion(bitLength, typeOpts) {\n    if (!typeOpts.unsigned) {\n        --bitLength;\n    }\n    const lowerBound = typeOpts.unsigned ? 0 : -Math.pow(2, bitLength);\n    const upperBound = Math.pow(2, bitLength) - 1;\n\n    const moduloVal = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength) : Math.pow(2, bitLength);\n    const moduloBound = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength - 1) : Math.pow(2, bitLength - 1);\n\n    return function(V, opts) {\n        if (!opts) opts = {};\n\n        let x = +V;\n\n        if (opts.enforceRange) {\n            if (!Number.isFinite(x)) {\n                throw new TypeError(\"Argument is not a finite number\");\n            }\n\n            x = sign(x) * Math.floor(Math.abs(x));\n            if (x < lowerBound || x > upperBound) {\n                throw new TypeError(\"Argument is not in byte range\");\n            }\n\n            return x;\n        }\n\n        if (!isNaN(x) && opts.clamp) {\n            x = evenRound(x);\n\n            if (x < lowerBound) x = lowerBound;\n            if (x > upperBound) x = upperBound;\n            return x;\n        }\n\n        if (!Number.isFinite(x) || x === 0) {\n            return 0;\n        }\n\n        x = sign(x) * Math.floor(Math.abs(x));\n        x = x % moduloVal;\n\n        if (!typeOpts.unsigned && x >= moduloBound) {\n            return x - moduloVal;\n        } else if (typeOpts.unsigned) {\n            if (x < 0) {\n              x += moduloVal;\n            } else if (x === -0) { // don't return negative zero\n              return 0;\n            }\n        }\n\n        return x;\n    }\n}\n\nconversions[\"void\"] = function () {\n    return undefined;\n};\n\nconversions[\"boolean\"] = function (val) {\n    return !!val;\n};\n\nconversions[\"byte\"] = createNumberConversion(8, { unsigned: false });\nconversions[\"octet\"] = createNumberConversion(8, { unsigned: true });\n\nconversions[\"short\"] = createNumberConversion(16, { unsigned: false });\nconversions[\"unsigned short\"] = createNumberConversion(16, { unsigned: true });\n\nconversions[\"long\"] = createNumberConversion(32, { unsigned: false });\nconversions[\"unsigned long\"] = createNumberConversion(32, { unsigned: true });\n\nconversions[\"long long\"] = createNumberConversion(32, { unsigned: false, moduloBitLength: 64 });\nconversions[\"unsigned long long\"] = createNumberConversion(32, { unsigned: true, moduloBitLength: 64 });\n\nconversions[\"double\"] = function (V) {\n    const x = +V;\n\n    if (!Number.isFinite(x)) {\n        throw new TypeError(\"Argument is not a finite floating-point value\");\n    }\n\n    return x;\n};\n\nconversions[\"unrestricted double\"] = function (V) {\n    const x = +V;\n\n    if (isNaN(x)) {\n        throw new TypeError(\"Argument is NaN\");\n    }\n\n    return x;\n};\n\n// not quite valid, but good enough for JS\nconversions[\"float\"] = conversions[\"double\"];\nconversions[\"unrestricted float\"] = conversions[\"unrestricted double\"];\n\nconversions[\"DOMString\"] = function (V, opts) {\n    if (!opts) opts = {};\n\n    if (opts.treatNullAsEmptyString && V === null) {\n        return \"\";\n    }\n\n    return String(V);\n};\n\nconversions[\"ByteString\"] = function (V, opts) {\n    const x = String(V);\n    let c = undefined;\n    for (let i = 0; (c = x.codePointAt(i)) !== undefined; ++i) {\n        if (c > 255) {\n            throw new TypeError(\"Argument is not a valid bytestring\");\n        }\n    }\n\n    return x;\n};\n\nconversions[\"USVString\"] = function (V) {\n    const S = String(V);\n    const n = S.length;\n    const U = [];\n    for (let i = 0; i < n; ++i) {\n        const c = S.charCodeAt(i);\n        if (c < 0xD800 || c > 0xDFFF) {\n            U.push(String.fromCodePoint(c));\n        } else if (0xDC00 <= c && c <= 0xDFFF) {\n            U.push(String.fromCodePoint(0xFFFD));\n        } else {\n            if (i === n - 1) {\n                U.push(String.fromCodePoint(0xFFFD));\n            } else {\n                const d = S.charCodeAt(i + 1);\n                if (0xDC00 <= d && d <= 0xDFFF) {\n                    const a = c & 0x3FF;\n                    const b = d & 0x3FF;\n                    U.push(String.fromCodePoint((2 << 15) + (2 << 9) * a + b));\n                    ++i;\n                } else {\n                    U.push(String.fromCodePoint(0xFFFD));\n                }\n            }\n        }\n    }\n\n    return U.join('');\n};\n\nconversions[\"Date\"] = function (V, opts) {\n    if (!(V instanceof Date)) {\n        throw new TypeError(\"Argument is not a Date object\");\n    }\n    if (isNaN(V)) {\n        return undefined;\n    }\n\n    return V;\n};\n\nconversions[\"RegExp\"] = function (V, opts) {\n    if (!(V instanceof RegExp)) {\n        V = new RegExp(V);\n    }\n\n    return V;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy93ZWJpZGwtY29udmVyc2lvbnMvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEMsb0JBQW9CO0FBQ2hFO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxjQUFjLHFCQUFxQjtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQWtELGlCQUFpQjtBQUNuRSxtREFBbUQsZ0JBQWdCOztBQUVuRSxvREFBb0QsaUJBQWlCO0FBQ3JFLDZEQUE2RCxnQkFBZ0I7O0FBRTdFLG1EQUFtRCxpQkFBaUI7QUFDcEUsNERBQTRELGdCQUFnQjs7QUFFNUUsd0RBQXdELHNDQUFzQztBQUM5RixpRUFBaUUscUNBQXFDOztBQUV0RztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNDQUFzQztBQUMxRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2ViaWRsLWNvbnZlcnNpb25zL2xpYi9pbmRleC5qcz84N2RlIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY29udmVyc2lvbnMgPSB7fTtcbm1vZHVsZS5leHBvcnRzID0gY29udmVyc2lvbnM7XG5cbmZ1bmN0aW9uIHNpZ24oeCkge1xuICAgIHJldHVybiB4IDwgMCA/IC0xIDogMTtcbn1cblxuZnVuY3Rpb24gZXZlblJvdW5kKHgpIHtcbiAgICAvLyBSb3VuZCB4IHRvIHRoZSBuZWFyZXN0IGludGVnZXIsIGNob29zaW5nIHRoZSBldmVuIGludGVnZXIgaWYgaXQgbGllcyBoYWxmd2F5IGJldHdlZW4gdHdvLlxuICAgIGlmICgoeCAlIDEpID09PSAwLjUgJiYgKHggJiAxKSA9PT0gMCkgeyAvLyBbZXZlbiBudW1iZXJdLjU7IHJvdW5kIGRvd24gKGkuZS4gZmxvb3IpXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlTnVtYmVyQ29udmVyc2lvbihiaXRMZW5ndGgsIHR5cGVPcHRzKSB7XG4gICAgaWYgKCF0eXBlT3B0cy51bnNpZ25lZCkge1xuICAgICAgICAtLWJpdExlbmd0aDtcbiAgICB9XG4gICAgY29uc3QgbG93ZXJCb3VuZCA9IHR5cGVPcHRzLnVuc2lnbmVkID8gMCA6IC1NYXRoLnBvdygyLCBiaXRMZW5ndGgpO1xuICAgIGNvbnN0IHVwcGVyQm91bmQgPSBNYXRoLnBvdygyLCBiaXRMZW5ndGgpIC0gMTtcblxuICAgIGNvbnN0IG1vZHVsb1ZhbCA9IHR5cGVPcHRzLm1vZHVsb0JpdExlbmd0aCA/IE1hdGgucG93KDIsIHR5cGVPcHRzLm1vZHVsb0JpdExlbmd0aCkgOiBNYXRoLnBvdygyLCBiaXRMZW5ndGgpO1xuICAgIGNvbnN0IG1vZHVsb0JvdW5kID0gdHlwZU9wdHMubW9kdWxvQml0TGVuZ3RoID8gTWF0aC5wb3coMiwgdHlwZU9wdHMubW9kdWxvQml0TGVuZ3RoIC0gMSkgOiBNYXRoLnBvdygyLCBiaXRMZW5ndGggLSAxKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihWLCBvcHRzKSB7XG4gICAgICAgIGlmICghb3B0cykgb3B0cyA9IHt9O1xuXG4gICAgICAgIGxldCB4ID0gK1Y7XG5cbiAgICAgICAgaWYgKG9wdHMuZW5mb3JjZVJhbmdlKSB7XG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh4KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBpcyBub3QgYSBmaW5pdGUgbnVtYmVyXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB4ID0gc2lnbih4KSAqIE1hdGguZmxvb3IoTWF0aC5hYnMoeCkpO1xuICAgICAgICAgICAgaWYgKHggPCBsb3dlckJvdW5kIHx8IHggPiB1cHBlckJvdW5kKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IGlzIG5vdCBpbiBieXRlIHJhbmdlXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNOYU4oeCkgJiYgb3B0cy5jbGFtcCkge1xuICAgICAgICAgICAgeCA9IGV2ZW5Sb3VuZCh4KTtcblxuICAgICAgICAgICAgaWYgKHggPCBsb3dlckJvdW5kKSB4ID0gbG93ZXJCb3VuZDtcbiAgICAgICAgICAgIGlmICh4ID4gdXBwZXJCb3VuZCkgeCA9IHVwcGVyQm91bmQ7XG4gICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHgpIHx8IHggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgeCA9IHNpZ24oeCkgKiBNYXRoLmZsb29yKE1hdGguYWJzKHgpKTtcbiAgICAgICAgeCA9IHggJSBtb2R1bG9WYWw7XG5cbiAgICAgICAgaWYgKCF0eXBlT3B0cy51bnNpZ25lZCAmJiB4ID49IG1vZHVsb0JvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm4geCAtIG1vZHVsb1ZhbDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlT3B0cy51bnNpZ25lZCkge1xuICAgICAgICAgICAgaWYgKHggPCAwKSB7XG4gICAgICAgICAgICAgIHggKz0gbW9kdWxvVmFsO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh4ID09PSAtMCkgeyAvLyBkb24ndCByZXR1cm4gbmVnYXRpdmUgemVyb1xuICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbn1cblxuY29udmVyc2lvbnNbXCJ2b2lkXCJdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5jb252ZXJzaW9uc1tcImJvb2xlYW5cIl0gPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgcmV0dXJuICEhdmFsO1xufTtcblxuY29udmVyc2lvbnNbXCJieXRlXCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbig4LCB7IHVuc2lnbmVkOiBmYWxzZSB9KTtcbmNvbnZlcnNpb25zW1wib2N0ZXRcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDgsIHsgdW5zaWduZWQ6IHRydWUgfSk7XG5cbmNvbnZlcnNpb25zW1wic2hvcnRcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDE2LCB7IHVuc2lnbmVkOiBmYWxzZSB9KTtcbmNvbnZlcnNpb25zW1widW5zaWduZWQgc2hvcnRcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDE2LCB7IHVuc2lnbmVkOiB0cnVlIH0pO1xuXG5jb252ZXJzaW9uc1tcImxvbmdcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDMyLCB7IHVuc2lnbmVkOiBmYWxzZSB9KTtcbmNvbnZlcnNpb25zW1widW5zaWduZWQgbG9uZ1wiXSA9IGNyZWF0ZU51bWJlckNvbnZlcnNpb24oMzIsIHsgdW5zaWduZWQ6IHRydWUgfSk7XG5cbmNvbnZlcnNpb25zW1wibG9uZyBsb25nXCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbigzMiwgeyB1bnNpZ25lZDogZmFsc2UsIG1vZHVsb0JpdExlbmd0aDogNjQgfSk7XG5jb252ZXJzaW9uc1tcInVuc2lnbmVkIGxvbmcgbG9uZ1wiXSA9IGNyZWF0ZU51bWJlckNvbnZlcnNpb24oMzIsIHsgdW5zaWduZWQ6IHRydWUsIG1vZHVsb0JpdExlbmd0aDogNjQgfSk7XG5cbmNvbnZlcnNpb25zW1wiZG91YmxlXCJdID0gZnVuY3Rpb24gKFYpIHtcbiAgICBjb25zdCB4ID0gK1Y7XG5cbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh4KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnQgaXMgbm90IGEgZmluaXRlIGZsb2F0aW5nLXBvaW50IHZhbHVlXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB4O1xufTtcblxuY29udmVyc2lvbnNbXCJ1bnJlc3RyaWN0ZWQgZG91YmxlXCJdID0gZnVuY3Rpb24gKFYpIHtcbiAgICBjb25zdCB4ID0gK1Y7XG5cbiAgICBpZiAoaXNOYU4oeCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IGlzIE5hTlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4geDtcbn07XG5cbi8vIG5vdCBxdWl0ZSB2YWxpZCwgYnV0IGdvb2QgZW5vdWdoIGZvciBKU1xuY29udmVyc2lvbnNbXCJmbG9hdFwiXSA9IGNvbnZlcnNpb25zW1wiZG91YmxlXCJdO1xuY29udmVyc2lvbnNbXCJ1bnJlc3RyaWN0ZWQgZmxvYXRcIl0gPSBjb252ZXJzaW9uc1tcInVucmVzdHJpY3RlZCBkb3VibGVcIl07XG5cbmNvbnZlcnNpb25zW1wiRE9NU3RyaW5nXCJdID0gZnVuY3Rpb24gKFYsIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcblxuICAgIGlmIChvcHRzLnRyZWF0TnVsbEFzRW1wdHlTdHJpbmcgJiYgViA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gU3RyaW5nKFYpO1xufTtcblxuY29udmVyc2lvbnNbXCJCeXRlU3RyaW5nXCJdID0gZnVuY3Rpb24gKFYsIG9wdHMpIHtcbiAgICBjb25zdCB4ID0gU3RyaW5nKFYpO1xuICAgIGxldCBjID0gdW5kZWZpbmVkO1xuICAgIGZvciAobGV0IGkgPSAwOyAoYyA9IHguY29kZVBvaW50QXQoaSkpICE9PSB1bmRlZmluZWQ7ICsraSkge1xuICAgICAgICBpZiAoYyA+IDI1NSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IGlzIG5vdCBhIHZhbGlkIGJ5dGVzdHJpbmdcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geDtcbn07XG5cbmNvbnZlcnNpb25zW1wiVVNWU3RyaW5nXCJdID0gZnVuY3Rpb24gKFYpIHtcbiAgICBjb25zdCBTID0gU3RyaW5nKFYpO1xuICAgIGNvbnN0IG4gPSBTLmxlbmd0aDtcbiAgICBjb25zdCBVID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgY29uc3QgYyA9IFMuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+IDB4REZGRikge1xuICAgICAgICAgICAgVS5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KGMpKTtcbiAgICAgICAgfSBlbHNlIGlmICgweERDMDAgPD0gYyAmJiBjIDw9IDB4REZGRikge1xuICAgICAgICAgICAgVS5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KDB4RkZGRCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGkgPT09IG4gLSAxKSB7XG4gICAgICAgICAgICAgICAgVS5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KDB4RkZGRCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkID0gUy5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAoMHhEQzAwIDw9IGQgJiYgZCA8PSAweERGRkYpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYSA9IGMgJiAweDNGRjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYiA9IGQgJiAweDNGRjtcbiAgICAgICAgICAgICAgICAgICAgVS5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KCgyIDw8IDE1KSArICgyIDw8IDkpICogYSArIGIpKTtcbiAgICAgICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgweEZGRkQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gVS5qb2luKCcnKTtcbn07XG5cbmNvbnZlcnNpb25zW1wiRGF0ZVwiXSA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgaWYgKCEoViBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBpcyBub3QgYSBEYXRlIG9iamVjdFwiKTtcbiAgICB9XG4gICAgaWYgKGlzTmFOKFYpKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIFY7XG59O1xuXG5jb252ZXJzaW9uc1tcIlJlZ0V4cFwiXSA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgaWYgKCEoViBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgViA9IG5ldyBSZWdFeHAoVik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFY7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/webidl-conversions/lib/index.js\n");

/***/ })

};
;