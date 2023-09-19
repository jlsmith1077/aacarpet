import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { JobList } from "./model/joblist.model";
import { environment } from '../environments/environment'
import { WorkDescription } from "./model/workdescription.model";

const backendURL = environment.apiURL + "/jobs/";
const sendSms = environment.apiURL + "/sendsms/";

@Injectable({
    providedIn: 'root'
  })

export class CalendarService {
today = new Date();
todayDate = this.today.setHours(0,0,0,0);
joblist: JobList[] = [];
allJobs: JobList[] = [];
todayJobs: JobList[] = [];
dateRangeList: Date[];
invoice: any;

private invoiceUpdate = new Subject<JobList>();
private alljobsUpdate = new Subject<JobList[]>();
private jobListUpdate = new Subject<JobList[]>();
private todayJobsUpdate = new Subject<JobList[]>();
private dateRangeListUpdate = new Subject<Date[]>();
private completeJobsBoolUpdate = new Subject<Boolean>();

constructor(private http: HttpClient, private router: Router) {

}
// ---------------------------------------Todays Jobs------------------------
getCompleteJobsBoolUpdateListener() {
  return this.completeJobsBoolUpdate.asObservable();
}
getCompleteJobsBoolUpdate() {
  this.completeJobsBoolUpdate.next(false);
}
getTodayJobsListener() {
  return this.todayJobsUpdate.asObservable();
}
getTodayJobs() {
  this.todayJobsUpdate.next([...this.todayJobs]);
}

WithoutTime(dateTime) {
  var d = new Date(dateTime);
  d.setHours(0, 0, 0, 0);
  const date = d.getTime();
  return date;
}
filterToday() {
  const arrJobs = [];
  this.joblist.filter(job => {
    const dt1 = this.todayDate
    const dt2 = this.WithoutTime(job.date.startDate);
    if(dt1 == dt2) {
      arrJobs.push(job);
   }
  });
  this.todayJobs = arrJobs 
  this.getTodayJobs();
  console.log('service fliter today', this.todayJobs)
}
//-------------------------------------------------------- date range list

adddateRangeList(dateRange: Date[]) {
  this.dateRangeList = dateRange;
  this.getdateRangeList();
}
getdateRangeListListener() {
  return this.dateRangeListUpdate.asObservable();
}
getdateRangeList() {
  this.dateRangeListUpdate.next([...this.dateRangeList]);
}

//---------------------------------------------------------- Invoice

getInvoiceListListener() {
  return this.invoiceUpdate.asObservable();
}
selectedInvoice(job: JobList) {
  this.invoice = job;

}
getInvoice() {
  this.invoiceUpdate.next(this.invoice);
}
// ---------------------------------------------------------- All Jobs

getAllJobsListener() {
  return this.alljobsUpdate.asObservable();
}
getAllJobs() {
  this.alljobsUpdate.next([...this.joblist]);
  console.log('joblist in service', this.joblist)
}


//----------------------------------------------------------- JobList

addToJobList(job: JobList) {
  this.getCompleteJobsBoolUpdate();
  this.joblist.push(job);
  this.getJobList();
  this.http.post<{job: JobList}>(backendURL, job).
  subscribe(response => {
      console.log('response from server', response);
  });
  this.getJobList();
}
getJobListListener() {
  return this.jobListUpdate.asObservable();
}
// sendMessage() {
//   this.http.post(sendSms).subscribe(response => {

//   })
// }
getJobList() {
   this.http.get<{
    message: string;
    jobs: any,
    maxJobs: number
  }>(backendURL)
    .pipe(
      map(jobListData => {
        return {
          jobList: jobListData.jobs.map(job => {
            return {              
              date: {startDate: job.date.startDate, endDate: job.date.endDate},
              dateRange: job.dateRange,
              email: job.email,
              address: job.address,
              company: job.company,
              phone: job.phone,
              type: job.type,
              id: job._id
            };
          }),
          maxJobs: jobListData.maxJobs
        };
      })
    )
    .subscribe(transformedjobListData => {
      this.joblist = transformedjobListData.jobList;      
      this.jobListUpdate.next([...this.joblist]);
    });
  }
}
