import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LocalstorageHelper } from 'src/app/core/helpers/localstorage.helper';
import { TradierService } from 'src/app/core/services/tradier.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit {
  orders: any[] = [];

  constructor(private _TradierService: TradierService, private localHelper: LocalstorageHelper) { }

  ngOnInit(): void {
    this.localHelper.tradierCred$.subscribe((cred: any) => {
      if (cred && cred.TradierAccountNo) this.getOrders();
    })
  }

  getOrders() {
    this._TradierService.getOrders()
      .subscribe((data: any) => {
        if (data.orders == "null") {
          return
        }
        if (Array.isArray(data.orders.order)) {
          this.orders = data.orders.order;
        }
        else {
          this.orders = [data.orders.order];
        }

        console.log(this.orders)
      });
  }
}
