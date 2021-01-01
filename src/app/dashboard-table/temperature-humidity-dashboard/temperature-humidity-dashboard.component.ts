import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-temperature-humidity-dashboard',
  templateUrl: './temperature-humidity-dashboard.component.html',
  styleUrls: ['./temperature-humidity-dashboard.component.css']
})
export class TemperatureHumidityDashboardComponent implements OnInit {

  temperatueHumidityTable : any = [];
  constructor(private tableData: APIService) {
    tableData.getTemperatureHumidityDataByDateRange().subscribe(data=>{

      this.temperatueHumidityTable = data;
      console.log(this.temperatueHumidityTable);
    })
   }

  ngOnInit() {
    // this.http.get<any>('http://10.20.20.2:5000/api/temperature-humidities').subscribe(data => {
    //     console.log(data);
    // });
    // console.log(this.temperatueHumidityTable);
  }
  elements: any = [
    {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},
    {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
    {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
  ];

  headElements = ['Time', 'Temperature', 'Humidity'];

}
