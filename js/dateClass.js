class NSCalendar {
  constructor(yearZero, gregYear, data) {
    this._yearZero = yearZero;
    this._year = gregYear - yearZero;
    this._gregYear = gregYear;
    //this._weekDays = weekDays
    //this._months = months;
    this._data = data;
    this._sunData = [];
  }

  _weekDays = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];
  set weekDays(arr) {
    this._weekDays = arr;
    console.log("weekDays = ", arr);
  }
  _months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre"
  ]
  set monthNames(arr) {
      this._months = arr
      console.log('months = ', arr)
  }
  /**
   * @param {String} sunPhase
   */
  set includeSunPhase(sunPhase) {
    let arr = [];
    console.log(this._data);
    this._data["sun"].forEach((s) => {
      if (s.phase == sunPhase) {
        arr.push(this.toLocalDate(s.date)[0]);
      }
    });
    console.log({ arr });
    this._sunData = arr;
  }
  set yearZero(y) {
    this._yearZero = y;
  }
  get astroData() {
    return this._data;
  }
  /** CONFIGURATION */
  // locale
  conf_locale = "es-ES";

  // Moon cicle
  conf_moonCicle = false;

  // Leap year
  conf_leapYears = true;
  get leapYears() {
    return this.conf_leapYears;
  }
  set leapYears(x) {
    this.conf_leapYears = x;
    console.log("leapYears = ", x);
  }

  // Show full moon
  showFullMoon = true;
  get fullMoon() {
    return this.showFullMoon;
  }
  set fullMoon(x) {
    this.showFullMoon = x;
    console.log("showFullMoon = ", x);
  }

  // Show new Moon
  showNewMoon = true;
  get newMoon() {
    return this.showNewMoon;
  }
  set newMoon(x) {
    this.showNewMoon = x;
  }

  /** INTERNAL FUNCTIONS */
  // DATES
  // Working OK in printMonthDays() and printWeek()
  /*
    addDays(x,n) {
        console.log(x)
        let d = new Date(x.getTime())
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
    }
    */
  // not tested
  toLocalDate(d) {
    let day = new Date(d);
    let temp = `${day.toLocaleString(this.conf_locale)}`;
    console.log({ temp });
    return temp.split(" ");
  }
  // not tested
  /*
    nextDay(day) {
        console.log({day})
        let d = new Date(day)
        console.log({d})
        let date = new Date(next);
        return this.toLocalDate(date)[0]
    }
*/
  addDays(date, days) {
    var result = new Date(date);
    console.log({ result });
    result.setDate(result.getDate() + days);
    return result;
  }

  // SUN
  // MOON
  fullMoonDates(data) {
    let arr = [];
    data.forEach((l) => {
      if (l.phase == "luna llena") {
        arr.push(l.date.NSC.toLocaleDateString());
      }
    });
    return arr;
  }
  newMoonDates(data) {
    let arr = [];
    data.forEach((l) => {
      if (l.phase == "luna nueva") {
        arr.push(l.date.NSC.toLocaleDateString());
      }
    });
    return arr;
  }
  moonPhaseDates(data, mPhase) {
    let arr = [];
    data.forEach((l) => {
      if (l.phase == mPhase) {
        arr.push(l.date.NSC.toLocaleDateString());
      }
    });
    return arr;
  }
  /** GETTERS */
  get numWeekDays() {
    return this._weekDays.length;
  }
  get weekDays() {
    return this._weekDays;
  }

  /** CALENDAR */
  get monthsDays() {
    const monthDays = this._months.map((x, i) => {
      return i % 2 === 0 ? 30 : 29;
    });
    if (this.conf_leapYears && this._year % 2 == 0) monthDays[3] = 30;
    if (this.conf_moonCicle && this._year % 33 === 0) monthDays[1] = 30;
    return monthDays;
  }
  // m = NSC month index
  // date = firts day of de month in gregorian time
  // in original formula is also: moon = moon data
  printMonthDays(firstDayOfMonth, m, date) {
    let html = "";
    let days = this.monthsDays[m];
    let numberOfWeeks = Math.ceil(
      (this.monthsDays[m] + firstDayOfMonth) / this.numWeekDays
    );
    let firstDayDate = date;
    let firstDayOfWeek = firstDayOfMonth;
    // let firstWeekDays = this.numWeekDays - firstDayOfMonth
    for (let r = 1; r <= numberOfWeeks; ++r) {
      html += `<div class="week week-${r}"><div class="week-number">${r}</div>`;
      html += this.printWeek(r, days, firstDayOfMonth, firstDayDate);
      html += `</div>`;
      firstDayDate = this.addDays(
        firstDayDate,
        this.numWeekDays - firstDayOfWeek
      );
      firstDayOfWeek = 0;
    }
    return html;
  }
  sunClass(d) {
    return this._sunData.includes(d) ? "new-year" : "void";
  }
  // w = week of the month
  // days = number of days in the week
  // firstDay = first day of the week
  // date = gregorian date of first day of the week.
  printWeek(w, days, firstDay, date) {
    let html = "",
      newDate;
    //newDate = this.toLocaleDateString(date)
    console.log({ firstDay, date, newDate });
    let d = w * this.numWeekDays - (this.numWeekDays + firstDay) + 1;
    for (let c = 1; c <= this.numWeekDays; ++c) {
      newDate = date.toLocaleDateString();
      if (firstDay >= c && w == 1) {
        html += `<div class="day"></div>`;
        d++;
      } else if (d <= days) {
        html += `<div class="day day-${c} ${this.sunClass(
          newDate
        )}" title="${newDate}">
                <span class="day-number">${d}</span>
                </div>`;
        //newDate = this.addDays(newDate, 1)
        date = this.addDays(date, 1);
        console.log("nextDay: ", date);
        d++;
      } else {
        html += `<div class="day"></div>`;
      }
    }
    return html;
  }
  printDayNames() {
    let dayNames = '<div class="day-names"><div class="week-number"></div>';
    for (let d = 0; d < this.numWeekDays; d++) {
      dayNames += `<div class="day day-${d + 1} day-name">${
        this._weekDays[d]
      }</div>`;
    }
    dayNames += "</div>";
    return dayNames;
  }
  printScreen(firstDay, month, date) {
    const elDayNames = document.querySelector("#day-names");
    elDayNames.innerHTML = this.printDayNames();
  
    const elMonthDays = document.querySelector("#month-days");
    elMonthDays.innerHTML = this.printMonthDays(firstDay, month - 1, new Date(date));
  }
}
