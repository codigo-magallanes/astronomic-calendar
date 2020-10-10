class ACalendar {
  constructor(yearZero, gregYear, data) {
    this._yearZero = yearZero;
    this._year = gregYear - yearZero;
    this._gregYear = gregYear;
    this._data = data;
    this._sunData = [];
  }
  /**
   * DEFAULT VALUES
   */
  _weekDays = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];
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
    "diciembre",
  ];
  /**
   * MODIFY DEFAULT VALUES
   * SETTERS & GETTERS
   */
  set weekDays(arr) {
    this._weekDays = arr;
    console.log("weekDays = ", arr);
  }
  /**
   * @param {string[]} arr
   */
  set monthNames(arr) {
    this._months = arr;
    console.log("months = ", arr);
  }
  /**
   * @param {String} sunPhase
   */
  set includeSunPhase(sunPhase) {
    let arr = [];
    this._data["sun"].forEach((s) => {
      if (s.phase == sunPhase) {
        console.log(s.date);
        //arr.push(this.toLocalDate(s.date));
        arr.push(new Date(s.date).toLocaleDateString());
      }
    });
    console.log("Sun Phases set: ", this._data, arr);
    this._sunData = arr;
  }
  // yearZero
  set yearZero(y) {
    this._yearZero = y;
  }
  get yearZero() {
    return this._yearZero;
  }
  // Astronomic Data
  get astroData() {
    return this._data;
  }
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
  /** CONFIGURATION */
  // locale
  conf_locale = "es-ES";
  set locale(x) {
    this.conf_locale = x;
    console.log("conf_locale: ", locale);
  }
  get locale() {
    return this.conf_locale;
  }
  // Moon cicle
  conf_moonCicle = false;
  /**
   * @param {boolean} x
   */
  set moonCicle(x) {
    this.conf_moonCicle = x;
    console.log("conf_moonCicle: ", this.moonCicle);
  }
  get conf_moonCicle() {
    return this.conf_moonCicle;
  }

  /** INTERNAL FUNCTIONS */
  // DATES
  toLocalDate(d) {
    let day = new Date(d);
    let localeDate = `${day.toLocaleString(this.conf_locale)}`;
    console.log({ localeDate });
    return localeDate.split(" ");
  }
  addDays(date, days) {
    var result = new Date(date);
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
  // date = first day of de month in gregorian time
  // in original formula is also: moon = moon data
  printMonthDays(firstDayOfMonth, m, date) {
    let html = "",
      printWeekResp,
      lastDayOfMonth;
    let days = this.monthsDays[m];
    let numberOfWeeks = Math.ceil(
      (this.monthsDays[m] + firstDayOfMonth) / this.numWeekDays
    );
    let firstDayDate = date;
    let firstDayOfWeek = firstDayOfMonth;
    for (let r = 1; r <= numberOfWeeks; ++r) {
      printWeekResp = this.printWeek(r, days, firstDayOfMonth, firstDayDate);
      html += `<div class="week week-${r}"><div class="week-number">${r}</div>`;
      html += printWeekResp.html;
      html += `</div>`;
      firstDayDate = this.addDays(
        firstDayDate,
        this.numWeekDays - firstDayOfWeek
      );
      firstDayOfWeek = 0;
      if (r == numberOfWeeks) {
        lastDayOfMonth = printWeekResp.lastDayOfWeek;
      }
    }
    return { html, lastDayOfMonth };
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
      newDate,
      lastDayOfWeek = 0;
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
        date = this.addDays(date, 1);
        d++;
      } else {
        if (lastDayOfWeek == 0) lastDayOfWeek = c - 1;
        html += `<div class="day"></div>`;
      }
    }
    //if (lastDayOfMonth == undefined) lastDayOfWeek = 0
    return { html, lastDayOfWeek };
  }
  printDayNames() {
    let dayNames = '<div class="day-names"><div class="week-number"></div>';
    for (let d = 0; d < this.numWeekDays; d++) {
      dayNames += `<div class="day-name day day-${d + 1}">${
        this._weekDays[d]
      }</div>`;
    }
    dayNames += "</div>";
    return dayNames;
  }
  printMonthName(m) {
    let monthName = this._months[m - 1].replace(/^\w/, (c) => c.toUpperCase());
    return monthName;
  }
  printMonth(firstDay, month, date) {
    const elMonthName = document.querySelector("#month-name");
    elMonthName.innerHTML = `<div class="month-name">${this.printMonthName(month)}</div>`;

    const elDayNames = document.querySelector("#day-names");
    elDayNames.innerHTML = this.printDayNames();

    const elMonthDays = document.querySelector("#month-days");
    elMonthDays.innerHTML = (this.printMonthDays(
      firstDay,
      month - 1,
      new Date(date)
    )).html
  }
  /**
   * printCalendar()
   * @param {Number} firstDay / Day of the week of first day of first month /
   * @param {Number} month / first month of astronomic calendar to print /
   * @param {Array} date / array of first day correspondant in Gregorian Calendar [year, month, day] /
   * @param {Number} n / number of months to print / 
   */
  printCalendar(firstDay, month, date, n) {
    let calendarString = "";
    let days, monthDays, firstDayOfMonth;
    let gregDate = new Date(date);

    const dayNames = this.printDayNames();

    for (let i = 0; i < n; i++) {
      days = this.monthsDays[month - 1 + i];
      firstDayOfMonth =
        firstDayOfMonth == undefined ? firstDay : monthDays.lastDayOfMonth;

      console.log({ firstDayOfMonth });

      monthDays = this.printMonthDays(firstDayOfMonth, month - 1 + i, gregDate);

      calendarString += `<div class="month-name">${this.printMonthName(month + i)}</div>`;
      calendarString += dayNames;
      calendarString += monthDays.html;

      console.log({ gregDate, days });
      gregDate = this.addDays(gregDate, days);
    }
    const elMonthName = document.querySelector("#calendar");
    elMonthName.innerHTML = calendarString;
  }
printCalendarYear(y) {
  let calendarString = "";
  let days, monthDays, firstDayOfMonth;
  let gregDate = new Date(date);

  const dayNames = this.printDayNames();

  for (let i = 0; i < n; i++) {
    days = this.monthsDays[month - 1 + i];
    firstDayOfMonth =
      firstDayOfMonth == undefined ? firstDay : monthDays.lastDayOfMonth;

    console.log({ firstDayOfMonth });

    monthDays = this.printMonthDays(firstDayOfMonth, month - 1 + i, gregDate);

    calendarString += `<div class="month-name">${this.printMonthName(month + i)}</div>`;
    calendarString += dayNames;
    calendarString += monthDays.html;

    console.log({ gregDate, days });
    gregDate = this.addDays(gregDate, days);
  }
  const elMonthName = document.querySelector("#calendar");
  elMonthName.innerHTML = calendarString;
}
}
export { ACalendar}