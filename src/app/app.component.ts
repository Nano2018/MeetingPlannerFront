import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meeting, Reservation } from './app.models';
import { MeetingPlannerService } from './meeting-planner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  noRoomAvailable : boolean = false;
  title = 'meetingPlanner';
  room : any = null;
  selectedSlot : number = 0;
  meetings : Meeting[] = [];
  slots : number[] = [];
  meetingPlannerForm : FormGroup = new FormGroup({});
  constructor(private fb : FormBuilder, private meetinPlannerService : MeetingPlannerService, private datePipe : DatePipe){

  }

  ngOnInit(){
    this.initForm();
    this.meetings = [
      {
        code : "VC",
        description : "visioconférences"
      },
      {
        code : "RC",
        description : "réunions couplées"
      },
      {
        code : "RS",
        description : "éunions simples"
      },
      {
        code : "SPEC",
        description : "séances de partage et d'études de cas"
      }
    ]

    for(let i=8; i<20; i++){
      this.slots.push(i);
    }

  }
  initForm(){
    this.meetingPlannerForm = this.fb.group({
      nbPersons : ['',Validators.required],
      meetingType : ['',Validators.required],
      slot : ['',Validators.required]
    })
  }

  checkForAvailableRoom(){

    let startSLot : any = this.datePipe.transform(new Date(this.meetingPlannerForm.controls.slot.value), 'yyyy-mm-dd')+`${this.selectedSlot}:00:00`
    let reservation : Reservation = {
      nbPersons : this.meetingPlannerForm.controls.nbPersons.value,
      meetingType : this.meetingPlannerForm.controls.meetingType.value,
      startSlot : startSLot
    }

    this.meetinPlannerService.getAvailableRoom(reservation).subscribe(_result=>{
        this.room = _result;
        setTimeout(()=>{
          this.room = null;
          this.initForm();
        },10000),

        (error:any) => {                            
          this.room = null;
          this.noRoomAvailable = true;
          setTimeout(()=>{
            this.room = null;
            this.initForm();
            this.noRoomAvailable = false;
          },10000)
        }
    })
  }
  
}
