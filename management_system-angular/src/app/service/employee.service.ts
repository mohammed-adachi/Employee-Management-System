import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  httpClient: any;

  private baseURL = "http://localhost:8083/api/employees";
  private baseURLS = "http://localhost:8083/api/employees/updatee";

  constructor(private http: HttpClient) {
  }

  getEmployeesList(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseURL}/employees`);
  }
  getEmployeeById(id: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.baseURL}/${id}`);
  }
  register(signRequest: any,httpOptions:any): Observable<any> {
    console.log(signRequest)
    return this.http.put("http://localhost:8083/api/employees/register", signRequest,httpOptions);
  }
  registers(signRequest: any): Observable<any> {
    console.log(signRequest)
    return this.http.post("http://localhost:8083/api/employees/register", signRequest);
  }
  updateEmployee(id: number, signRequest: any,httpOptions:any): Observable<any>{
    return this.http.put(`${this.baseURLS}/updatee/${id}`, signRequest,httpOptions);
  }
}
