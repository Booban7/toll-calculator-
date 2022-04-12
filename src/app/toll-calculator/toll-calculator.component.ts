import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

const VEHICLES_HAS_FEE = new Map();
VEHICLES_HAS_FEE.set('Car', true);
VEHICLES_HAS_FEE.set('Motorbike', false);
VEHICLES_HAS_FEE.set('Tractor', false);
VEHICLES_HAS_FEE.set('BusOver14Ton', false);
VEHICLES_HAS_FEE.set('Emergency', false);
VEHICLES_HAS_FEE.set('Diplomat', false);
VEHICLES_HAS_FEE.set('Military', false);

//Holidays that occour on a weekday 2022
const HOLIDAYS = [
  { name: 'Epiphany', date: '2022-01-06' },
  { name: 'GoodFriday', date: '2022-04-15' },
  { name: 'EasterMonday', date: '2022-04-18' },
  { name: 'AscensionDay', date: '2022-05-26' },
  { name: 'NationalDay', date: '2022-06-06' },
  { name: 'MidsummerEve', date: '2022-06-24' },
  { name: 'DayAfterChristmas', date: '2022-12-26' },
];

@Component({
  selector: 'toll-calculator',
  templateUrl: './toll-calculator.component.html',
  styleUrls: ['./toll-calculator.component.css'],
})
export class TollCalculatorComponent implements OnInit {
  currentTime: string;
  currentCost: number;
  holidays = HOLIDAYS;

  constructor() {
    this.currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    this.currentCost = 0;
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      this.currentCost = this.calculateTollFee([this.currentTime], 'Car');
    }, 1000);
  }

  isHoliday(dateTime: string) {
    for (let holiday of this.holidays) {
      dateTime = moment(dateTime, 'YYYY-MM-DD').format('YYYY-MM-DD');

      if (dateTime === holiday.date) {
        return true;
      }
    }
    return false;
  }

  isWeekend(dateTime: string) {
    let checkWeekend = moment(dateTime, 'YYYY-MM-DD');
    if (checkWeekend.weekday() === 6 || checkWeekend.weekday() === 0) {
      return true;
    }

    return false;
  }

  calculateTollFee(dateTimes: string[], vehicle: string): number {
    if (!VEHICLES_HAS_FEE.get(vehicle)) {
      return 0;
    }

    let totalFee = 0;

    dateTimes.forEach((entryDate) => {
      if (this.isHoliday(entryDate)) return;
      if (this.isWeekend(entryDate)) return;

      totalFee = totalFee + this.getTollFeeForDate(entryDate);
    });

    if (totalFee >= 60) {
      return 60;
    }

    return totalFee;
  }

  getTollFeeForDate(currentTime: string): number {
    const TIME_FORMAT = 'HH:mm:ss';
    let fullCurrentDate = moment(currentTime, 'YYYY-MM-DD HH:mm:ss');
    let momentCurrentTime = moment({
      hour: fullCurrentDate.hours(),
      minutes: fullCurrentDate.minutes(),
      seconds: fullCurrentDate.seconds(),
    });

    let fee = 0;
    if (
      momentCurrentTime.isBetween(
        moment('06:00:00', TIME_FORMAT),
        moment('06:29:59', TIME_FORMAT),
        null,
        '[]'
      )
    ) {
      fee = 9;
    }
    if (
      momentCurrentTime.isBetween(
        moment('06:30:00', TIME_FORMAT),
        moment('06:59:59', TIME_FORMAT),
        null,
        '[]'
      )
    ) {
      fee = 16;
    }
    if (
      momentCurrentTime.isBetween(
        moment('07:00:00', TIME_FORMAT),
        moment('07:59:59', TIME_FORMAT),
        null,
        '[]'
      )
    ) {
      fee = 22;
    }
    if (
      momentCurrentTime.isBetween(
        moment('08:00:00', TIME_FORMAT),
        moment('08:29:59', TIME_FORMAT),
        null,
        '[]'
      )
    ) {
      fee = 16;
    }
    if (
      momentCurrentTime.isBetween(
        moment('08:30:00', TIME_FORMAT),
        moment('14:59:59', TIME_FORMAT),
        null,
        '[]'
      )
    ) {
      fee = 9;
    }
    if (
      momentCurrentTime.isBetween(
        moment('15:00:00', TIME_FORMAT),
        moment('15:29:59', TIME_FORMAT),
        null,
        '[]'
      )
    ) {
      fee = 16;
    }
    if (
      momentCurrentTime.isBetween(
        moment('15:30:00', TIME_FORMAT),
        moment('16:59:59', TIME_FORMAT),
        null,
        '[]'
      )
    ) {
      fee = 22;
    }
    if (
      momentCurrentTime.isBetween(
        moment('17:00:00', TIME_FORMAT),
        moment('17:59:59', TIME_FORMAT),
        null,
        '[]'
      )
    ) {
      fee = 16;
    }
    if (
      moment(momentCurrentTime).isBetween(
        moment('17:59:59', TIME_FORMAT),
        moment('18:29:59', TIME_FORMAT),
        null,
        '[]'
      )
    ) {
      fee = 9;
    }
    if (
      momentCurrentTime.isBetween(
        moment('18:30:00', TIME_FORMAT),
        moment('05:59:59', TIME_FORMAT),
        null,
        '[]'
      )
    ) {
      fee = 0;
    }
    return fee;
  }
}
