import { TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { TollCalculatorComponent } from './toll-calculator/toll-calculator.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TollCalculatorComponent],
    }).compileComponents();
  });

  it('Should cost 9 SEK between 18.00 and 18.30 for car', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;
    expect(app.calculateTollFee(['2022-02-02 18:00:00'], 'Car')).toBe(9);
  });

  it('Should cost 22 SEK between 15.30 and 16.59 for car', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;
    expect(app.calculateTollFee(['2022-09-08 15:49:48'], 'Car')).toBe(22);
  });

  it('Should cost 0 SEK for Diplomat during toll-hour', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;
    expect(app.calculateTollFee(['2022-03-15 16:44:45'], 'Diplomat')).toBe(0);
  });

  it('Should cost 0 SEK for Motorbike during toll-hour', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;
    expect(app.calculateTollFee(['2022-04-12 14:15:00'], 'Motorbike')).toBe(0);
  });

  it('Should cost 0 for AscensionDay', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;
    expect(app.calculateTollFee(['2022-05-26 14:10:08'], 'Car')).toBe(0);
  });

  it('Should cost 0 for weekend', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;
    expect(app.calculateTollFee(['2022-04-09 18:00:00'], 'Car')).toBe(0);
  });

  it('Should cost 47 SEK for multiple passage on a weekday', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;

    let listOfPassagesToCheck = [
      '2022-04-14 09:11:48', // 9
      '2022-04-14 15:12:12', // 16
      '2022-04-14 16:09:08', // 22
    ];
    expect(app.calculateTollFee(listOfPassagesToCheck, 'Car')).toBe(47);
  });

  it('Should cost 0 SEK for multiple passage on MidsummerEve', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;

    let listOfPassagesToCheck = [
      '2022-06-24 07:11:48', // 9
      '2022-06-24 12:12:12', // 16
      '2022-06-24 18:09:08', // 22
    ];
    expect(app.calculateTollFee(listOfPassagesToCheck, 'Car')).toBe(0);
  });

  it('Should cost 60 SEK for maximum day fee', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;

    let listOfPassagesToCheck = [
      '2022-04-11 08:00:00', // 16
      '2022-04-11 09:00:00', // 9
      '2022-04-11 11:00:00', // 9
      '2022-04-11 13:30:00', // 9
      '2022-04-11 14:00:00', // 9
      '2022-04-11 15:55:00', // 22
    ];
    expect(app.calculateTollFee(listOfPassagesToCheck, 'Car')).toBe(60);
  });

  it('Should cost 0 for multiple passages with emergency vehicle on a weekday', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;

    let listOfDatesToCheck = [
      '2022-06-22 09:35:14', // 9
      '2022-06-22 13:14:11', // 9
      '2022-06-22 15:00:55', // 16
    ];
    expect(app.calculateTollFee(listOfDatesToCheck, 'Emergency')).toBe(0);
  });
});
