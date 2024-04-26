export class IntervalManager {

    constructor() {
        this.intervals = {};
    }

    addInterval = function (key, intervalID) {
        this.intervals[key] = intervalID;
    }

    removeInterval = function (key) {
        clearInterval(this.intervals[key]);
    }

    fetchIntervalID = function(key) {
        return this.intervals[key];
    }

    fetchIntervals = function() {
        return this.intervals
    }

    fetchIntervalKeys = function() {
        return Object.keys(this.intervals);
    }

    fetchIntervalIDs = function() {
        return Object.values(this.intervals);
    }
}