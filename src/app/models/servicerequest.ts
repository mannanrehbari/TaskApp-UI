export class Servicerequest {
    id: number;

    // not at the time creation
    trackingId: string;
    assignedTaskerId: number;
    seekerEmail: string;
    reqLat: string;
    reqLng: string;

    // input from creation component
    firstName: string;
    lastName: string;
    seekerPhone: string;
    address: string;
    details: string;
    serviceTypeId: number;
    locationId: number;
    requestStatus: any
    requestDate: Date



    //dates
    createdDateTime: Date
    assignedTime: Date;
    assignedTimeDisplay: any;
}
