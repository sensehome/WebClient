import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  isCheckedMotion = false;
  isCheckedTempHum = false;
  showTempHum = "OFF";
  showMotion = "ON"
  constructor() { }

  ngOnInit(): void {
  }
  clickTempHum(){
    this.isCheckedTempHum = !this.isCheckedTempHum;
    if(this.isCheckedTempHum){
      this.showTempHum = "ON";
    }
    else this.showTempHum = "OFF";
  }
  clickMotion(){
    this.isCheckedMotion = !this.isCheckedMotion;
    if(this.isCheckedMotion){
      this.showMotion = "ON";
    }
    else this.showMotion = "OFF";
  }
}
