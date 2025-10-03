// export interface StockAlertItem {
//   stockAlertItemId: string;
//   colorNm: string;
//   script: string;
//   alertType: string;
// }

// export interface StockAlert {
//   readonly stockAlertId: string;
//   alertNm: string;
//   alertType: string;
//   stockAlertItems?: StockAlertItem[]; // Optional association
// }

export interface StockAlert {
  stockalert_id: string;
  name: string;
  description: string;
  alert_type: string;
  stockalertitems: StockAlertItem[];
}

export interface StockAlertItem {
  stockalertitem_id: string;
  stockalert_id: string;
  title: string | null;
  script: string;
  description: string;
  param: any[] | null; // If Param is a JSON string, consider using `Record<string, any>`
  type: string;
  kind: string;
  color_nm: string | null;
  connector:  string;
}
