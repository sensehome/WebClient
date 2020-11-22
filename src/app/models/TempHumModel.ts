export class ChartModel {
  label: string;
  data: string;

  constructor(label = '',data = ''){
      this.label = label;
      this.data = data;
  }

  public getDataInModel = () => {
      return new TempHumidity(JSON.parse(this.data));
  }
}

export class TempHumidity{
  temperature: string;
  humidity : string;

  constructor(data : any){
      this.humidity = data.humidity;
      this.temperature = data.temperature;
  }
}
