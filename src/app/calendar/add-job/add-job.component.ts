import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { Subject } from 'rxjs';
import { CalendarService } from '../../calender.service';
import { JobList } from 'src/app/model/joblist.model';
import { WorkType } from 'src/app/model/worktype.model';
import { WorkDescription } from 'src/app/model/workdescription.model';
import { CementBasement } from 'src/app/model/cementbasement.model';
import { Description } from 'src/app/model/description.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { AutosizeDirectiveDirective } from 'src/app/autosize-directive.directive';
import { JobType } from 'src/app/model/jobtype.model';
import { MatOptgroup, MatOption } from '@angular/material/core';



@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  checkCircle: boolean = false;
  isVisible: boolean = false;
  turnGreen: boolean = false;
  workType: WorkType[] = [];
  numberBool: boolean = false;
  typeName: string = '';
  jobTypeName: string = '';
  num: boolean = false;
  @Output() isDateSelected = new EventEmitter<boolean>();
  @Input() dateStart: Date;
  @Input() dateEnd: Date;
  @Input() dateRangeList: Date[];
  @Output() joblist = new Subject<JobList[]>();
  @Input() allJobsBool: boolean;
  @Input() todayJobsBool: boolean;
  @Input() CompletedJobsBool: boolean;
  @Input() hideRequiredMarker: boolean
  jobList: JobList[] = [];
  bindedValue: string = '';
  buildcarpeTypeArray: string[] = []; //for building JobType for job in createDescription
  buildOtherTypeArray: string[] = [];
  buildtypedInTypeArray: string[] = [];
  buildjanitorialTypeArray: string[] = [];
  buildtileTypeArray: string[] = [];
  buildUpholsteryTypeArray: string[] = [];
  buildrestorationTypeArray: string[] = [];
  buildpressureWashingTypeArray: string[] = [];
  buildcementBasementTypeArray: string[] = [];
  buildStrippingWaxingTypeArray: string[] = [];
  descriptionCarpet: Description[] = [];
  carpetArray: WorkDescription;//for building Job to save
  otherArray: any;
  otherTypeArray: any[] = [];
  carpetTypeArray: JobType[] = [];
  typedInWork: any[] = [];
  janitorialArray: WorkDescription;
  janitorialTypeArray: JobType[] = [];
  tileArray: WorkDescription;
  tileTypeArray: JobType[] = [];
  upholsteryTypeArray: JobType[] = [];
  upholsteryArray: WorkDescription;
  restorationArray: WorkDescription;
  restorationTypeArray: JobType[] = [];
  pressureWashingArray: WorkDescription;
  pressureWashingTypeArray: JobType[] = [];
  cementBasementArray: WorkDescription;
  cementBasementTypeArray: JobType[] = [];
  strippingWaxingArray: WorkDescription;
  strippingWaxingTypeArray: JobType[] = [];
  descriptionJanitorial: Description[] = [];//descriptions are for mat-card that appear showing what user selects
  decriptionTypeIn: string = '';
  descriptionTile: Description[] = [];
  descriptionRestoration: Description[] = [];
  descriptionBasement: Description[] = [];
  descriptionUpholstery: Description[] = [];
  descriptionStripping: Description[] = [];
  descriptionPressureWashing: Description[] = [];
  descriptionOther: Description[] = [];
  carpetOptGroup: boolean = false;
  carpetCleaning: boolean = false;
  janitorial: boolean = false;
  groutCleaning: boolean = false;
  upholstery: boolean = false;
  floods: boolean = false;
  basement: boolean = false;
  stripping: boolean = false;
  pressureWashing: boolean = false;
  other: boolean = false;
  descriptionBool: boolean = false;
  @ViewChild('matSelectCarpet') matSelectCarpet;
  @ViewChild('matSelectJanitorial') matSelectJanitorial;
  @ViewChild('matSelectRestoration') matSelectRestoration;
  @ViewChild('matSelectUpholstery') matSelectUpholstery;
  @ViewChild('matSelectBasement') matSelectBasement;
  @ViewChild('matSelectStripping') matSelectStripping;
  @ViewChild('matSelectPressureWash') matSelectPressureWash;
  @ViewChild('matSelectTile') matSelectTile;

  @ViewChild('textareaSelectJob') textareaSelectJob: ElementRef;
  textAreaValue: string = '';
  aptNumber: string[] = [];
