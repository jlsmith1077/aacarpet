import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';



import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddJobComponent } from './calendar/add-job/add-job.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AllJobsComponent } from './calendar/all-jobs/all-jobs.component';
import { InvoiceComponent } from './calendar/invoice/invoice.component';
import { OutletComponent } from './outlet/outlet.component';
import { InvoiceFormComponent } from './calendar/invoice/invoice-form/invoice-form.component';
import { TodayJobsComponent } from './calendar/today-jobs/today-jobs.component';
import { AutosizeDirectiveDirective } from './autosize-directive.directive';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AddJobComponent,
    HeaderComponent,
    AllJobsComponent,
    InvoiceComponent,
    OutletComponent,
    InvoiceFormComponent,
    TodayJobsComponent,
    AutosizeDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [CurrencyPipe, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
HTTP_INTERCEPTORS