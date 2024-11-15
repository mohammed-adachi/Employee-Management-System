import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../service/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  employees: Employee[];
  EnteredID!:number;

  constructor(private employeeService: EmployeeService,  private router: Router) {
    this.employees=[];

   }

  ngOnInit(): void {

     //this.employees = [
       //{
         //"id": 1, name: 'John', post: 'post', salaire: 50000, adress: 'IT', phone: 'Developer',
        // action: 'action'
       //},

     //];

    this.getEmployees();
  }


 // goToEmployee(){


   // console.log(this.EnteredID);
    //this.router.navigate(['details-of-employee',this.EnteredID]);
 // }

  getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {this.employees = data;});
console.log(this.employeeService.getEmployeesList());

  }

  updateEmployee(id: number){
    this.router.navigate(['employer-update', id]);
  }
  deleteEmployee(id: number){

    if(confirm("Are you sure to delete Employee ID: "+id)){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })}
  }

  detailsOfEmployee(id: number){
    this.router.navigate(['details-of-employee', id]);
  }

  navigateToEmployeeForm() {
    this.router.navigate(['/employee-form']);
  }

}
