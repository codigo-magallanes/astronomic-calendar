// This calendar is created with some options of the New Secular Calendar,
// Therefore is not an actual reliable calendar...
// Need to fix
calendar = new NSCalendar(
  2018,
  2019,
  astronomicData
);

console.log('setfullmoon: ', calendar.fullMoon = false)
calendar.includeSunPhase = "MaxLatSouth";

calendar.printScreen(1, 12, "2019, 4, 5");

// New Secular Calendar Options
// Array of day names
const weekDaysARRAY = [
  "venus",
  "marte",
  "júpiter",
  "sol",
  "luna"
];

// Length of week
//const daysInWeek = weekDaysARRAY.length;

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

setTimeout(testDateChange, 5000);

function testDateChange() {
  console.log('fullmoon: ', calendar.fullMoon = true)
  calendar.yearZero = 2020;
  calendar.weekDays = weekDaysARRAY
  calendar.monthNames = monthsARRAY
  calendar.printScreen(0, 1, [2020, 1, 8]);
}