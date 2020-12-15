import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() user: string;

  values = []
  labels = []
  chartOptions = {
    series: [
      {
        name: "My-series",
        data: this.values
      }
    ],
    chart: {
      height: 350,
      type: "line",
      id: "realtime",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
        animateGradually: {
          enabled: true,
          delay: 150
        },
      },
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "My First Angular Chart"
    },
    xaxis: {
       range: 10,
      categories: this.labels
    }
  };
  looper: any

  ngOnInit() {
    console.log(this.user)
    this.looper = setInterval(() => {
      this.values.push((Math.random() * 10).toPrecision(2))
      this.labels.push(new Date().getSeconds)
      this.chartOptions.series = [{
        name : "My Chart",
        data : this.values
      }]
    }, 2000)
  }

  ngOnDestroy() {
    if (this.looper) {
      clearInterval(this.looper);
    }

  }

}
