import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CalendarService } from 'src/app/calender.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  jobSub: Subscription;

  constructor(
    private calendarService: CalendarService
    ) { 
    
  }
  

  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      description: new FormControl(null),
      quantity: new FormControl(null),
      tax: new FormControl(null),
      rate: new FormControl(null),
      amount: new FormControl(null)
    });
  }

}
