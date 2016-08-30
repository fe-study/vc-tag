(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vcTag"] = factory();
	else
		root["vcTag"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(3)
module.exports = __webpack_require__(7)

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(6)
if (false) {
(function () {
var hotAPI = require("vue-hot-reload-api")
hotAPI.install(require("vue"))
if (!hotAPI.compatible) return
var id = "-!babel!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Tag.vue"
hotAPI.createRecord(id, module.exports)
module.hot.accept(["-!babel!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Tag.vue","-!vue-html-loader!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Tag.vue"], function () {
var newOptions = require("-!babel!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Tag.vue")
if (newOptions && newOptions.__esModule) newOptions = newOptions.default
var newTemplate = require("-!vue-html-loader!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Tag.vue")
hotAPI.update(id, newOptions, newTemplate)
})
})()
}

/***/ },
/* 2 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../node_modules/.0.21.0@css-loader/index.js!./../../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-4e5d484b&file=Tag.vue!./../../../node_modules/.2.2.3@less-loader/index.js!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Tag.vue", function() {
			var newContent = require("!!./../../../node_modules/.0.21.0@css-loader/index.js!./../../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-4e5d484b&file=Tag.vue!./../../../node_modules/.2.2.3@less-loader/index.js!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Tag.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, ".vc-tag-component .tag {\n  display: inline-block;\n  line-height: 28px;\n  height: 28px;\n  padding: 0 10px;\n  border-radius: 4px;\n  border: 1px solid #e9e9e9;\n  background: #f7f7f7;\n  font-size: 14px;\n  -webkit-transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n  vertical-align: middle;\n  opacity: 1;\n  overflow: hidden;\n  margin: 2px 4px 2px 0;\n  cursor: pointer;\n  color: #fff;\n}\n.vc-tag-component .btn[disabled]:hover {\n  color: #fff;\n  cursor: not-allowed;\n}\n.vc-tag-component .size-sm {\n  height: 24px;\n  line-height: 24px;\n  font-size: 12px;\n}\n.vc-tag-component .size-lg {\n  height: 32px;\n  line-height: 32px;\n  font-size: 16px;\n}\n.vc-tag-component .clear-it {\n  font-size: 10px;\n  font-weight: 100;\n}\n.fade-transition {\n  display: inline-block;\n}\n.fade-enter {\n  -webkit-animation: fadeIn .2s;\n          animation: fadeIn .2s;\n}\n.fade-leave {\n  -webkit-animation: fadeOutLeft .5s;\n          animation: fadeOutLeft .5s;\n}\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.fadeIn {\n  -webkit-animation-name: fadeIn;\n  animation-name: fadeIn;\n}\n@-webkit-keyframes fadeOutLeft {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n@keyframes fadeOutLeft {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n.fadeOutLeft {\n  -webkit-animation-name: fadeOutLeft;\n  animation-name: fadeOutLeft;\n}\n", ""]);

// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = "<div class=\"vc-tag-component\" v-show=\"show\" transition=\"fade\">\n        <button\n            v-el:tag\n            :class=\"{ 'tag btn': true, 'btn-disabled': disabled, 'size-sm': size === 'small', 'size-lg': size === 'large' }\"\n            :style=\"{ 'background-color': color }\"\n            :disabled=\"disabled\"\n        >\n            <span class=\"vc-tag-text\">{{ label }}</span>\n            <i v-show=\"closeable\" @click=\"handleClear\" class=\"clear-it glyphicon glyphicon-remove\" aria-hidden=\"true\"></i>\n        </button>\n    </div>";

/***/ },
/* 7 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// <template>
//     <div class="vc-tag-component" v-show="show" transition="fade">
//         <button
//             v-el:tag
//             :class="{ 'tag btn': true, 'btn-disabled': disabled, 'size-sm': size === 'small', 'size-lg': size === 'large' }"
//             :style="{ 'background-color': color }"
//             :disabled="disabled"
//         >
//             <span class="vc-tag-text">{{ label }}</span>
//             <i v-show="closeable" @click="handleClear" class="clear-it glyphicon glyphicon-remove" aria-hidden="true"></i>
//         </button>
//     </div>
// </template>

// <style>
//     .vc-tag-component .tag {
//         display: inline-block;
//         line-height: 28px;
//         height: 28px;
//         padding: 0 10px;
//         border-radius: 4px;
//         border: 1px solid #e9e9e9;
//         background: #f7f7f7;
//         font-size: 14px;
//         -webkit-transition: all .3s cubic-bezier(.78, .14, .15, .86);
//         transition: all .3s cubic-bezier(.78, .14, .15, .86);
//         vertical-align: middle;
//         opacity: 1;
//         overflow: hidden;
//         margin: 2px 4px 2px 0;
//         cursor: pointer;
//         color: #fff;
//     }
//     .vc-tag-component .btn[disabled]:hover {
//         color: #fff;
//         cursor: not-allowed;
//     }
//     .vc-tag-component .size-sm {
//         height: 24px;
//         line-height: 24px;
//         font-size: 12px;
//     }
//     .vc-tag-component .size-lg {
//         height: 32px;
//         line-height: 32px;
//         font-size: 16px;
//     }
//     .vc-tag-component .clear-it {
//         font-size: 10px;
//         font-weight: 100;
//     }

//     .fade-transition {
//         display: inline-block;
//     }
//     .fade-enter {
//         animation: fadeIn .2s;
//     }
//     .fade-leave {
//         animation: fadeOutLeft .5s;
//     }

//     @-webkit-keyframes fadeIn {
//         from {
//             opacity: 0;
//         }

//         to {
//             opacity: 1;
//         }
//     }
//     @keyframes fadeIn {
//         from {
//             opacity: 0;
//         }

//         to {
//             opacity: 1;
//         }
//     }
//     .fadeIn {
//         -webkit-animation-name: fadeIn;
//         animation-name: fadeIn;
//     }

//     @-webkit-keyframes fadeOutLeft {
//         from {
//             opacity: 1;
//         }

//         to {
//             opacity: 0;
//             -webkit-transform: translate3d(-100%, 0, 0);
//             transform: translate3d(-100%, 0, 0);
//         }
//     }

//     @keyframes fadeOutLeft {
//         from {
//             opacity: 1;
//         }

//         to {
//             opacity: 0;
//             -webkit-transform: translate3d(-100%, 0, 0);
//             transform: translate3d(-100%, 0, 0);
//         }
//     }

//     .fadeOutLeft {
//         -webkit-animation-name: fadeOutLeft;
//         animation-name: fadeOutLeft;
//     }
// </style>

// <script>
exports.default = {
    props: {
        show: {
            type: Boolean,
            default: true
        },
        label: {
            type: String
        },
        size: {
            type: String,
            default: 'default'
        },
        closeable: {
            type: Boolean
        },
        disabled: {
            type: Boolean,
            default: false
        },
        status: String,
        onClose: Function,
        // animationend callback
        afterClose: Function
    },
    data: function data() {
        return {};
    },
    created: function created() {},
    ready: function ready() {},
    computed: {
        color: function color() {
            if (this.status === 'success') {
                return '#87d068';
            }
            if (this.status === 'warning') {
                return '#fa0';
            }
            if (this.status === 'danger') {
                return '#f50';
            }
            if (this.status === 'info') {
                return '#2db7f5';
            }
        }
    },
    watch: {},
    methods: {
        handleClear: function handleClear() {
            var _this = this;

            this.show = false;
            this.onClose && this.onClose();
            var tag = this.$el;
            tag && tag.addEventListener('animationend', function () {
                _this.afterClose && _this.afterClose();
            }, false);
        }
    },
    beforeDestroy: function beforeDestroy() {},
    destroy: function destroy() {}
};
// </script>

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _Tag = __webpack_require__(1);

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Tag2.default;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=build.js.map