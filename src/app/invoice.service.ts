import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { JobList } from "./model/joblist.model";
import { environment } from '../environments/environment';

const backendURL = environment.apiURL + "/invoice/";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient, private router: Router) { }

  addInvoice(bill_to: string, ship_to: string, po_number: number, terms: string, project: string, jobDetail: {}, totalAmount: number, totalTax: number  ) {
    const invoice = {
        bill_to: bill_to,
        ship_to: ship_to,
        po_number: po_number,
        terms: terms,
        project: project,
        jobDetail: jobDetail,
        totalAmount: totalAmount,
        totalTax: totalTax
    }
    this.http.post<{invoice: any}>(backendURL, invoice).
subscribe(response => {
  console.log('response for adding invoice', response);
});
}
}
