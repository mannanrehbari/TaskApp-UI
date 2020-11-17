export class GlobalConstants {

    // public static SERVER_IP: string = "http://139.59.12.233";
    public static SERVER_IP: string = "http://localhost";

    public static SERVER_PORT: string = "9091";
    public static SERVER_ADDRESS: string = GlobalConstants.SERVER_IP + ':' + GlobalConstants.SERVER_PORT + '/';

    //api version prefix
    public static API_PREFIX: string = 'api/v1/';
    public static SERVER_V1_ADDRESS: string = GlobalConstants.SERVER_ADDRESS + GlobalConstants.API_PREFIX
    

}