// for Input value when clicking mat-select options
  @ViewChild('matOptionCarpet') matOptionCarpet;
  @ViewChild('matOptionJanitorialJob') matOptionJanitorialJob;
  @ViewChild('matOptionTileJob') matOptionTileJob;
  @ViewChild('matOptionUpholsteryJob') matOptionUpholsteryJob;
  @ViewChild('matOptionRestorationJob') matOptionRestorationJob;
  @ViewChild('matOptionBasementJob') matOptionBasementJob;
  @ViewChild('matOptionStrippingJob') matOptionStrippingJob;

  @ViewChild('matOptionCarpetJob') matOptionCarpetJob;
  @ViewChild('matOptionPressureWashJob') matOptionPressureWashJob;
  
  @ViewChild('aptTypedInWork') aptTypedInWork: QueryList<ElementRef>;
  @ViewChildren('aptCarpet') aptCarpet: QueryList<ElementRef>;
  @ViewChildren( 'aptJanitorial') aptJanitorial: QueryList<ElementRef>;
  @ViewChildren( 'aptGrout') aptGrout: QueryList<ElementRef>;
  @ViewChildren( 'aptUpholstery') aptUpholstery: QueryList<ElementRef>;
  @ViewChildren( 'aptRestoration') aptRestoration: QueryList<ElementRef>;
  @ViewChildren( 'aptCementBasement') aptCementBasement: QueryList<ElementRef>;
  @ViewChildren( 'aptStrippingWax') aptStrippingWax: QueryList<ElementRef>;
  @ViewChildren( 'aptPressureWash') aptPressureWash: QueryList<ElementRef>;
  @ViewChildren( 'aptOther') aptOther: QueryList<ElementRef>;
  carpetwork: WorkType[] = [
                            {name: '1 bedroom Apartment', quantity: null, price: null},
                            {name: '2 bedroom Apartment', quantity: null, price: null},
                            {name: '3 bedroom Apartment', quantity: null, price: null},
                            {name: '4 bedroom Apartment', quantity: null, price: null},
                            {name: 'Room 50x50 or smaller', quantity: null, price: null },
                            {name: 'Room larger than 50x50', quantity: null, price: null },
                            {name: 'Set of Stairs', quantity: null, price: null },
                          ];
  janitorialwork: WorkType[] = [
                            {name: '1 bedroom Apartment', quantity: null, price: null },
                            {name: '2 bedroom Apartment', quantity: null, price: null },
                            {name: '3 bedroom Apartment', quantity: null, price: null },
                            {name: '4 bedroom Apartment', quantity: null, price: null },
                            {name: 'house', quantity: null, price: null },
                            {name: 'Windows', quantity: null, price: null },
                            {name: 'Bathrooms', quantity: null, price: null },
                            {name: 'Touch Up', quantity: null, price: null },
                            {name: 'Kitchens', quantity: null, price: null },
                            {name: 'Ceiling Fans', quantity: null, price: null },
                            {name: 'Basement', quantity: null, price: null },
                            {name: 'Rooms', quantity: null, price: null },
                          ];
  floorWork: WorkType[] = [{name: 'Rooms Grout Cleaning', quantity: null, price: null},
                            {name: 'Rooms Surface Cleaning', quantity: null, price: null}  
                          ];
  upholsteryCleaning: WorkType[] = [
                            {name: 'Chair', quantity: null, price: null },
                            {name: 'Reclyner', quantity: null, price: null },
                            {name: 'Love Seat', quantity: null, price: null },
                            {name: 'Couch', quantity: null, price: null },
                            {name: 'Sectional', quantity: null, price: null },
                            {name: 'Pillows', quantity: null, price: null },
                            {name: 'Car', quantity: null, price: null } 
                          ];
  restoration: WorkType[] = [{name: 'Water Extraction', quantity: null, price: null},
                            {name: 'Microban Spray', quantity: null, price: null}, 
                            {name: 'Deoderizer Spray', quantity: null, price: null}, 
                            {name: 'Blower', quantity: null, price: null},
                            {name: 'Dehumidifier', quantity: null, price: null},
                            {name: 'Carpet Removal', quantity: null, price: null}
                          ];
  strippingWaxing: WorkType[] = [{name: 'Kitchen'},  {name: 'Laundry Room'}, {name: 'regular room 50x50'}, {name: 'large room(larger than 50x50)'}];
  cementbasement: WorkType[] = [{name: 'Full Size'},  {name: 'Half Size'}];
  pressureWash: WorkType[] = [{name: 'One Level Home'},  {name: 'Two Level Home'}, {name: 'Three Level Home'}, {name: 'One Side One Level'}, {name: 'Two Sides One Level'}, {name: 'Three Sides One Level'}, {name: 'One Side Two Levels'}, {name: 'One Side Three Levels'}, {name: 'Two Sides One Level'}, {name: 'Two Sides Two Levels'}, {name: 'Two Sides Three Levels'}, {name: 'Three Sides One Level'}, {name: 'Three Sides Two Levels'}, {name: 'One Sides Three Levels'}];
  jobTypes: WorkType[] = [];
  types: WorkType[ ]= [{name: 'Carpet Cleaning'}, { name: 'Janitorial'}, {name: 'Tile Cleaning'}, {name: 'Upholstery Cleaning'}, {name: 'Flood Restoration'}, {name: 'Cement Basement'}, {name: 'Stripping & Waxing'}, {name: 'Pressure Washing'}, {name: 'Other'}];
  //-------------------------------Forms --------------------------------------------- 
  
  
  janitorialForm = new FormGroup({
    rooms: new FormControl(''),
    windows: new FormControl(''),
    bathrooms: new FormControl(''),
    touchUp: new FormControl(''),
    kitchens: new FormControl(''),
    ceilingFans: new FormControl(''),
    regRoom: new FormControl(''),
    masterRoom: new FormControl(''),
    setOfStairs: new FormControl(''),
    chair: new FormControl(''),
    reclyner: new FormControl(''),
    loveSeat: new FormControl(''),
    couch: new FormControl(''),
    sectional: new FormControl(''),
    pillows: new FormControl(''),
    car: new FormControl('')

  });

  carpetCleaningForm = new FormGroup({
    regRoom: new FormControl(''),
    masterRoom: new FormControl(''),
    stairs: new FormControl(''),
    chair: new FormControl(''),
    reclyner: new FormControl(''),
    loveSeat: new FormControl(''),
    couch: new FormControl(''),
    sectional: new FormControl(''),
    pillows: new FormControl(''),
    car: new FormControl('')
  });
  

  typeControl = new FormControl(this.jobTypes[1]);
  addJobForm = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    type: this.typeControl,
    quantity: new FormControl(''),
    rate: new FormControl(''),
    amount: new FormControl(''),
    phoneNumber: new FormControl('', Validators.required)
  });

  //------------------------------ end Forms--------------------------------------------

  numbers: number[] = [1,2,3,4,5,6];
  number: number;
  
  constructor(private myElement: ElementRef,
     private calendarService: CalendarService,
     fb: FormBuilder
     ) {
      }

  ngOnInit(): void {
  }
  addCarpetAptNum(number, index, inputValue) {
    this.carpetTypeArray = this.carpetTypeArray.map(type => {
      if(type.quantity == number && type.index == index) {
          type = {
            name:  type.name, 
            quantity: number,
            index: index,
            aptNumber: inputValue
          }
          return type;
        } else {
          type = type
          return type;
          
        }
      })
      this.janitorialTypeArray = this.janitorialTypeArray.map(type => {
        if(type.quantity == number && type.index == index) {
          type = {
            name:  type.name, 
            quantity: number,
            index: index,
            aptNumber: inputValue
          }
          return type;
        } else {
          type = type
          return type;
          
        }
    })
    this.tileTypeArray = this.tileTypeArray.map(type => {
      if(type.quantity == number && type.index == index) {
        type = {
          name:  type.name, 
          quantity: number,
          index: index,
          aptNumber: inputValue
        }
        return type;
      } else {
        type = type
        return type;
        
      }
    })
    this.upholsteryTypeArray =  this.upholsteryTypeArray.map(type => {
      if(type.quantity == number && type.index == index) {
        type = {
          name:  type.name, 
          quantity: number,
          index: index,
          aptNumber: inputValue
        }
        return type;
      } else {
        type = type
        return type;
        
      }
    })
    this.restorationTypeArray = this.restorationTypeArray.map(type => {
      if(type.quantity == number && type.index == index) {
        type = {
          name:  type.name, 
          quantity: number,
          index: index,
          aptNumber: inputValue
        }
        return type;
      } else {
        type = type
        return type;
        
      }
    })
    this.pressureWashingTypeArray = this.pressureWashingTypeArray.map(type => {
      if(type.quantity == number && type.index == index) {
        type = {
          name:  type.name, 
          quantity: number,
          index: index,
          aptNumber: inputValue
        }
        return type;
      } else {
        type = type
        return type;
        
      }
    })
    this.cementBasementTypeArray = this.cementBasementTypeArray.map(type => {
      if(type.quantity == number && type.index == index) {
        type = {
          name:  type.name, 
          quantity: number,
          index: index,
          aptNumber: inputValue
        }
        return type;
      } else {
        type = type
        return type;
        
      }
    })
    this.strippingWaxingTypeArray = this.strippingWaxingTypeArray.map(type => {
      if(type.quantity == number && type.index == index) {
        type = {
          name:  type.name, 
          quantity: number,
          index: index,
          aptNumber: inputValue
        } 
        return type;
      } else {
        type = type
        return type;
        
      }
    })
  }
  textAreaEmpty(){
    if (this.textAreaValue != '') {
    }
  }
  getWorkType(workType: string, number: number) {
  }
  jobType(selected: boolean, jobTypeName: string){
    this.jobTypeName = jobTypeName;
    switch (this.jobTypeName){
      case 'Carpet Cleaning':
        if(selected) {
          this.matSelectCarpet.open();
          this.carpetOptGroup = true;
        } else {
          this.matSelectCarpet.close();
          this.carpetOptGroup = false;
        }
      break 
      case 'Janitorial' :
        if(selected) {
          this.matSelectJanitorial.open();
        } else {
          this.matSelectJanitorial.close();
        }
        break
      case 'Upholstery Cleaning' :
        if(selected) {
          this.matSelectUpholstery.open();
        } else {
          this.matSelectUpholstery.close();
        }
        break
      case 'Tile Cleaning':
        if(selected) {
          this.matSelectTile.open();
        } else {
          this.matSelectTile.close();
        }
        break
      case 'Flood Restoration':
        if(selected) {
          this.matSelectRestoration.open();
        } else {
          this.matSelectRestoration.close();
        }
        break
      case 'Cement Basement':
        if(selected) {
          this.matSelectBasement.open();
        } else {
          this.matSelectBasement.close();
        }      
        break
      case 'Stripping & Waxing':
        if(selected) {
          this.matSelectStripping.open();
        } else {
          this.matSelectStripping.close();
        }        
        break
      case 'Pressure Washing':
        if(selected) {
          this.matSelectPressureWash.open();
        } else {
          this.matSelectPressureWash.close();
        } 
        break
      case 'Other':
        this.matSelectTile = true;
        break
    }  
  }
  type(event: Event){
    console.log('type event', event);
    // event = this.numberBool;
  }
  closeServicesChosen() {
    if(this.turnGreen) {      
      this.descriptionCarpet = [];
      this.carpetTypeArray = [];
      this.otherTypeArray = [];
      this.buildcarpeTypeArray = [];
      this.janitorialTypeArray = [];
      this.descriptionJanitorial = [];
      this.decriptionTypeIn = '';
      this.descriptionUpholstery = [];
      this.upholsteryTypeArray = [];
      this.descriptionTile = [];
      this.tileTypeArray = [];
      this.descriptionRestoration = [];
      this.restorationTypeArray = [];
      this.cementBasementTypeArray = [];
      this.descriptionBasement = [];
      this.descriptionStripping = [];
      this.strippingWaxingTypeArray = [];
      this.descriptionPressureWashing = [];
      this.pressureWashingTypeArray = [];
      this.descriptionBool = false;
      this.turnGreen = false;
    }
    this.descriptionBool = false;
  }
  closeNumbers() {
    this.num = false;
  }
  createDescription(jobType: string, type: string, quantity: number, selected: boolean, index) {
    if(this.turnGreen) {
      this.turnGreen = false;      
      this.descriptionCarpet = [];
      this.otherTypeArray = [];
      this.carpetTypeArray = [];
      this.buildcarpeTypeArray = [];
      this.janitorialTypeArray = [];
      this.descriptionJanitorial = [];
      this.decriptionTypeIn = '';
      this.descriptionUpholstery = [];
      this.upholsteryTypeArray = [];
      this.descriptionTile = [];
      this.tileTypeArray = [];
      this.descriptionRestoration = [];
      this.restorationTypeArray = [];
      this.cementBasementTypeArray = [];
      this.descriptionBasement = [];
      this.descriptionStripping = [];
      this.strippingWaxingTypeArray = [];
      this.descriptionPressureWashing = [];
      this.pressureWashingTypeArray = [];
      this.descriptionBool = false;
    }
    this.descriptionBool = true;
    switch (this.jobTypeName){
      case 'Carpet Cleaning':
        if(selected){
            const items = {name: jobType, description: type, quantity: quantity, index: index}
              this.buildcarpeTypeArray.push(type)
              this.descriptionCarpet.push(items);
              this.carpetTypeArray.push({name: type, quantity: quantity, index: index});
          } else {
            const items = {name: jobType, description: type, quantity: quantity}
            this.descriptionCarpet = this.descriptionCarpet.filter(array => !(array.quantity == items.quantity && array.description == items.description));
            this.carpetTypeArray = this.carpetTypeArray.filter(array => array.name !== type);
          }
          break
        case 'Janitorial':
          if(selected){
            const items = {name: jobType, description: type, quantity: quantity, index: index}
              this.janitorialTypeArray.push({name: type, quantity: quantity, index: index});
              const obj = {name: 'Janitorial', type: this.janitorialTypeArray, quantity: quantity, price: null}
              this.descriptionJanitorial.push(items)
              
            } else {
              const items = {name: jobType, description: type, quantity: quantity}
              this.descriptionJanitorial = this.descriptionJanitorial.filter(array =>  !(array.quantity == items.quantity && array.description == items.description));
              this.janitorialTypeArray = this.janitorialTypeArray.filter(array => (array.name == type));
            }
          break
        case 'Upholstery Cleaning':
          if(selected){
            const items = {name: jobType, description: type, quantity: quantity, index: index}
              this.upholsteryTypeArray.push({name: type, quantity: quantity, index: index});
              const obj = {name: 'Upholstery Cleaning', type: this.upholsteryTypeArray, quantity: quantity, price: null}
              this.descriptionUpholstery.push(items)
            } else {
              const items = {name: jobType, description: type, quantity: quantity}
              this.descriptionUpholstery = this.descriptionUpholstery.filter(array =>  !(array.quantity == items.quantity && array.description == items.description));
              this.upholsteryTypeArray = this.upholsteryTypeArray.filter(array => (array.name == type));
            }
          break
        case 'Tile Cleaning':
          if(selected){
            const items = {name: jobType, description: type, quantity: quantity, index: index}
              this.descriptionTile.push(items)
              this.tileTypeArray.push({name: type, quantity: quantity, index: index});
              const obj = {name: 'Tile Cleaning', type: this.tileTypeArray, quantity: quantity, price: null}
            } else {
              const items = {name: jobType, description: type, quantity: quantity}
              this.descriptionTile = this.descriptionTile.filter(array => !(array.quantity == items.quantity && array.description == items.description));
              this.tileTypeArray = this.tileTypeArray.filter(array => !(array.name == type));
            }
          break
        case 'Flood Restoration':
          if(selected){
            const items = {name: jobType, description: type, quantity: quantity, index: index}
            this.descriptionRestoration.push(items);
            this.restorationTypeArray.push({name: type, quantity: quantity, index: index});
            const obj = {name: 'Flood Restoration', type: this.restorationTypeArray, quantity: quantity, price: null}         
        } else {
          const items = {name: jobType, description: type, quantity: quantity}
          this.descriptionRestoration = this.descriptionRestoration.filter(array => !(array.quantity == items.quantity && array.description == items.description));
          this.restorationTypeArray = this.restorationTypeArray.filter(array => !(array.name == type));
        }          
          break
        case 'Cement Basement':
          if(selected){ 
            const items = {name: jobType, description: type, quantity: quantity, index: index}
            this.descriptionBasement.push(items);
            this.cementBasementTypeArray.push({name: type, quantity: quantity, index: index});
            const obj = {name: 'Cement Basement', type: this.cementBasementTypeArray, quantity: quantity, price: null}
        } else {
          const items = {name: jobType, description: type, quantity: quantity}
          this.descriptionBasement = this.descriptionBasement.filter(array => !(array.quantity == items.quantity && array.description == items.description));
          this.cementBasementTypeArray = this.cementBasementTypeArray.filter(array => !(array.name == type));
        }
          break
        case 'Stripping & Waxing':
          if(selected){ 
            const items = {name: jobType, description: type, quantity: quantity, index: index}
            this.descriptionStripping.push(items);
            this.strippingWaxingTypeArray.push({name: type, quantity: quantity, index: index});
            const obj = {name: 'Stripping & Waxing', type: this.strippingWaxingTypeArray, quantity: quantity, price: null}
        } else {
          const items = {name: jobType, description: type, quantity: quantity}
          this.descriptionStripping = this.descriptionStripping.filter(array => !(array.quantity == items.quantity && array.description == items.description));
          this.strippingWaxingTypeArray = this.strippingWaxingTypeArray.filter(array => !(array.name == type));
        }
          break
        case 'Pressure Washing':
          if(selected){
            const items = {name: jobType, description: type, quantity: quantity, index: index}
            this.descriptionPressureWashing.push(items);
            this.pressureWashingTypeArray.push({name: type, quantity: quantity, index: index});
            const obj = {name: 'Pressure Washing', type: this.pressureWashingTypeArray, quantity: quantity, price: null}
        } else {
          const items = {name: jobType, description: type, quantity: quantity}
          this.descriptionPressureWashing = this.descriptionPressureWashing.filter(array => !(array.quantity == items.quantity && array.description == items.description));
          this.pressureWashingTypeArray = this.pressureWashingTypeArray.filter(array => !(array.name == type));
        }
          break
        case 'Other':
          const items = {name: jobType, description: type, quantity: quantity}
          this.descriptionOther.push(items)
          break
      }
      this.num = true;
  }
  closeMenu() {
    this.num = false;
  }

  jobtypeEl(typeEl: string) {
    this.typeName = typeEl;
    this.num = false;
    switch(typeEl) {
      case 'Carpet Cleaning':
      this.jobTypes = this.carpetwork;
      break;
    }
    switch(typeEl) {
      case 'Janitorial':
        this.jobTypes = this.janitorialwork;
        break;
    }
    switch(typeEl) {
      case 'Cement Basement':
        this.jobTypes = this.cementbasement;
        break;
    }
  }
  private formatDate(timestamp: number): string {
    const date = new Date(+timestamp);
    const offset = date.getTimezoneOffset();
    if (offset < 0) {
        date.setHours(12,0,0);
  }
return date.toISOString().substring(0,10); 
  }
  showAlert() : void {
    this.isVisible = true;
    setTimeout(()=> this.isVisible = false,2500); // hide the alert after 2.5s
  }
  uncheckAll() {
    this.matOptionCarpet.MatOption.forEach((item: MatOption) => item.deselect());
    this.matOptionTileJob.MatOption.forEach((item: MatOption) => item.deselect());
    this.matOptionUpholsteryJob.MatOption.forEach((item: MatOption) => item.deselect());
    this.matOptionRestorationJob.MatOption.forEach((item: MatOption) => item.deselect());
    this.matOptionBasementJob.MatOption.forEach((item: MatOption) => item.deselect());
    this.matOptionStrippingJob.MatOption.forEach((item: MatOption) => item.deselect());
    this.matOptionPressureWashJob.MatOption.forEach((item: MatOption) => item.deselect());
  }
  submit() {
    this.checkCircle = false;
    let smsMsg = ('A new job has been added for' + '  '  + this.dateStart + ': ');
    console.log('textareaSelectJob', this.textareaSelectJob.nativeElement.value)
    this.otherArray = {name: 'User Typed Services', type: this.otherTypeArray},
    this.carpetArray = {name: 'Carpet Cleaning', type: this.carpetTypeArray}
    this.janitorialArray = {name: 'Janitorial', type: this.janitorialTypeArray}
    this.restorationArray = {name: 'Flood Restoration', type: this.restorationTypeArray}
    this.tileArray = {name: 'Tile Cleaning', type: this.tileTypeArray}
    this.upholsteryArray = {name: 'Upholstery Cleaning', type: this.upholsteryTypeArray}
    this.cementBasementArray = {name: 'Cement Basement', type: this.cementBasementTypeArray}
    this.strippingWaxingArray = {name: 'Stripping & Waxing', type: this.strippingWaxingTypeArray}
    this.pressureWashingArray = {name: 'Pressure Washing', type: this.pressureWashingTypeArray}
    const allWork = [];
    if(this.textAreaValue != ''){
      console.log('in typed in if statement ', this.textareaSelectJob.nativeElement.value);
      this.buildcarpeTypeArray.push('Typed in job decription')
      this.descriptionCarpet.push(this.textareaSelectJob.nativeElement.value);
      this.typedInWork.push({name: 'Typed in description of Work', quantity: 1});
      console.log('type in work', this.typedInWork)
      this.decriptionTypeIn = this.textareaSelectJob.nativeElement.value;
      allWork.push(this.textareaSelectJob.nativeElement.value);
      smsMsg = (smsMsg + this.textAreaValue)
  }
    if(this.carpetArray.type.length > 0) {
      allWork.push(this.carpetArray);
    }
    if(this.janitorialArray.type.length > 0) {
      allWork.push(this.janitorialArray);
    }
    if(this.restorationArray.type.length > 0) {
      allWork.push(this.restorationArray);
    }
    if(this.tileArray.type.length > 0) {
      allWork.push(this.tileArray);
    }
    if(this.cementBasementArray.type.length > 0) {
      allWork.push(this.cementBasementArray);
    }
    if(this.strippingWaxingArray.type.length > 0) {
      allWork.push(this.strippingWaxingArray);
    }
    if(this.pressureWashingArray.type.length > 0) {
      allWork.push(this.pressureWashingArray);
    }
    if (this.textAreaValue != '') {
    }
      const ds = new Date(this.dateStart).toISOString();
    const de = new Date(this.dateStart).toISOString();

    let job = {
      date: {
        startDate: ds,
        endDate: de
      }, 
      dateRange: this.dateRangeList,
      email: this.addJobForm.value.email,
      company: this.addJobForm.value.name,
      address: this.addJobForm.value.address,
      type: allWork,
      phone: this.addJobForm.value.phoneNumber,
      smsMsg: smsMsg,
      aptNumber: this.aptNumber
    }
    job.type.forEach(item => smsMsg = (smsMsg + '-' + item.name));
    job = {
      date: {
        startDate: ds,
        endDate: de
      }, 
      dateRange: this.dateRangeList,
      email: this.addJobForm.value.email,
      company: this.addJobForm.value.name,
      address: this.addJobForm.value.address,
      type: allWork,
      phone: this.addJobForm.value.phoneNumber,
      smsMsg: smsMsg,
      aptNumber: this.aptNumber
    }
    this.jobList.push(job);
    this.addJobForm.reset();
    this.matSelectCarpet.value = null;
    this.matSelectJanitorial.value = null;
    this.matSelectRestoration.value = null;
    this.matSelectBasement.value = null;
    this.matSelectStripping.value = null;
    this.matSelectPressureWash.value = null;
    this.matSelectTile.value = null;
    this.matSelectUpholstery.value = null;
    this.aptNumber = [];
    this.calendarService.getJobList();
    this.allJobsBool = false;
    this.isDateSelected.emit(false);
    this.todayJobsBool = false;
    this.CompletedJobsBool = false;
    this.turnGreen = true;
    this.descriptionBool = true; 
    this.calendarService.addToJobList(job);
  }

  scrollToJobs(){
    // this.myElement.nativeElement.ownerDocument.getElementById('timeFrame').scrollIntoView({behavior: 'smooth'});
  }

}
