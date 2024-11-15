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
    return this.http.get<Employee>(`${this.baseURL}/get/${id}`);
  }
  register(signRequest: any,httpOptions:any): Observable<any> {

    console.log(signRequest)
    return this.http.post("http://localhost:8083/api/employees/register", signRequest,httpOptions);
  }
  registers(signRequest: any): Observable<any> {
    console.log(signRequest)
    return this.http.post("http://localhost:8083/api/employees/register", signRequest);
  }
  updateEmployee(id: number, signRequest: any,httpOptions:any): Observable<any>{
    console.log(signRequest);
    return this.http.put(`${this.baseURLS}/updatee/${id}`,signRequest,httpOptions);
  }
  updateEmploye(id: number, signRequest: any): Observable<any>{
    console.log(signRequest);

    // Convertir en JSON (facultatif) mais s'assurer que le Content-Type est correct
    const data = JSON.stringify(signRequest);
    console.log(data);

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return this.http.put(`${this.baseURL}/updatee/${id}`,data,httpOptions);
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.http.delete(`${this.baseURL}/delete/${id}`);
  }
}
