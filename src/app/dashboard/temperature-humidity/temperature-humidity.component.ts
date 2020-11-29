import { Component, OnInit } from '@angular/core';
// For MDB Angular Free
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';

@Component({
  selector: 'app-temperature-humidity',
  templateUrl: './temperature-humidity.component.html',
  styleUrls: ['./temperature-humidity.component.css']
})
export class TemperatureHumidityComponent implements OnInit {
  public chartType: string = 'line';
  scaleLength = 3;
  public chartDatasets: Array<any> = [
    { data: [22,21,23,22,21,22,22,21,23,22], label: 'Temperature' },
    { data: [56,55,53,52,51,52,50,51,52,53], label: 'Humidity' }
  ];

  public chartLabels: Array<any> = ['20.30', '20.40', '20.50', '21.00', '21.10', '21.20', '21.30'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  constructor() { }

  ngOnInit(): void {
  }

}
