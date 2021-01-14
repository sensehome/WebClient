import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MdbTableDirective,
  MdbTablePaginationComponent,
} from 'angular-bootstrap-md';
import { HistoryTemperatureHumidityDto } from 'src/app/models/HistoryTemperatureHumidityDto';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-temperature-humidity-dashboard',
  templateUrl: './temperature-humidity-dashboard.component.html',
  styleUrls: ['./temperature-humidity-dashboard.component.css'],
})
export class TemperatureHumidityDashboardComponent
  implements OnInit, AfterViewInit {
  temperatureValue: number = 0.0;
  humidityValue: number = 0.0;
  temperatureValueList: number[] = [];
  humidityValueList: number[] = [];
  dateValue: string = '';
  dateValueList: string[] = [];

  public chartType: string = 'line';

  public chartTemperatureDatasets: Array<any> = [
    { data: this.temperatureValueList, label: 'temperature' },
  ];

  public chartHumidityDatasets: Array<any> = [
    { data: this.humidityValueList, label: 'humidity' },
  ];

  public chartLabels: Array<any> = this.dateValueList;

  public chartTemperatureColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      // borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 0,
      capBezierPoints: false,
      stepped: true,
    },
  ];

  public chartHumidityColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      // borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 1,
    },
  ];
  public chartOptions: any = {
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: false, //this will remove only the label
          },
        },
      ],
    },
    responsive: true,
  };
  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}

  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any = [];
  previous: any = [];

  headElements = ['Place', 'Time', 'Temperature', 'Humidity'];
  temperatureHumidityTable: any = [];
  constructor(
    private apiService: APIService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.apiService
      .getTemperatureHumidityDataByDateRange()
      .subscribe((data) => {
        this.temperatureHumidityTable = data;
        this.mdbTable.setDataSource(this.temperatureHumidityTable);
      });
    this.apiService
      .getTemperatureHumidityDataByDateRange()
      .subscribe((data) => {
        this.temperatureHumidityTable = data;

        let temperatureHumidityDate = this
          .temperatureHumidityTable as Array<HistoryTemperatureHumidityDto>;
        temperatureHumidityDate.forEach((x) => {
          this.temperatureValue = x.temperature;
          this.temperatureValueList.push(this.temperatureValue);
          this.humidityValueList.push(x.humidity);
          var myDate = new Date(x.date);
          this.dateValueList.push(myDate.toUTCString());
        });
        this.chartTemperatureDatasets = [
          { data: this.temperatureValueList, label: 'temperature' },
        ];
        this.chartHumidityDatasets = [
          { data: this.humidityValueList, label: 'humidity' },
        ];
      });

    this.temperatureHumidityTable = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
}
