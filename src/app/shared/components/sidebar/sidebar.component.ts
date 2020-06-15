import { Component, OnInit, Input } from '@angular/core';
import { DetalleUsuario } from '../../../services/authentication.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() detalle: DetalleUsuario;

  constructor() { }

  ngOnInit(): void {    
  }

}
