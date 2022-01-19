import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlantouneService {
  plantLiked$ = new Subject<any>();
  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/list_products');
  }

  getPlantById(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(
      'http://localhost:3000/list_products?product_id=' + id
    );
  }

  getPlantFav(userId: number): Observable<any> {
    return this.httpClient.get<any[]>(
      `${this.apiUrl}/favPlant?userId=${userId}`
    );
  }
}
