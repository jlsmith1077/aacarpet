import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';

import { JobList } from '../../model/joblist.model';
import { Subscription } from 'rxjs';
import { CalendarService } from '../../calender.service';
import { MatchingDates } from 'src/app/model/matchingdate.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort }  from '@angular/material/Sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ViewCompileResult } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllJobsComponent implements OnInit, OnDestroy { 
   
  allJobsSub: Subscription;
  todayListSub: Subscription;
  jobListSub: Subscription;
  getCompleteJobsBoolSub: Subscription;
  jobList: JobList[] = [];
  joblist: JobList[] = [];
  today =  new Date();
  nextWeek = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 7)
  todayDate = this.today.setHours(0,0,0,0);
  offset: number = (new Date().getTimezoneOffset());
  jobsToday: JobList[] = [];
  jobsUpcoming: JobList[] = [];
  matchingDates: MatchingDates[] = [];
  @Input() allJobsBool: Boolean = false;
  @Input() jobsThisWeekBool: Boolean = false;
  @Input() completeJobsBool: Boolean = false;
  @Input() upcomingJobsBool: Boolean = false;
  @Input() isDateSelected: boolean = false;
  @Input() todayJobsBool: boolean = false;
  @ViewChild(MatSort) sort?: MatSort;
  dateRangeListSub: Subscription;
  dataSource: MatTableDataSource<any>;
  columnsToDisplay = ['date', 'company'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: JobList | null;
  arrJobs = [];
  constructor(
    private calendarService: CalendarService
    ) { }

  ngOnInit(): void {
    this.getCompleteJobsBoolSub = this.calendarService.getCompleteJobsBoolUpdateListener().
    subscribe(bool => {
      this.completeJobsBool = bool;
    })
    this.jobListSub = this.calendarService.getJobListListener().
    subscribe((joblist: JobList[])=> {
      this.joblist = joblist;
      if(!this.completeJobsBool) {
        this.jobsThisWeek();
      } else {
        this.dataSource = new MatTableDataSource(joblist);
        console.log('in ele for data', this.dataSource);
        this.dataSource.sort = this.sort!;
        this.completeJobsBool = true;
      }
      console.log('job list onInit', this.jobList, 'data', this.dataSource);
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
    this.calendarService.getJobList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterVieInit() {
    this.dataSource.sort = this.sort!;
  }
  compareDates(dates: string[]) {
    const arrMatchedDates: MatchingDates[] = [];
      dates.forEach((date) => {
        this.arrJobs = [];
        const dt1 = this.WithoutTime(date);
         this.joblist.filter(job => {
           const dt2 = this.WithoutTime(job.date.startDate);
           if(dt1 == dt2) {
            this.arrJobs.push(job);
          }          
        });
        arrMatchedDates.push({date: date, jobs: this.arrJobs});
        
      });   
      this.matchingDates = arrMatchedDates;
      this.todayJobsBool = false;
      this.isDateSelected = true;
      this.allJobsBool = false;
      this.completeJobsBool = false;
      this.upcomingJobsBool = false;
  }
  sortToday() {
    this.todayJobsBool = true;
    this.isDateSelected = false;
    this.allJobsBool = false;
    this.completeJobsBool = false;
    this.upcomingJobsBool = false;
    this.filterToday();

  }
  sortJobList(joblist: JobList[]) {
    const jobs = joblist.sort((a, b) => new Date(a.date.startDate).getTime() - new Date(b.date.startDate).getTime());
    this.dataSource = new MatTableDataSource(jobs.filter(job => new Date(job.date.startDate).toISOString() >= this.today.toISOString())); 
    this.jobList = this.jobList.filter(job => job.date.startDate <= this.nextWeek.toISOString());
  }
  jobsThisWeek() {
    this.allJobsBool = false;
    this.upcomingJobsBool = false;
    this.isDateSelected = false;
    this.todayJobsBool = false;
    this.completeJobsBool = false;
    this.jobsThisWeekBool = true;
    this.sortJobList(this.joblist);
  }
  upcomingJobs() {
    console.log('job list upcoming jobs', this.jobList);   
    this.dataSource = new MatTableDataSource( this.joblist.filter(job => new Date(job.date.startDate).toISOString() >= this.today.toISOString()));
    this.allJobsBool = false;
    this.upcomingJobsBool = true;
    this.isDateSelected = false;
    this.todayJobsBool = false;
    this.completeJobsBool = false;
    this.jobsThisWeekBool = false;
  }
  oldJobs() {
    this.allJobsBool = false;
    this.isDateSelected = false;
    this.todayJobsBool = false;
    this.completeJobsBool = true;
    this.calendarService.getJobList();
  }
  setInvoice(job: JobList){
    this.calendarService.selectedInvoice(job);
  }
  filterToday() {
    const arrJobs = [];
    this.joblist.filter(job => {
      const dt1 = this.todayDate;
      const dt2 = this.WithoutTime(job.date.startDate);
      if(dt1 == dt2) {
        arrJobs.push(job);
     }
    });  
    this.jobList = arrJobs;
  }
  WithoutTime(dateTime) {
    var d = new Date(dateTime);
    d.setHours(0, 0, 0, 0);
    const date = d.getTime();
    return date;
  }
  ngOnDestroy(): void {
      this.jobListSub.unsubscribe();
      this.dateRangeListSub.unsubscribe();
      this.getCompleteJobsBoolSub.unsubscribe();
  }
}
