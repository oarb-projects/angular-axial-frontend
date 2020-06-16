import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { SellersService } from '../../services/vendedor.service';

// models
import {User} from '../../Models/User';
import {UserEditViewModel} from '../../Models/UserEditViewModel';

export interface UserObj {
  userId: string;
  companyId: string;
}
export interface ParamMap {
  keys: string[]
  has(name: string): boolean
  get(name: string): string | null
  getAll(name: string): string[]
}
@Component({
  selector: 'app-vendedor-editar',
  templateUrl: './vendedor-editar.component.html',
  styleUrls: ['./vendedor-editar.component.scss']
})

export class VendedorEditarComponent implements OnInit {
  public buttonAction = 'Editar';
  public title = 'Editando';
  userObj: UserObj;
  userId: string;
  user: User;
  informationAvailable = false;

  constructor(
  private activatedroute: ActivatedRoute,
  private sellerService: SellersService,
  private router: Router) { }

  ngOnInit(): void {
    this.userId = this.activatedroute.snapshot.queryParamMap.get('userId');
    this.sellerService.getUser(this.userId).subscribe((user) => {
      console.log('Seller Information received from server');
      console.log(user);
      this.user = user;
      this.informationAvailable = true;
    });
  }

  onClicked(user: UserEditViewModel){
    const treatedUser = {
      ...this.user,
      usu_apellido: user.apellido,
      usu_correo: user.correo,
      usu_nombre: user.nombre,
      usu_pagina_web: user.paginaWeb,
      usu_telefono_oficina: user.telefonoOficina,
      usu_telefono_personal: user.telefonoPersonal
    };
    this.sellerService.editUser(this.userId, treatedUser).subscribe((receivedUser) => {
      console.log('Updated User received from server');
      console.log(receivedUser);
      if (receivedUser.usu_activo === 1) {
        this.router.navigate(['sellers']);
      }
    });
  }

  // For Put Request trials
  redirectToUpdate() {
    const sentUser = {
      ...this.user,
      usu_nombre: 'cambionombre2',
      usu_apellido: 'cambioapellido2'
    };
    this.sellerService.editUser(this.userId, sentUser).subscribe((user) => {
        if (user.usu_activo === 1) {
          this.router.navigate(['sellers']);
        }
    });
  }
}
