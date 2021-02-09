export interface Order {
    id?:string;
    customer_name:string;
    customer_lastname:string;
    recipient_name:string;
    recipient_lastname:string;
    start:string;
    end:string;
    description:string;
    status?:string;
    user?:any;
    date: Date;
}