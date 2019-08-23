import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WeatherCloudModel } from '../models/weather-cloud.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({providedIn: 'root'})
export class WeatherCloudService {

  protected apiRoot: string;
  protected forecastWrapper: string = 'https://flw-rd.azurewebsites.net/api/ForecastWrapperAPIFunction?code=eLPC6WXunKwh8fKMaT/phsUAbbdSQ72kqbFSCp34BOeZmBOJQ5CWww==';
  
  
  constructor(private httpClient: HttpClient) {
    this.apiRoot = 'https://azuremaps.fathym.com';
  }


  public departureTableData(apiKey: string,
                            origin: string,
                            destination: string,
                            departureTime: string,
                            includeAlts: boolean): Observable<any[]> {

    if (!apiKey) {
      console.warn('You need to set an API Key');
      return;
    }

    let params = new HttpParams();

    params = params.append('origin', origin);
    params = params.append('destination', destination);
    params = params.append('departTime', departureTime);
    params = params.append('includeAlts', String(includeAlts));
    params = params.append('token', apiKey);

    // return this.httpClient.get<any[]>(`${this.apiRoot}/departtimes`, {params: params})
    return this.httpClient.get<any[]>(`${this.forecastWrapper}`, {params: params})
   .pipe(
      map((res) => {
        // const data = this.remapData(res);
        console.log(res);
        return res;
      })
   );
  }

  private handleError(err: any): any {
    console.log('error');
  }

  /**
   * Remap the data being returned so it fits with format we expect
   * @param val Date being returned from API
   */
  // private remapData(val: any): Array<WeatherCloudModel> {
  //   const arr: Array<WeatherCloudModel> = [];
  //   const element = val['data'][0];
  //     Object.keys(element).forEach((key, index) => {
  //       const item = {} as WeatherCloudModel;
  //       Object.keys(element[key]).forEach((childKey, childIndex) => {
  //         switch (childKey.toUpperCase()) {
  //           case 'GUST':
  //           item.windGustMin = element[key][childKey][0];
  //           item.windGustMax = element[key][childKey][1];
  //           break;
  //           case 'PRECIP':
  //           item.precipMin = element[key][childKey][0];
  //           item.precipMax = element[key][childKey][1];
  //           break;
  //           case 'PTYPE':
  //           item.ptypeMin = element[key][childKey][0];
  //           item.ptypeMax = element[key][childKey][1];
  //           break;
  //           case 'SPD':
  //           item.windSpdMin = element[key][childKey][0];
  //           item.windSpdMax = element[key][childKey][1];
  //           break;
  //           case 'TEMP':
  //           item.tempMin = element[key][childKey][0];
  //           item.tempMax = element[key][childKey][1];
  //           break;
  //           case 'VTIMES':
  //           item.vtimesStart = element[key][childKey][0];
  //           item.vtimesEnd = element[key][childKey][1];
  //           break;
  //         }
  //       });
  //       arr.push(item);
  //     });
  //   return [...arr];
  // }
}
