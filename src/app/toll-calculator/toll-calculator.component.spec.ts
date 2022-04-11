import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TollCalculatorComponent } from './toll-calculator.component';

describe('TollCalculatorComponent', () => {
  let component: TollCalculatorComponent;
  let fixture: ComponentFixture<TollCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TollCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TollCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
