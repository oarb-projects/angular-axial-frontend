import { Component, OnInit } from '@angular/core';
import { ValidatorFn, ValidationErrors, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {User} from '../../Models/User';
import {UserRegister} from '../../Models/UserRegister';

import { SellersService } from '../../services/vendedor.service';

@Component({
  selector: 'app-vendedor-agregar',
  templateUrl: './vendedor-agregar.component.html',
  styleUrls: ['./vendedor-agregar.component.scss']
})
export class VendedorAgregarComponent implements OnInit {
  public registerForm: FormGroup;
  public registeredUser: User;
  public credentials: UserRegister;
  public companyId: number = 1;

  constructor(private location: Location, private router: Router, private formBuilder: FormBuilder, private sellerService: SellersService) {
    this.registerForm = this.formBuilder.group({
      correo: ['', [Validators.maxLength(250), Validators.pattern(/.+@.+\..+/)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      password2: [''],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      // nombreCompania: ['', [Validators.required, Validators.maxLength(20)]],
      telefonoPersonal: ['', [Validators.required, Validators.maxLength(20)]],
      telefonoOficina: ['', [Validators.maxLength(20)]],
      paginaWeb: ['', [Validators.maxLength(100)]]
    });
    this.registerForm.setValidators(this.checkPasswords());

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  private executeResgistroUsuario = (registerFormValue) => {
    this.credentials = {
      id: 0,
      companiaId: this.companyId,
      nombre: registerFormValue.nombre,
      apellido: registerFormValue.apellido,
      correo: registerFormValue.correo,
      password: registerFormValue.password,
      telefonoPersonal: registerFormValue.telefonoPersonal
      .replace('(', '').replace(')', '').replace('(', '').replace(')', '').replace('-', ''),
      telefonoOficina: registerFormValue.telefonoOficina
      .replace('(', '').replace(')', '').replace('(', '').replace(')', '').replace('-', ''),
      paginaWeb: registerFormValue.paginaWeb
    };

    this.sellerService.register(this.credentials).subscribe(
      result => {
        console.log('User returned by server');
        console.log(result);
        if (result.hasOwnProperty('detail')) {
          this.router.navigateByUrl('/sellers');
        }
      },
      err => {
        console.log('err');
        console.log(err);
      }
    );
  }

  public resgistroUsuario = (registerFormValue) => {
    if (this.registerForm.valid) {
      this.executeResgistroUsuario(registerFormValue);
    }
  }

  checkPasswords(): ValidatorFn { // here we have the 'passwords' group
    return (group: FormGroup): ValidationErrors => {
      const control1 = group.controls.password;
      const control2 = group.controls.password2;
      if (control1.value !== control2.value) {
        control2.setErrors({notEquivalent: true});
      } else {
        control2.setErrors(null);
      }
      return;
    };
  }

  ngOnInit(): void {
  }

}
