/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/style.scss":
/*!*******************************!*\
  !*** ./src/client/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://my-webpack-project/./src/client/style.scss?");

/***/ }),

/***/ "./src/client/index.ts":
/*!*****************************!*\
  !*** ./src/client/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/client/style.scss\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/client/utils.ts\");\n\n\nvar arrEng = JSON.parse(localStorage.getItem('arrEng'));\nvar arrRu = JSON.parse(localStorage.getItem('arrRu'));\nvar counter = localStorage.getItem('counter');\nvar initCounter = function () {\n    if (counter) {\n        var counterElement = document.querySelector('.dic__counter');\n        counterElement.textContent = counter;\n    }\n    else {\n        localStorage.setItem('counter', '0');\n    }\n};\nvar initLocalArrs = function () {\n    localStorage.setItem('arrEng', JSON.stringify([]));\n    localStorage.setItem('arrRu', JSON.stringify([]));\n};\nvar initList = function () {\n    if (arrEng && arrRu) {\n        var list_1 = document.querySelector('.dic__list');\n        arrEng.forEach(function (engWord, wordIndex) {\n            createRow(list_1, engWord, arrRu[wordIndex], wordIndex);\n        });\n    }\n    else {\n        initLocalArrs();\n    }\n};\nvar getTranslate = function (language, wordIndex) {\n    if (language === 'ru') {\n        return arrEng[wordIndex];\n    }\n    else {\n        return arrRu[wordIndex];\n    }\n};\nvar getRandomWord = function () {\n    var word = '';\n    var language = 'ru';\n    var wordIndex = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(arrEng.length);\n    if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(2) === 1) {\n        word = arrEng[wordIndex];\n        language = 'eng';\n    }\n    else {\n        word = arrRu[wordIndex];\n    }\n    return {\n        word: word,\n        language: language,\n        wordIndex: wordIndex,\n    };\n};\nvar initTestList = function () {\n    var list = document.querySelector('.dic__list');\n    var _a = getRandomWord(), word = _a.word, wordIndex = _a.wordIndex, language = _a.language;\n    var row = document.createElement('div');\n    var wordElement = document.createElement('span');\n    var wordInput = document.createElement('input');\n    var newWordButton = document.createElement('button');\n    var okButton = document.createElement('button');\n    wordElement.classList.add('dic_list__guessed-word');\n    wordInput.classList.add('dic_list__word-input');\n    okButton.classList.add('dic_list__ok-button');\n    newWordButton.classList.add('dic_list__new-word-button');\n    row.classList.add('dic_list__word-row');\n    newWordButton.textContent = 'new word';\n    okButton.textContent = 'OK';\n    wordElement.textContent = word;\n    newWordButton.addEventListener('click', function () {\n        clearDomList();\n        initTestList();\n    });\n    okButton.addEventListener('click', function () {\n        var counterElement = document.querySelector('.dic__counter');\n        var count = localStorage.getItem('counter');\n        var scores = '';\n        if (wordInput.value === getTranslate(language, wordIndex)) {\n            scores = String(+count + 1);\n        }\n        else {\n            scores = String(+count - 1);\n        }\n        console.log(scores, counter);\n        localStorage.setItem('counter', scores);\n        counterElement.textContent = scores;\n    });\n    row.appendChild(wordElement);\n    row.appendChild(wordInput);\n    row.appendChild(okButton);\n    row.appendChild(newWordButton);\n    list.appendChild(row);\n};\nvar clearDomList = function () {\n    var list = document.querySelector('.dic__list');\n    list.innerHTML = '';\n};\nvar createRow = function (list, engWord, ruWord, index) {\n    var row = document.createElement('div');\n    // TODO drag rows.\n    //row.addEventListener('drag', () => {}, false);\n    var cellEng = document.createElement('span');\n    var cellRu = document.createElement('span');\n    var removeButton = document.createElement('button');\n    row.classList.add('dic_list__row');\n    cellEng.classList.add('dic_list__cell');\n    cellRu.classList.add('dic_list__cell');\n    removeButton.classList.add('dic_list__button');\n    removeButton.textContent = 'X';\n    removeButton.dataset.index = String(index);\n    removeButton.addEventListener('click', function () {\n        var index = this.dataset.index;\n        arrRu.splice(Number(index), 1);\n        arrEng.splice(Number(index), 1);\n        localStorage.setItem('arrEng', JSON.stringify(arrEng));\n        localStorage.setItem('arrRu', JSON.stringify(arrRu));\n        this.removeEventListener;\n        this.parentElement.remove();\n    });\n    row.appendChild(cellEng);\n    row.appendChild(cellRu);\n    row.appendChild(removeButton);\n    list.appendChild(row);\n    cellEng.textContent = engWord;\n    cellRu.textContent = ruWord;\n};\nvar isTestMode = true;\nvar toggleTestMode = function () {\n    var list = document.querySelector('.dic__list');\n    if (isTestMode) {\n        clearDomList();\n        initTestList();\n        list.style.justifyContent = 'center';\n    }\n    else {\n        clearDomList();\n        initList();\n        list.style.justifyContent = 'start';\n    }\n    isTestMode = !isTestMode;\n};\nvar addRow = function (evt) {\n    evt.preventDefault();\n    if (!isTestMode) {\n        toggleTestMode();\n    }\n    var inputRu = document.querySelector('.dic_form__input--ru');\n    var inputEng = document.querySelector('.dic_form__input--eng');\n    var list = document.querySelector('.dic__list');\n    createRow(list, inputEng.value, inputRu.value, arrRu.length);\n    list.scrollTop = list.scrollHeight;\n    arrRu.push(inputRu.value);\n    arrEng.push(inputEng.value);\n    localStorage.setItem('arrEng', JSON.stringify(arrEng));\n    localStorage.setItem('arrRu', JSON.stringify(arrRu));\n    inputRu.value = '';\n    inputEng.value = '';\n};\nvar initWindow = function () {\n    initList();\n    initCounter();\n    var addButton = document.querySelector('.dic_form__button--add');\n    var testButton = document.querySelector('.dic_form__button--test');\n    addButton.addEventListener('click', addRow);\n    testButton.addEventListener('click', toggleTestMode);\n    document.addEventListener('keydown', function (event) {\n        var keyName = event.key;\n        if (keyName === 'Control') {\n            var inputRu = document.querySelector('.dic_form__input--eng');\n            inputRu.focus();\n        }\n    });\n};\ninitWindow();\n\n\n//# sourceURL=webpack://my-webpack-project/./src/client/index.ts?");

/***/ }),

/***/ "./src/client/utils.ts":
/*!*****************************!*\
  !*** ./src/client/utils.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getRandomInt\": () => (/* binding */ getRandomInt)\n/* harmony export */ });\n/**\n * @file Exports utilitarian functions.\n */\nvar getRandomInt = function (max) {\n    return Math.floor(Math.random() * max);\n};\n\n\n//# sourceURL=webpack://my-webpack-project/./src/client/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/index.ts");
/******/ 	
/******/ })()
;