import { Paymentinformation } from '../models/paymentinformation';
import { Servicerequest } from '../models/servicerequest';

export class Requestcomplete {
    request: Servicerequest;
    paymentInfo: Paymentinformation;
}
