import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StockAlert, StockAlertItem } from '../models/stockalert';

@Injectable({
  providedIn: 'root'
})
export class StockAlertService {
  
  private readonly apiUrl: string = `${environment.truchartsAPI}/stockalert`;

  constructor(private http: HttpClient) {}

  // getAlertByType(alertType: string, index: number): StockAlertItem | undefined {
  //   // Assuming stock alerts are fetched from somewhere
  //   const stockAlerts: StockAlertItem[] = this.getAvailableAlerts(); // Implement this method
  //   return stockAlerts.find((alert, i) => alert.alertType === alertType && i === index);
  // }
  
  // replaceScriptParams(script: string, alert: StockAlertItem | undefined): string {
  //   if (!alert) return script;
  //   return script.replace("{alertType}", alert.alertType); // Modify as per your logic
  // }
  
//  // Dummy data (Replace with actual logic)
// private getAvailableAlerts(): StockAlertItem[] {
//   return [
//     {
//       stockAlertItemId: "1",
//       alertType: "Price",
//       script: "Price Alert Script",
//       colorNm: "Red",
//     },
//     {
//       stockAlertItemId: "2",
//       alertType: "Technical",
//       script: "Technical Alert Script",
//       colorNm: "Blue",
//     },
//   ];
// }

  // Get all stock alerts
  getAllStockAlerts(): Observable<StockAlert[]> {
    return this.http.get<StockAlert[]>(`${this.apiUrl}/GetAll`)
      .pipe(catchError(this.handleError));
  }

  // Get stock alert by ID
  getStockAlertById(id: string): Observable<StockAlert> {
    return this.http.get<StockAlert>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Create a new stock alert with associated items
  createStockAlert(stockAlert: StockAlert): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/create`, stockAlert)
      .pipe(catchError(this.handleError));
  }

  // Global error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`StockAlertService Error: ${error.message}`);
    
    return throwError(() => new Error(
      error.error?.message || 'Something went wrong. Please try again later.'
    ));
  }
}
