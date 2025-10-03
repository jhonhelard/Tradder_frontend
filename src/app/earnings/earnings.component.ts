import { Component, OnInit } from '@angular/core';
import { EarningsService } from '../core/services/earnings.service'; // Adjust the path as necessary

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {
  reportDate: string | null = null;

  constructor(private earningsService: EarningsService) {}

  ngOnInit(): void {
    console.log('EarningsComponent initialized');
  }

  getEarnings(symbol: string): void {
    this.earningsService.getEarnings(symbol).subscribe(
      (response) => {
        console.log('Response received:', response);

        // Assuming the response is already in JSON format
        if (response && response.earnings && response.earnings.length > 0) {
          this.reportDate = response.earnings[0].report_date;
          console.log('Report Date:', this.reportDate);
        } else {
          console.log('No earnings data found in the response.');
        }
      },
      (error) => {
        console.error('Error fetching earnings data', error);
      }
    );
  }
}
