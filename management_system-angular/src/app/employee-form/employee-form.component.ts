import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  registerForm!: FormGroup
  formResult: string = "";

  constructor(
    private service: EmployeeService,
    private fb: FormBuilder
  ) { }





  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      post: ['', Validators.required],
      salaire: ['', Validators.required, Validators.pattern("^[0-9]*$")],
      action: ['', Validators.required],
      address: ['', Validators.required],
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)  // Validation pour un numéro de téléphone à 10 chiffres
      ])
    });


}
submitForm() {
  console.log("salam")

    const formValues = this.registerForm.value;
    console.log(formValues)
    // L'objet JavaScript

    // Options HTTP avec en-tête Content-Type
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  this.service.register(
    formValues, httpOptions
  ).subscribe({
    next: (response) => {
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

}



/*
console.log("Formulaire valide :", this.registerForm.value);
// Vous pouvez envoyer les données via le service
// Ex : this.service.addEmployee(this.registerForm.value).subscribe(...)
this.formResult = "Enregistrement réussi.";
this.service.registers(userData).subscribe(
  response => {
    console.log('Inscription réussie:', response);
  },
  error => {
    console.error('Erreur lors de l\'inscription:', error);
  }
);/*





*/
