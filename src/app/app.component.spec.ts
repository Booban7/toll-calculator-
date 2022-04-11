import { TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { TollCalculatorComponent } from './toll-calculator/toll-calculator.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TollCalculatorComponent],
    }).compileComponents();
  });

  it('Should cost 9 SEK between 18.00 and 18.30', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;
    expect(app.calculateTollFee(['2022-02-02 18:00:00'], 'Car')).toBe(9);
  });

  it('Should cost 0 SEK between 14.00 and 18.30', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;
    expect(app.calculateTollFee(['2022-02-02 18:00:00'], 'Diplomat')).toBe(0);
  });

  it('Should cost 0 for holiday', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;
    expect(app.calculateTollFee(['2022-05-26 18:00:00'], 'Car')).toBe(0);
  });

  it('Should cost 0 for weekend', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;
    expect(app.calculateTollFee(['2022-04-09 18:00:00'], 'Car')).toBe(0);
  });

  it('Should cost 9 SEK between 18.00 and 19.00', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;

    let listOfDatesToCheck = [
      '2022-02-02 18:00:00',
      '2022-02-02 19:00:00',
      '2022-02-01 13:00:00',
    ];
    expect(app.calculateTollFee(listOfDatesToCheck, 'Car')).toBe(18);
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

  it('Should cost 9 for multiple passages which include holidays and weekend day', () => {
    const fixture = TestBed.createComponent(TollCalculatorComponent);
    const app = fixture.componentInstance;

    let listOfDatesToCheck = [
      '2022-02-02 18:00:00',
      '2022-01-06 13:00:00',
      '2022-01-09 13:00:00',
    ];

    expect(app.calculateTollFee(listOfDatesToCheck, 'Car')).toBe(9);
  });


});
