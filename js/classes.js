/**
 * AMonth() Class
 * It is initialized with the whole year data
 * Then we can call any month of the year to be printed
 */

class AMonth {
    constructor(firstDayOfMonth, firstGregDate, monthName, days, weekDays, astroData) {
        this._firstDayOfMonth = firstDayOfMonth;
        this._firstGregDate = firstGregDate;
        this._monthName = monthName;
        this._days = days;
        this._weekDays = weekDays;
        this._astroData = astroData;
    }
    moon() {
        return this._astroData['moon']
    }
    sun() {
        return this._astroData['sun']
    }
    /**
     * returns a months data
     * @param [0-12] n 
     */
    getMonth(n) {
        return {
            name: this._monthName,
            days: this._days,
            weeks: [
                [1, [0, 0, 1, 2, 3]],
                [2, [4, 5, 6, 7, 8]],
                [3, [9, 10, 11, 12, 13]],
                [4, [14, 15, 16, 17, 18]],
                [5, [19, 20, 21, 22, 23]],
                [6, [24, 25, 26, 27, 28]],
                [7, [29, 30]]
            ],
            moon: this.moon(),
            sun: this.sun()
        }
    }
}

export { AMonth }