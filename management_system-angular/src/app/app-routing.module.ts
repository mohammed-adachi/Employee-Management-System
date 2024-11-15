import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';



const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'employee/:id', component: EmployeeDetailComponent },
  { path: 'employee-form', component: EmployeeFormComponent },
  {path:'employer-update/:id',component:EmployeeUpdateComponent},
  {path:'details-of-employee/:id' ,component:EmployeeDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),[CommonModule]],
  exports: [RouterModule]
})
export class AppRoutingModule { }
