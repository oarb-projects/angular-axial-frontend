import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {Property} from '../../Models/Property'
import { ValidatorFn, ValidationErrors, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {InventarioService} from '../../services/inventario.service'

@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.component.html',
  styleUrls: ['./inventario-form.component.scss']
})
export class InventarioFormComponent implements OnInit {
  @Input() buttonAction: string;
  @Input() title: string;
  @Input() property: Property;
  @Output() clicked = new EventEmitter<Property>();
  public registerForm: FormGroup;
  public tipo: String
  public opcion: String

  constructor(private location: Location, private router: Router, private formBuilder: FormBuilder, private inventarioService: InventarioService) {
    this.registerForm = this.formBuilder.group({
      id_tipo_propiedad:['',[Validators.required]],
      id_tipo_negocio:['',[Validators.required]],
      tag: ['', [Validators.required, Validators.maxLength(50)]],
      ubicacion: ['', [Validators.required, Validators.maxLength(50)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(50)]],
      cantidad_recamaras:[0,[Validators.min(1)]],
      cantidad_banos:[0],
      cantidad_pisos:[0,[Validators.min(1)]],
      cuarto_lavado:[0],
      jardín:[0],
      nueva:[0],
      amueblado:[0],
      dimensiones: ['', [Validators.required, Validators.maxLength(50)]],
      referencias: ['', [Validators.required, Validators.maxLength(50)]],
      precio:[0,[Validators.min(1)]]
      // cantidad_autos:number;
    });
  }

  ngOnInit(): void {
      this.registerForm.patchValue(
        {
          ...this.property
      });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }


  private executeResgistroUsuario = (registerFormValue) => {
    console.log(registerFormValue);
    this.property=registerFormValue;
    this.clicked.emit(this.property);
  }
  
  public resgistroPropiedad = (registerFormValue) => {
    if (this.registerForm.valid) {
      this.executeResgistroUsuario(registerFormValue);
    }
  }
  

}
