import EventEmitter from '../base/EventEmitter';
const $ = require("jquery");
import * as _ from "lodash";
import * as d3 from "d3";

const DEBOUNCE_TIME = 1000;
const TICK_WIDTH = 100;

/**
* Represents a timebrush
*/
/* @Mixin(EventEmitter)*/
export class TimeBrush {
    private element: JQuery;
    private svg: d3.Selection<any>;
    private x: d3.time.Scale<Date, any>;
    private y: d3.scale.Linear<any, any>;
    private timeBrushPath: d3.Selection<any>;
    private area: d3.svg.Area<any>;
    private brush: d3.svg.Brush<Date>;
    private clip: d3.Selection<any>;
    private brushGrip: d3.Selection<any>;
    private context: d3.Selection<any>;
    private brushEle: d3.Selection<any>;
    private xAxis: d3.Selection<any>;
    private _dimensions: { width: number; height: number; } = { width: 500, height: 500 };
    private _eventEmitter = new EventEmitter();
    private _data: TimeBrushDataItem[];
    private _range: [Date, Date];

    /**
     * Constructor for the timebrush
     */
    constructor(element: JQuery, dimensions?: any) {
        this.element = element;
        this.element.hide();
        this.x = d3.time.scale<Date>();
        this.y = d3.scale.linear();
        this.buildTimeScale();
        if (!this.dimensions) {
            this.resizeElements();
        } else {
            this.dimensions = dimensions;
        }
    }

    /**
     * Returns the data contained in this timebrush
     */
    public get data() {
        return this._data;
    }

    /**
     * Setter for the data
     */
    public set data(data: TimeBrushDataItem[]) {
        this._data = data || [];
        this.selectedRange = undefined;
        
        // Hide/show based on the data
        this.element.toggle(this._data.length > 0);
        
        this.x.domain(d3.extent(this._data.map((d) => d.date)));
        this.y.domain([0, d3.max(this._data.map((d) => +d.value))]);
        this.resizeElements();
    }

    /**
     * Gets an event emitter by which events can be listened to
     * Note: Would be nice if we could mixin EventEmitter
     */
    public get events() {
        return this._eventEmitter;
    }

    /**
     * Gets the dimensions of this timebrush
     */
    public get dimensions() {
        return this._dimensions;
    }

    /**
     * Sets the dimensions of this timebrush
     */
    public set dimensions(value: any) {
        $.extend(this._dimensions, value);
        this.dimensions.height = Math.max(50, this.dimensions.height);
        this.dimensions.width = Math.max(50, this.dimensions.width);
        this.resizeElements();
        if (this._range) {
            this.brush.extent(<any>this._range);
            this.brush(d3.select(this.element.find(".brush")[0]));
        }
    }

    /**
     * Sets the currently selected range of dates
     */
    public set selectedRange(range: [Date, Date]) {
        function selectedRangeChanged(): boolean {
            // One is set, other is unset
            if ((!range || !this._range) && (range || this._range)) {
                return true;
            }

            if (range && this._range) {
                // Length of Array Changed
                if (range.length !== this._range.length) {
                    return true;
                } else {
                    // Check each date
                    return range.some((v, i) => {
                        return v.getTime() !== this._range[i].getTime();
                    });
                }
            }
            return false;
        }

        function redrawRange() {
            if (range && range.length === 2) {
                this.brush.extent(<any>range);
            } else {
                this.brush.clear();
            }
            this.brush(d3.select(this.element.find(".brush")[0]));
        }

        if (selectedRangeChanged.bind(this)()) {
            this._range = range;
            redrawRange.bind(this)();
        }
    }

    private bars: d3.Selection<any>;

    /**
     * Builds the initial timescale
     */
    private buildTimeScale() {
        this.svg = d3.select(this.element[0]).append("svg");

        this.clip = this.svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect");

        this.context = this.svg.append("g")
            .attr("class", "context");

        this.bars = this.context.append("g")
            .attr("class", "bars");

        this.xAxis = this.context.append("g")
            .attr("class", "x axis");

        var brushed = _.debounce(() => {
            const dateRange = this.brush.empty() ? [] : this.brush.extent();
            let items = [];
            if (dateRange && dateRange.length) {
                let lowerItem : TimeBrushDataItem;
                let upperItem : TimeBrushDataItem;
                this.data.forEach(item => {
                    if (!lowerItem) {
                        lowerItem = item;
                    }
                    if (!upperItem) {
                        upperItem = item;
                    }
                    
                    if (Math.abs(dateRange[0].getTime() - item.date.getTime()) <
                        Math.abs(dateRange[0].getTime() - lowerItem.date.getTime())) {
                        lowerItem = item;
                    }
                    
                    if (Math.abs(dateRange[1].getTime() - item.date.getTime()) <
                        Math.abs(dateRange[1].getTime() - upperItem.date.getTime())) {
                        upperItem = item;
                    }
                });
                items = [lowerItem, upperItem];
            }
            this._range = <any>dateRange;
            this.events.raiseEvent("rangeSelected", dateRange, items);
        }, DEBOUNCE_TIME);

        this.brush = d3.svg.brush().on("brush", brushed);
    }

    /**
     * Resizes all the elements in the graph
     */
    private resizeElements() {
        var margin = { top: 0, right: 10, bottom: 20, left: 10 },
            width = this._dimensions.width - margin.left - margin.right,
            height = this._dimensions.height - margin.top - margin.bottom;

        this.x.range([0, <any>width])
        this.y.range([height, 0]);

        if (this.bars && this._data) {
            var tmp = this.bars
                .selectAll("rect")
                .data(this._data);
            tmp
                .enter().append("rect");

            tmp
                .attr("transform", (d, i) => {
                    var rectHeight = this.y(0) - this.y(d.value);
                    let x = this.x(d.date) || 0;
                    return `translate(${x},${height - rectHeight})`;
                })
                .attr("width", 2)
                .attr("height", (d) => Math.max(0, this.y(0) - this.y(d.value)));

            tmp.exit().remove();
        }

        this.svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        this.clip
            .attr("width", width)
            .attr("height", height);

        this.xAxis
            .attr("transform", "translate(0," + height + ")")
            .call(d3.svg.axis().scale(this.x).orient("bottom").ticks(this.dimensions.width / TICK_WIDTH));

        this.context
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.brush.x(<any>this.x);

        // Need to recreate the brush element for some reason
        d3.selectAll(this.element.find(".x.brush").toArray()).remove();
        this.brushEle = this.context.append("g")
            .attr("class", "x brush")
            .call(this.brush)
            .selectAll("rect")
            .attr("height", height + 7)
            .attr("y", -6);

        this.brushGrip = d3.select(this.element.find(".x.brush")[0])
            .selectAll(".resize").append("rect")
            .attr('x', -3)
            .attr('rx', 2)
            .attr('ry', 2)
            .attr("y", (height / 2) - 15)
            .attr("width", 6)
            .attr("fill", "lightgray")
            .attr("height", 30);
    }
}

/**
 * Represents a data item on a timescale
 */
export interface TimeBrushDataItem {
    /**
     * The date of the time scale item
     */
    date: Date;

    /**
     * The value on the given date
     */
    value: number;
}