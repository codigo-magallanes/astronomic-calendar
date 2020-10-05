/**
 * ASTRONOMIC CALENDAR NEW OPTIONS
 */

// Array of day names
const weekDaysARRAY = ["venus", "marte", "júpiter", "sol", "luna"];

// Array of month names
const monthsARRAY = [
  "capricornio",
  "acuario",
  "piscis",
  "aries",
  "tauro",
  "géminis",
  "cáncer",
  "leo",
  "virgo",
  "libra",
  "escorpio",
  "sagitario",
  "andrómeda",
];

/**
 * CALENDARS
 */

calendar = new NSCalendar(2018, 2019, astronomicData);

console.log("setfullmoon: ", (calendar.fullMoon = true));

calendar.includeSunPhase = "MaxLatSouth";

calendar.printMonth(1, 12, "2019, 4, 5");

calendar.weekDays = weekDaysARRAY;
calendar.monthNames = monthsARRAY;

calendar.printCalendar(4, 3, [2020, 2, 18], 3);