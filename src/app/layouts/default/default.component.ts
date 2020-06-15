import { Component, OnInit } from '@angular/core';
import { AuthenticationService, DetalleUsuario } from '../../services/authentication.service'

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  detalle: DetalleUsuario;
  sidebarOpen = true;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.profile().subscribe(
      usuario => {
        this.detalle = usuario;
      },
      err => {
        console.error(err);
      }
    )
  }

  sideBarToggler() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}