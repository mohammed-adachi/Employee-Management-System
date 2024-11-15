import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { AppComponent } from './app.component';
import { EmployeeService } from './service/employee.service';
import { AuthInterceptor } from './auth.interceptor'; // Import the AuthInterceptor class

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgIf,
    NgbModule
  ],
  declarations: [
    AppComponent,
    HttpClientModule,
    EmployeeDetailComponent,
    EmployeeFormComponent,
    EmployeesComponent,
    CommonModule,
  ],
  providers: [
    EmployeeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ,[provideHttpClient(withFetch())]
  ],

  bootstrap: [AppComponent]

})
export class AppModule { }
