import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent  {
  id: number | undefined;
  employee!: Employee

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.id=0;
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    if (isNaN(this.id)) {
      // Handle the case where the id is not a valid number
      // For example, redirect to an error page or display an error message
      return;
    }

    this.employee = new Employee();
    this.employeeService.getEmployeeById(this.id).subscribe( data => {
      this.employee = data;
    });
  }

  goBack(): void {
    this.router.navigate(['']);
  }

}
