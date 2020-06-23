import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { InventarioService } from '../../services/inventario.service';
import {Property} from '../../Models/Property'
@Component({
  selector: 'app-inventario-agregar',
  templateUrl: './inventario-agregar.component.html',
  styleUrls: ['./inventario-agregar.component.scss']
})
export class InventarioAgregarComponent implements OnInit {
  propId: string;
  informationAvailable = false;
  public buttonAction = 'Agregar';
  public title = 'Agregando';
  property: Property;

  constructor(
    private inventarioService: InventarioService,
    private router: Router) { }
  
  ngOnInit(): void {
  }

  onClicked(property: Property){
    const treatedProperty = {
      ...property,
      prop_activo:1
    };
    // console.log("===treated")
    // console.log(treatedProperty)
    this.inventarioService.register(treatedProperty).subscribe((result) => {
      console.log('Created Property received from server');
      console.log(result);
      if (result.hasOwnProperty('detail')) {
        this.router.navigate(['properties']);
      }
    });
  }
}
