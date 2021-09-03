import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from './app.models';

@Injectable({
  providedIn: 'root',
})
export class MeetingPlannerService {

  constructor(private http : HttpClient) { }

  getAvailableRoom(reservation : Reservation){
    return this.http.post("http://localhost:8080/api/meetingPlanner/rooms",reservation);
  }

}