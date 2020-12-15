import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  looper: any
  temperatureValue : number = 0.0
  humidityValue : number = 0.0
  temperatureValueList : number[] = []
  humidityValueList : number[] = []

  ngOnInit(): void {
    this.looper = setInterval(() => {
      this.temperatureValue = Number.parseFloat((Math.random() * 20).toFixed(2))
      this.humidityValue = Number.parseFloat((Math.random() * 100).toFixed(2))
      this.temperatureValueList = [...this.temperatureValueList, this.temperatureValue]
      this.humidityValueList = [...this.humidityValueList, this.humidityValue]
    }, 2000)
  }

  ngOnDestroy() {
    if (this.looper) {
      clearInterval(this.looper);
    }
  }

}
