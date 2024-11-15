import { DatePipe } from '@angular/common';

export class Employee {
    id!: number;
    name!: string;
    salaire!: number;
    post: string;
    phone!: string;
    address!: string;
    email!: string;
    action!: string;;

  constructor() {
     this.id = 0;
     this.name = "";
     this.salaire = 0;
      this.post = "";
      this.phone = "";
      this.email = "@gmail.com";
      this.address = "";
      this.action = "";

    // // this.fname="";
    // this.lname="
    // this.joiningDate = new Date();
  //  // Set the default date value
  //  const today = new Date();
  //  const year = today.getFullYear();
  //  const month = ('0' + (today.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
  //  const day = ('0' + today.getDate()).slice(-2);

  //  this.joiningDate = `${year}-${month}-${day}`;
}}
