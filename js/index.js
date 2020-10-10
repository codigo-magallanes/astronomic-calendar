import AData from './AData.js'
import astroData from './astroData.js'
import { ACalendar } from './ACalendar.js';

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

const calendar = new ACalendar(2018, 2019, AData, astroData );

console.log("setfullmoon: ", (calendar.fullMoon = true));

let test = calendar.astroData
console.log({test})
calendar.includeSunPhase = "MaxLatSouth";
calendar.addSunData = 'equiNorth'
let arrSun = calendar.sunData
console.log({arrSun})
//calendar.printMonth(1, 12, "2019, 4, 5");

calendar.weekDays = weekDaysARRAY;
calendar.monthNames = monthsARRAY;

calendar.printCalendar(2, 3, [2020, 2, 18], 3);