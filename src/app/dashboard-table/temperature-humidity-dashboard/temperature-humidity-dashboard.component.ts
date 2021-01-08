import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { type } from 'os';
import { HistoryTemperatureHumidityDto } from 'src/app/models/HistoryTemperatureHumidityDto';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-temperature-humidity-dashboard',
  templateUrl: './temperature-humidity-dashboard.component.html',
  styleUrls: ['./temperature-humidity-dashboard.component.css']
})
export class TemperatureHumidityDashboardComponent implements OnInit, AfterViewInit {

  temperatureValue: number = 0.0;
  humidityValue: number = 0.0;
  temperatureValueList: number[] = [];
  humidityValueList: number[] = [];
  dateValue: string = "";
  dateValueList : string[] = [];

  public chartType: string = 'line';

  // public chartDatasets: Array<any> = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  // ];
  public chartDatasets: Array<any> = [
    { data: this.humidityValueList, label: 'humidity' },
    { data: this.temperatureValueList, label: 'temperature' }
  ];

  // public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public chartLabels: Array<any> = this.dateValueList;


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



  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any = [];
  previous: any = [];
  headElements = ['Place','Time', 'Temperature', 'Humidity'];
  temperatureHumidityTable : any = [];
  constructor(private tableData: APIService,private cdRef: ChangeDetectorRef) {
    this.tableData.getTemperatureHumidityDataByDateRange().subscribe(data=>{

      this.temperatureHumidityTable = data;

      let temperatureHumidityDate = this.temperatureHumidityTable as Array<HistoryTemperatureHumidityDto>;
      temperatureHumidityDate.forEach(x =>
        {
          console.log(x.temperature)
          this.temperatureValueList.push(x.temperature);
          this.humidityValueList.push(x.humidity);
          var myDate = new Date(x.date);
          this.dateValueList.push(myDate.toUTCString());
        }
        );
      console.log(this.humidityValueList);
      console.log(this.temperatureValueList);
      console.log(this.dateValueList);
    })
   }

  ngOnInit() {
    this.tableData.getTemperatureHumidityDataByDateRange().subscribe(data=>{

      this.temperatureHumidityTable = data;
      this.mdbTable.setDataSource(this.temperatureHumidityTable);
    })

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
