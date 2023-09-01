import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private apiUrl = 'http://universities.hipolabs.com/search';

  constructor(private http: HttpClient) {}

  getUniversitiesByCountry(country: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?country=${country}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }
}
