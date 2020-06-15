import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../../services/authentication.service'
import { ValidatorFn, ValidationErrors, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({    
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})

export class RegistrarComponent {
  public registerForm: FormGroup;
  public esIndependiente: boolean;
    
  credentials: TokenPayload = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    nombreCompania: '',
    telefonoPersonal: '',
    telefonoOficina: '',
    paginaWeb: ''
  }

  constructor(private location: Location, private auth: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      correo: ['', [Validators.maxLength(250), Validators.pattern(/.+@.+\..+/)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      password2: [''],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      nombreCompania: ['', [Validators.required, Validators.maxLength(20)]],      
      telefonoPersonal: ['', [Validators.required, Validators.maxLength(20)]],
      telefonoOficina: ['', [Validators.maxLength(20)]],
      paginaWeb: ['', [Validators.maxLength(100)]]
    });

    this.registerForm.setValidators(this.checkPasswords());    
  }

  checkPasswords() : ValidatorFn { // here we have the 'passwords' group
    return (group: FormGroup): ValidationErrors => {
      const control1 = group.controls['password'];
      const control2 = group.controls['password2'];
      if (control1.value !== control2.value) {
        control2.setErrors({notEquivalent: true});
      } else {
        control2.setErrors(null);
      }
      return;
    };     
  }

  ngOnInit() {
    this.esIndependiente = true;
  }

  onValChange(value: string){
    if(value == 'Independiente')
      this.esIndependiente = true;
    else 
      this.esIndependiente = false;    
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public resgistroUsuario = (registerFormValue) => {
    if (this.registerForm.valid) {
      this.executeResgistroUsuario(registerFormValue);
    }
  }

  

  private executeResgistroUsuario = (registerFormValue) => {
    this.credentials = {
      id: 0,
      nombre: registerFormValue.nombre,
      apellido: registerFormValue.apellido,
      correo: registerFormValue.correo,
      password: registerFormValue.password,
      nombreCompania: registerFormValue.nombreCompania,
      telefonoPersonal: registerFormValue.telefonoPersonal.replace('(', '').replace(')', '').replace('(', '').replace(')', '').replace('-', ''),
      telefonoOficina: registerFormValue.telefonoOficina.replace('(', '').replace(')', '').replace('(', '').replace(')', '').replace('-', ''),
      paginaWeb: registerFormValue.paginaWeb
    }

    console.log(this.credentials);

    this.auth.register(this.credentials).subscribe(
      result => {
        if(this.auth.isLoggedIn())
          this.router.navigateByUrl('');
        else
          alert(result.error);
      },
      err => {
        console.log(err);
      }
    )
  }
}