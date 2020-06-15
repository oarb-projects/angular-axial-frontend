import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../../services/authentication.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router'

@Component({    
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public loginForm: FormGroup;

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

  constructor(private location: Location, private auth: AuthenticationService, private router: Router) {}

  /*login() {
    console.log(this.credentials);
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      err => {
        console.log(err);
      }
    )
  }*/

  ngOnInit() {
    this.loginForm = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public loginUsuario = (loginFormValue) => {
    if (this.loginForm.valid) {
      this.executeLoginUsuario(loginFormValue);
    }
  }

  private executeLoginUsuario = (loginFormValue) => {
    this.credentials = {
      id: 0,
      nombre: '',
      apellido: '',
      correo: loginFormValue.correo,
      password: loginFormValue.password,
      nombreCompania: '',
      telefonoPersonal: '',
      telefonoOficina: '',
      paginaWeb: ''
    }
 
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('');
      },
      err => {
        console.log(err);
      }
    )
  }
}