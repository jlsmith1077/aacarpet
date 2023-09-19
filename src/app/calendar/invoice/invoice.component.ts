import { Component, OnInit, OnDestroy, Renderer2, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { CalendarService } from 'src/app/calender.service';
import { InvoiceService } from 'src/app/invoice.service';
import { Subscription } from 'rxjs';
import { JobList } from 'src/app/model/joblist.model';
import { JobType } from 'src/app/model/jobtype.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { WorkType } from 'src/app/model/worktype.model';
import { WorkDescription } from 'src/app/model/workdescription.model';
import { map } from 'rxjs/operators';
import { InvoiceForm } from 'src/app/contactform';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  myJob: FormArray;
  myJanitorial: FormArray;
  myTile: FormArray;
  myRestoration: FormArray;
  myPressureWashing: FormArray;
  myStrippingWaxing: FormArray;
  myCementBasement: FormArray;
  totalAmountForm: FormGroup;
  invoiceNumber: number;
  invoiceFormTop: FormGroup;
  invoiceFormMid: FormGroup;
  jobsList: JobList[];
  jobtypes: JobType[];
  workDescription: WorkDescription[];
  subJobList: Subscription;
  type: JobType[] = [];
  taxBool: boolean = false;
  tax: number = .06625;
  separater: string = ' - ';
  @ViewChild('matCheckTax') matCheckTax;
  @ViewChildren('taxInput') taxInputs: QueryList<ElementRef>;
  @ViewChildren('formGroup') formGroups: QueryList<ElementRef>;
  @ViewChild('bottom') bottom: ElementRef;
  @ViewChild('actions') actions: ElementRef;
  @ViewChild('mid') mid: ElementRef;
  @ViewChild('parent') parent: ElementRef;
  typeName: string = '';
  jobTypeName: string = '';
  jobCarpetCleaning: string = '';
  jobJanitorialCleaning: string = '';
  jobTileCleaning: string = '';
  jobRestoration: string = '';
  jobStrippingWaxing: string = '';
  jobPowerWashing: string = '';
  formArrayJobType: FormArray;
  formArrayType: FormArray;
  formGroupJobType: FormGroup;
  invoiceFormBottom: FormArray;
  invoiceFormBottomGroup: FormGroup;
  formGroupArray: any;
  index: number;
  allTaxInputs: ElementRef;
  prc: number;
  totalAmt: number = 0;
  totalTax: number = 0;
  controlAmount: any[] = [];


  constructor(
      public calendarService: CalendarService,
      public invoiceServ: InvoiceService,
      private elementRef: ElementRef, private renderer: Renderer2,
      private fb: FormBuilder, private currencyPipe: CurrencyPipe
      ) {}
  
  
  ngOnInit(): void {
      this.invoiceFormBottom = new FormArray([
        new InvoiceForm()
      ]);
    this.invoiceFormTop = new FormGroup({
      bill_to: new FormControl(null),
      ship_to: new FormControl(null)
    });
    this.invoiceFormMid = new FormGroup({
      po_number: new FormControl(null),
      terms: new FormControl(null),
      project: new FormControl(null)
    });
    this.totalAmountForm = new FormGroup({
      totalAmount: new FormControl(null),
      totalTax: new FormControl(null)
    });
    this.calendarService.getInvoiceListListener();
    this.subJobList = this.calendarService.getInvoiceListListener().
    subscribe(
      job => {
        if(job != undefined) {
          this.invoiceNumber = job.id;
          job.type.forEach(type => {
            if(type.name) {
              type.type.map((jobtype, index) => {
                const i = index
                const invoiceBottom = this.fb.group({
                  description: (type.name + this.separater + jobtype.name + this.separater + ('Apt# - ' + jobtype.aptNumber)),
                  rate: 0,
                  quantity: jobtype.quantity,
                  amount: this.currencyPipe.transform((jobtype.quantity * (0)), 'USD'),
                  tax: this.currencyPipe.transform((jobtype.quantity * this.tax * (0)), 'USD')
                })
                this.invoiceFormBottomGroup = invoiceBottom;
                this.index = i;
                  this.addGroup(this.index);
              }) 
            } else {
                const invoiceBottom = this.fb.group({
                  description: type,
                  rate: 0,
                  quantity: 0,
                  amount: 0,
                  tax: 0
                })
                this.invoiceFormBottomGroup = invoiceBottom;
                  this.addGroup(0);
            }
          }
             
          );
        } else {
          this.invoiceNumber = 0;
          const invoiceBottom = this.fb.group({
            description: 'No Job Selected.',
            rate: 0,
            quantity: 0,
            amount: this.currencyPipe.transform((0 * (0)), 'USD'),
            tax: this.currencyPipe.transform((0 * this.tax * (0)), 'USD')
          })
          this.invoiceFormBottomGroup = invoiceBottom;
          this.index = 0;
            this.addGroup(this.index);
        }
      this.invoiceFormTop.setValue({
        bill_to: '',
        ship_to: ''        
      });
      this.invoiceFormMid.setValue({
        po_number: '',
        terms: '',
        project: '',
      });
      this.totalAmountForm.setValue({
        totalAmount: '0',
        totalTax: '0'
      });
    });
    this.calendarService.getInvoice();
    this.invoiceFormBottom.controls = this.invoiceFormBottom.controls.filter(control => control.get('amount').value != null)
  }
  addGroup(index){
    this.invoiceFormBottom.insert(index, this.invoiceFormBottomGroup);
  }
  addGroupHtml(FormGroupEl, length) {
    const description = FormGroupEl.controls.description.value;
    const rate = FormGroupEl.controls.rate.value;
    const quantity = FormGroupEl.controls.quantity.value;
    const amount = FormGroupEl.controls.amount.value;
    const tax = FormGroupEl.controls.tax.value;
    const obj = this.fb.group({
      description,
      rate,
      quantity,
      amount,
      tax
    })
    const index = (length + 1);
    this.invoiceFormBottom.insert(index, obj);
    this.calculateTax();
  }
  removeGroup(index) {
    this.invoiceFormBottom.removeAt(index);
    this.calculateTax();
  }

  calculateAmont(){
  }
  noTax(event: MatCheckboxChange) {
    this.taxBool = event.checked;
    console.log('tax bool', this.taxBool);
    this.calculateTax()
    // this.calculateTax(event);
  }  
  convertCurrency(value) {
    if(value != null) {
      return parseInt(value.replace(/[$,]/g, ''))
    }
    // Number(value.replace(/[^0-9.-]+/g,""))
  } 
  calculateTax() {
      this.invoiceFormBottom.controls.forEach(control => {  
        this.totalAmt =  0;
        this.totalTax = 0;      
        const a = control.value['rate']
        const b = control.value['quantity']
        const c = (Number(a.replace(/[^0-9.-]+/g,"")) * b).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        console.log('control value',a, b, c)
        let amt = this.convertCurrency(c);
        if(amt != null) {
          if(typeof amt === 'string') {
            this.controlAmount.push(Number(amt))
          } else {
            this.controlAmount.push(Number(amt))         
          }
        }
        const thisTax = (amt * this.tax)
        console.log('tax bool', this.taxBool)
        control.patchValue({
          amount: this.currencyPipe.transform(amt, 'USD')
        })
        if(!this.taxBool) {
          control.patchValue({
            tax: this.currencyPipe.transform(thisTax, 'USD')       
          })
        } else {
          control.patchValue({
            tax: this.currencyPipe.transform(0, 'USD')       
          })
        }
      })   
      const multiply = (num1, num2) => {
        return num1 * num2;
      };   
      this.totalAmt =  this.getSum(this.controlAmount);
      this.totalTax = multiply(this.totalAmt, this.tax)
      if(!this.taxBool) {
        this.totalAmt = (this.totalAmt) + (this.totalTax);
      }
      console.log('total tax', this.totalTax)
      this.totalAmountForm.patchValue({
        totalAmount: this.currencyPipe.transform(this.totalAmt, 'USD')       
      })
      if(!this.taxBool) {
        this.totalAmountForm.patchValue({
          totalTax: this.currencyPipe.transform(this.totalTax, 'USD')       
        })
      } else {
        this.totalAmountForm.patchValue({
          totalTax: this.currencyPipe.transform(0, 'USD')       
        })
      }
      this.controlAmount = [];
  }
  getSum(ary){
    return ary.reduce(function(sum, value) {
        return sum + value;
    });
}
  addType() {
   this.type = [];
  }
  
  printPage() {
    window.print();
    // console.log('form', this.invoiceFormBottom.get('description'));
    // this.invoiceServ.addInvoice(

    // )
  }

  ngOnDestroy(): void {
      this.subJobList.unsubscribe();
  }
}
