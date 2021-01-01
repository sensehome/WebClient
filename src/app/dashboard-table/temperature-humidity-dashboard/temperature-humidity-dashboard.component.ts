import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-temperature-humidity-dashboard',
  templateUrl: './temperature-humidity-dashboard.component.html',
  styleUrls: ['./temperature-humidity-dashboard.component.css']
})
export class TemperatureHumidityDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any = [];
  previous: any = [];
  headElements = ['Time', 'Temperature', 'Humidity'];
  temperatureHumidityTable : any = [];
  constructor(private tableData: APIService,private cdRef: ChangeDetectorRef) {

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
