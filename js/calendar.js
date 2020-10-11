import { AMonth } from './classes.js';

let moon = new Array(30)
 moon[1] = "Full Moon"
 moon[8] = "Last Quarter"
 moon[15] = "New Moon"
 moon[22] = "Crescent Moon"

let sun = new Array(30)
 sun[8] = "Nortern Solstice"

let astroData = {
    moon,
    sun
}

const newMonth = new AMonth(2, new Date(2001, 3, 23), 'Piscis', 30, 5, astroData)

const Piscis = newMonth.getMonth(3)

console.log(Piscis)

