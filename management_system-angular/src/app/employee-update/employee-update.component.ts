import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../employee';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent {
  updateForm!: FormGroup;
  formResult: string = "";

  id: number;
  employee: Employee = new Employee();


  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder

  ) {
      this.id=0
    }
    //loading the data into form
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    }, error => console.log(error));
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      post: ['', Validators.required],
      salaire: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    address: ['', Validators.required],
    });


  }

  onSubmit(){
    console.log("salam")

    const formValues = this.updateForm.value;
    console.log(formValues)
    // L'objet JavaScript

    // Options HTTP avec en-tête Content-Type
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  this.employeeService.updateEmployee(this.id,
    formValues, httpOptions
  ).subscribe({
    next: (response: any) => {
      console.log(response); // Vérifie la réponse
      if (response.name != null) {
        alert("Hello " + response.name);
      }
    },
    error: (error) => {
      console.error("Erreur lors de l'enregistrement :", error);
    },
    complete: () => {
      console.log("Souscription terminée.");
    }
  }
  )
}


  goToEmployeeList(){
    this.router.navigate(['/']);
  }


}
