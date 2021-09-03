export interface Meeting{
    code : string;
    description : string;
}

export interface Reservation{
    nbPersons : number;
    meetingType : string;
    startSlot : string;
}