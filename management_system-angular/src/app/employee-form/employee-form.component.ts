import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
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
      salaire: ['', Validators.required],
      action: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]]
    });
    console.log("Form initialized:", this.registerForm);

}
submitForm() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();  // Marque tous les champs comme touchés
    this.formResult = "Veuillez remplir tous les champs requis.";
    return;  // Ne pas soumettre si le formulaire est invalide
  }

  console.log("Formulaire valide :", this.registerForm.value);
  // Vous pouvez envoyer les données via le service
  // Ex : this.service.addEmployee(this.registerForm.value).subscribe(...)
  this.formResult = "Enregistrement réussi.";
}







}
