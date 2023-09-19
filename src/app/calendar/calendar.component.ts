import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatCalendarUserEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { JobList } from '../model/joblist.model';
import { Subscription } from 'rxjs';
import { CalendarService } from '../calender.service';
import { MatchingDates } from '../model/matchingdate.model';
import { map } from 'rxjs/operators';
import { AutosizeDirectiveDirective } from '../autosize-directive.directive';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
  jobSelected: boolean = false;
  offset: number = (new Date().getTimezoneOffset());
  jobType = {};
  todayJobsBool: Boolean = false;
  allJobsBool: Boolean = false;
  completeJobsBool: Boolean = false;
  jobsToday: JobList[] = [];
  jobsUpcoming: JobList[] = [];
  matchingDates: MatchingDates[] = [];
  todayDate = new Date();
  selected: Date | null;
  time: object[];
  todayJobsSub: Subscription;
  jobListSub: Subscription;
  dateRangeListSub: Subscription;
  job: JobList;
  showPastJobs: Boolean = false;
  pastJobs: JobList[] = [];
  jobList: JobList[] = [];
  tempJobsList: JobList[] = [];
  matchedDateList: JobList[] = [];
  arrJobs = [];
  timeFrame: string;
  isDateSelected: boolean;
  dateRangeList: Date[] = [];
  dt: Date;
  @ViewChild('dateRangeStart')  dateRangeStart: ElementRef;
  @ViewChild('dateRangeEnd')  dateRangeEnd: ElementRef;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private calendarService: CalendarService, private myElement: ElementRef
    ) { }

  ngOnInit(): void {
    this.isDateSelected = false;
    this.jobListSub = this.calendarService.getJobListListener().
    subscribe((joblist: JobList[])=> {
      this.jobList = joblist;   
    });
    this.dateRangeListSub = this.calendarService.getdateRangeListListener()
    .subscribe((dates: Date[]) => {
      const isoDates: string[] = [];
     dates.forEach((date, index) => {
      const dt = this[index] = date.toISOString();
      isoDates.push(dt);
     }); 
     this.compareDates(isoDates); 
    });
    this.time =  [{hour: 'All Work Day'},{hour: '8-9', dayTime: 'AM'},{hour: '9-10', dayTime: 'AM'},{hour: '10-11', dayTime: 'AM'},{hour: '11-12', dayTime: 'AM'},{hour: '12-1', dayTime: 'PM'},{hour: '1-2', dayTime: 'PM'},{hour: '2-3', dayTime: 'PM'},{hour: '3-4', dayTime: 'PM'},{hour: '4-5', dayTime: 'PM'},{hour: '5-6', dayTime: 'PM'},{hour: '6-7', dayTime: 'PM'},{hour: '7-8', dayTime: 'PM'},{hour: '8-9', dayTime: 'PM'},{hour: '9-10', dayTime: 'PM'}];
  }
  changeIsdateselected() {
    this.isDateSelected = false;
  }
  sortTodayJobs(jobList: JobList[]) {
    this.jobList = jobList.filter(job => new Date(job.date.startDate).getTime() >= new Date().getTime());
    this.jobList = this.jobList.sort((a, b) => new Date(b.date.startDate).getTime() - new Date(a.date.startDate).getTime());

  }

  sortToday() {
    this.todayJobsBool = true;
    this.isDateSelected = false;
    this.allJobsBool = false;
    this.completeJobsBool = false;
    this.calendarService.filterToday();
  }
  sortAllJobs() {
    this.calendarService.getAllJobs();
    this.allJobsBool = true;
    this.todayJobsBool = false;
    this.isDateSelected = false;
    this.completeJobsBool = false;
  }
  upcomingJobs() {
    this.allJobsBool = false;
    this.isDateSelected = false;
    this.todayJobsBool = false;
    this.completeJobsBool = false;
    this.calendarService.getJobList();
  }

  setInvoice(job: JobList){
    this.calendarService.selectedInvoice(job);
  }
  sortDates(dt1, dt2, job) {
      if(dt1 == dt2) {
        return this.arrJobs.push(job);
      }
  }
  WithoutTime(dateTime) {
    var d = new Date(dateTime);
    d.setHours(0, 0, 0, 0);
    const date = d.getTime();
    return date;
  }
  compareDates(dates: string[]) {
    const arrMatchedDates: MatchingDates[] = [];
      dates.forEach((date) => {
        this.arrJobs = [];
        const dt1 = this.WithoutTime(date);
         this.jobList.filter(job => {
           const dt2 = this.WithoutTime(job.date.startDate);
          //  console.log('dt1, dt2', dt1, dt2);
           if(dt1 == dt2) {
            this.arrJobs.push(job);
          }          
        });
        arrMatchedDates.push({date: date, jobs: this.arrJobs});
        
      });   
      this.matchingDates = arrMatchedDates;
  }

  getDaysArray(start, end) {
    for(this.dateRangeList=[],this.dt=new Date(start); this.dt<=end; this.dt.setDate(this.dt.getDate()+1)){
        this.dateRangeList.push(new Date(this.dt));        
    }
    return this.dateRangeList 
};
scrollTo(){
  this.myElement.nativeElement.ownerDocument.getElementById('scrollTo').scrollIntoView({behavior: 'smooth'});
}

  dateChanged(dateRangeStart: HTMLInputElement , dateRangeEnd: HTMLInputElement) {
    this.isDateSelected = true;
    const dateStart = dateRangeStart.value;
    const dateEnd = dateRangeEnd.value;
    if(dateEnd === undefined || dateEnd === '') {
      this.dateRangeList = this.getDaysArray(new Date(dateStart),new Date(dateStart));      
    } else {
      this.dateRangeList = this.getDaysArray(new Date(dateStart),new Date(dateEnd));
    }
    this.dateRangeList.map((v)=>v.toISOString().slice(0,10)).join("");
    this.calendarService.adddateRangeList(this.dateRangeList);
  }
  matchDates(array1, array2: JobList[]) {
    for(let i = 0; i< array1.length; i++){
      // Loop for array2
      for(let j = 0; j< array2.length; j++) {
        // Compare the element of each and every element from both of thearrays
        console.log('array 2', array2[j].dateRange);
        console.log('array 1', array1[i]);
        if(array1[i] === array2[j].dateRange) {
          console.log('array 1', i, 'array2', j);
        } else {
          console.log('didnt make it');
        }
      }
    }
  }
ngOnDestroy(): void {
    this.jobListSub.unsubscribe();
    this.dateRangeListSub.unsubscribe();
}
  
}

