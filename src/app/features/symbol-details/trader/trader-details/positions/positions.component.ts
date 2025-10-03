import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TradierService } from 'src/app/core/services/tradier.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  positions: any[] = [];

  constructor(private _TradierService: TradierService) { }

  ngOnInit(): void {
    this.getPosition()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPosition();
  }

  getPosition() {
    this._TradierService.getPosition().subscribe((data: any) => {
      if (Array.isArray(data.positions.position)) {
        this.positions = data.positions.position;
      }
      else if (data.positions.position) {
        this.positions = [data.positions.position];
      }
    });
  }

}
