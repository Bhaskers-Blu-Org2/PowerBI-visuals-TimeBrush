(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"), require("React"), require("ReactDOM"), require("_"), require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery", "React", "ReactDOM", "_", "d3"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jQuery"), require("React"), require("ReactDOM"), require("_"), require("d3")) : factory(root["jQuery"], root["React"], root["ReactDOM"], root["_"], root["d3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar React = __webpack_require__(4);\nvar ReactDOM = __webpack_require__(5);\nvar $ = __webpack_require__(1);\nvar TimeBrush_1 = __webpack_require__(3);\n;\n/**\n * Thin wrapper around TimeBrush\n */\nvar TimeBrush = (function (_super) {\n    __extends(TimeBrush, _super);\n    function TimeBrush() {\n        _super.apply(this, arguments);\n        this.props = {};\n    }\n    TimeBrush.prototype.componentDidMount = function () {\n        var _this = this;\n        this.node = ReactDOM.findDOMNode(this);\n        this.timeBrush = new TimeBrush_1.TimeBrush($(this.node), { width: this.props.width, height: this.props.height });\n        +this.timeBrush.events.on(\"rangeSelected\", function (range) {\n            if (_this.props) {\n                _this.props.onSelectedRangeChanged(range);\n            }\n        });\n        this.renderContent();\n    };\n    TimeBrush.prototype.componentWillReceiveProps = function (newProps) {\n        this.renderContent(newProps);\n    };\n    /**\n     * Renders this component\n     */\n    TimeBrush.prototype.render = function () {\n        return React.createElement(\"div\", {style: { width: \"100%\", height: \"100%\" }});\n    };\n    TimeBrush.prototype.renderContent = function (props) {\n        // if called from `componentWillReceiveProps`, then we use the new\n        // props, otherwise use what we already have.\n        props = props || this.props;\n        this.timeBrush.data = props.data || [];\n        this.timeBrush.selectedRange = props.selectedRange || null;\n    };\n    return TimeBrush;\n}(React.Component));\nexports.TimeBrush = TimeBrush;\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./visuals/timebrush/TimeBrushReact.tsx\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./visuals/timebrush/TimeBrushReact.tsx?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_1__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"jQuery\"\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22jQuery%22?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n/**\n * A mixin that adds support for event emitting\n */\nvar EventEmitter = (function () {\n    function EventEmitter() {\n        this.listeners = {};\n    }\n    /**\n     * Adds an event listener for the given event\n     */\n    EventEmitter.prototype.on = function (name, handler) {\n        var _this = this;\n        var listeners = this.listeners[name] = this.listeners[name] || [];\n        listeners.push(handler);\n        return {\n            destroy: function () {\n                _this.off(name, handler);\n            }\n        };\n    };\n    /**\n     * Removes an event listener for the given event\n     */\n    EventEmitter.prototype.off = function (name, handler) {\n        var listeners = this.listeners[name];\n        if (listeners) {\n            var idx = listeners.indexOf(handler);\n            if (idx >= 0) {\n                listeners.splice(idx, 1);\n            }\n        }\n    };\n    /**\n     * Raises the given event\n     */\n    /*protected*/ EventEmitter.prototype.raiseEvent = function (name) {\n        var _this = this;\n        var args = [];\n        for (var _i = 1; _i < arguments.length; _i++) {\n            args[_i - 1] = arguments[_i];\n        }\n        var listeners = this.listeners[name];\n        if (listeners) {\n            listeners.forEach(function (l) {\n                l.apply(_this, args);\n            });\n        }\n    };\n    return EventEmitter;\n}());\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = EventEmitter;\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./base/EventEmitter.ts\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./base/EventEmitter.ts?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\nvar EventEmitter_1 = __webpack_require__(2);\nvar $ = __webpack_require__(1);\nvar _ = __webpack_require__(6);\nvar d3 = __webpack_require__(7);\nvar DEBOUNCE_TIME = 1000;\nvar TICK_WIDTH = 100;\n/**\n* Represents a timebrush\n*/\n/* @Mixin(EventEmitter)*/\nvar TimeBrush = (function () {\n    /**\n     * Constructor for the timebrush\n     */\n    function TimeBrush(element, dimensions) {\n        this._dimensions = { width: 500, height: 500 };\n        this._eventEmitter = new EventEmitter_1.default();\n        this.element = element;\n        this.x = d3.time.scale();\n        this.y = d3.scale.linear();\n        this.buildTimeScale();\n        if (!this.dimensions) {\n            this.resizeElements();\n        }\n        else {\n            this.dimensions = dimensions;\n        }\n    }\n    Object.defineProperty(TimeBrush.prototype, \"data\", {\n        /**\n         * Returns the data contained in this timebrush\n         */\n        get: function () {\n            return this._data;\n        },\n        /**\n         * Setter for the data\n         */\n        set: function (data) {\n            this._data = data || [];\n            this.x.domain(d3.extent(this._data.map(function (d) { return d.date; })));\n            this.y.domain([0, d3.max(this._data.map(function (d) { return +d.value; }))]);\n            this.resizeElements();\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(TimeBrush.prototype, \"events\", {\n        /**\n         * Gets an event emitter by which events can be listened to\n         * Note: Would be nice if we could mixin EventEmitter\n         */\n        get: function () {\n            return this._eventEmitter;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(TimeBrush.prototype, \"dimensions\", {\n        /**\n         * Gets the dimensions of this timebrush\n         */\n        get: function () {\n            return this._dimensions;\n        },\n        /**\n         * Sets the dimensions of this timebrush\n         */\n        set: function (value) {\n            $.extend(this._dimensions, value);\n            this.resizeElements();\n            if (this._range) {\n                this.brush.extent(this._range);\n                this.brush(d3.select(this.element.find(\".brush\")[0]));\n            }\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(TimeBrush.prototype, \"selectedRange\", {\n        /**\n         * Sets the currently selected range of dates\n         */\n        set: function (range) {\n            function selectedRangeChanged() {\n                var _this = this;\n                // One is set, other is unset\n                if ((!range || !this._range) && (range || this._range)) {\n                    return true;\n                }\n                if (range && this._range) {\n                    // Length of Array Changed\n                    if (range.length !== this._range.length) {\n                        return true;\n                    }\n                    else {\n                        // Check each date\n                        return range.some(function (v, i) {\n                            return v.getTime() !== _this._range[i].getTime();\n                        });\n                    }\n                }\n                return false;\n            }\n            function redrawRange() {\n                this.brush.extent(range);\n                this.brush(d3.select(this.element.find(\".brush\")[0]));\n            }\n            if (selectedRangeChanged.bind(this)()) {\n                this._range = range;\n                if (range && range.length) {\n                    redrawRange.bind(this)();\n                }\n            }\n        },\n        enumerable: true,\n        configurable: true\n    });\n    /**\n     * Builds the initial timescale\n     */\n    TimeBrush.prototype.buildTimeScale = function () {\n        var _this = this;\n        this.svg = d3.select(this.element[0]).append(\"svg\");\n        this.clip = this.svg.append(\"defs\").append(\"clipPath\")\n            .attr(\"id\", \"clip\")\n            .append(\"rect\");\n        this.context = this.svg.append(\"g\")\n            .attr(\"class\", \"context\");\n        this.bars = this.context.append(\"g\")\n            .attr(\"class\", \"bars\");\n        this.xAxis = this.context.append(\"g\")\n            .attr(\"class\", \"x axis\");\n        var brushed = _.debounce(function () {\n            var dateRange = _this.brush.empty() ? [] : _this.brush.extent();\n            var items = [];\n            if (dateRange && dateRange.length) {\n                var lowerItem_1;\n                var upperItem_1;\n                _this.data.forEach(function (item) {\n                    if (!lowerItem_1) {\n                        lowerItem_1 = item;\n                    }\n                    if (!upperItem_1) {\n                        upperItem_1 = item;\n                    }\n                    if (Math.abs(dateRange[0].getTime() - item.date.getTime()) <\n                        Math.abs(dateRange[0].getTime() - lowerItem_1.date.getTime())) {\n                        lowerItem_1 = item;\n                    }\n                    if (Math.abs(dateRange[1].getTime() - item.date.getTime()) <\n                        Math.abs(dateRange[1].getTime() - upperItem_1.date.getTime())) {\n                        upperItem_1 = item;\n                    }\n                });\n                items = [lowerItem_1, upperItem_1];\n            }\n            _this.events.raiseEvent(\"rangeSelected\", dateRange, items);\n        }, DEBOUNCE_TIME);\n        this.brush = d3.svg.brush().on(\"brush\", brushed);\n    };\n    /**\n     * Resizes all the elements in the graph\n     */\n    TimeBrush.prototype.resizeElements = function () {\n        var _this = this;\n        var margin = { top: 0, right: 10, bottom: 20, left: 10 }, width = this._dimensions.width - margin.left - margin.right, height = this._dimensions.height - margin.top - margin.bottom;\n        this.x.range([0, width]);\n        this.y.range([height, 0]);\n        if (this.bars && this._data) {\n            var tmp = this.bars\n                .selectAll(\"rect\")\n                .data(this._data);\n            tmp\n                .enter().append(\"rect\");\n            tmp\n                .attr(\"transform\", function (d, i) {\n                var rectHeight = _this.y(0) - _this.y(d.value);\n                var x = _this.x(d.date) || 0;\n                return \"translate(\" + x + \",\" + (height - rectHeight) + \")\";\n            })\n                .attr(\"width\", 2)\n                .attr(\"height\", function (d) { return Math.max(0, _this.y(0) - _this.y(d.value)); });\n            tmp.exit().remove();\n        }\n        this.svg\n            .attr(\"width\", width + margin.left + margin.right)\n            .attr(\"height\", height + margin.top + margin.bottom);\n        this.clip\n            .attr(\"width\", width)\n            .attr(\"height\", height);\n        this.xAxis\n            .attr(\"transform\", \"translate(0,\" + height + \")\")\n            .call(d3.svg.axis().scale(this.x).orient(\"bottom\").ticks(this.dimensions.width / TICK_WIDTH));\n        this.context\n            .attr(\"transform\", \"translate(\" + margin.left + \",\" + margin.top + \")\");\n        this.brush.x(this.x);\n        // Need to recreate the brush element for some reason\n        d3.selectAll(this.element.find(\".x.brush\").toArray()).remove();\n        this.brushEle = this.context.append(\"g\")\n            .attr(\"class\", \"x brush\")\n            .call(this.brush)\n            .selectAll(\"rect\")\n            .attr(\"height\", height + 7)\n            .attr(\"y\", -6);\n        this.brushGrip = d3.select(this.element.find(\".x.brush\")[0])\n            .selectAll(\".resize\").append(\"rect\")\n            .attr('x', -3)\n            .attr('rx', 2)\n            .attr('ry', 2)\n            .attr(\"y\", (height / 2) - 15)\n            .attr(\"width\", 6)\n            .attr(\"fill\", \"lightgray\")\n            .attr(\"height\", 30);\n    };\n    return TimeBrush;\n}());\nexports.TimeBrush = TimeBrush;\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./visuals/timebrush/TimeBrush.ts\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./visuals/timebrush/TimeBrush.ts?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_4__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"React\"\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22React%22?");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_5__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"ReactDOM\"\n ** module id = 5\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_6__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"_\"\n ** module id = 6\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22_%22?");

/***/ },
/* 7 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_7__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"d3\"\n ** module id = 7\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22d3%22?");

/***/ }
/******/ ])
});
;