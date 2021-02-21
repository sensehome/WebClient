import { Component, Input, OnInit, SimpleChange } from '@angular/core';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  @Input() chartName: string;
  @Input() title: string;
  @Input() lineValues: any[];

  chartOptions = {
    series: [
      {
        name: '',
        data: [0],
      },
    ],
    chart: {
      height: 300,
      type: 'line',
      id: 'realtime',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
        animateGradually: {
          enabled: true,
          delay: 150,
        },
      },
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: '',
    },
    xaxis: {
      range : 10,
      categories: [
        new Date().toLocaleTimeString(),
      ],
      label : {
        show : true,
        rotate : -45,
      }
    },
  };
  looper: any;

  ngOnInit() {
    this.chartOptions.title.text = this.title
  }

  ngOnChanges(changes: SimpleChange) {
    if (this.chartOptions) {
      if (changes['lineValues']) {
        this.chartOptions.series = [
          {
            name: this.chartName,
            data: this.lineValues[0],
          },
        ];
        this.chartOptions.xaxis.categories.push(new Date().toLocaleTimeString())
      }
    }
  }

  ngOnDestroy() {}
}
