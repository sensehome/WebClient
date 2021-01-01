import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureHumidityDashboardComponent } from './temperature-humidity-dashboard.component';

describe('TemperatureHumidityDashboardComponent', () => {
  let component: TemperatureHumidityDashboardComponent;
  let fixture: ComponentFixture<TemperatureHumidityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureHumidityDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureHumidityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
