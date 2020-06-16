import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ValidatorFn, ValidationErrors, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {User} from '../../Models/User';
import {UserEditViewModel} from '../../Models/UserEditViewModel';
import { SellersService } from '../../services/vendedor.service';


@Component({
  selector: 'app-vendedor-form',
  templateUrl: './vendedor-form.component.html',
  styleUrls: ['./vendedor-form.component.scss']
})


export class VendedorFormComponent implements OnInit {
  @Input() buttonAction: string;
  @Input() title: string;
  @Input() user: User;
  @Output() clicked = new EventEmitter<UserEditViewModel>();
  public registerForm: FormGroup;
  public registeredUser: User;
  public credentials: UserEditViewModel;
  public companyId = 1;

  constructor(
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private sellerService: SellersService) {
    this.registerForm = this.formBuilder.group({
      correo: ['', [Validators.maxLength(250), Validators.pattern(/.+@.+\..+/)]],
      // password: ['', [Validators.required, Validators.maxLength(20)]],
      // password2: [''],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      telefonoPersonal: ['', [Validators.required, Validators.maxLength(20)]],
      telefonoOficina: ['', [Validators.maxLength(20)]],
      paginaWeb: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    // here we update all form values
    this.registerForm.patchValue(
      {
        correo: this.user.usu_correo ? this.user.usu_correo : '',
        nombre: this.user.usu_nombre,
        apellido: this.user.usu_apellido,
        telefonoPersonal: this.user.usu_telefono_personal,
        telefonoOficina: this.user.usu_telefono_oficina,
        paginaWeb: this.user.usu_pagina_web
    });
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
      telefonoPersonal: registerFormValue.telefonoPersonal
      .replace('(', '').replace(')', '').replace('(', '').replace(')', '').replace('-', ''),
      telefonoOficina: registerFormValue.telefonoOficina
      .replace('(', '').replace(')', '').replace('(', '').replace(')', '').replace('-', ''),
      paginaWeb: registerFormValue.paginaWeb
    };

    this.clicked.emit(this.credentials);
  }

  public resgistroUsuario = (registerFormValue) => {
    if (this.registerForm.valid) {
      this.executeResgistroUsuario(registerFormValue);
    }
  }
}
