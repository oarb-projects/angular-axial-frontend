import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { InventarioService } from '../../services/inventario.service';
import {Property} from '../../Models/Property'
@Component({
  selector: 'app-inventario-editar',
  templateUrl: './inventario-editar.component.html',
  styleUrls: ['./inventario-editar.component.scss']
})
export class InventarioEditarComponent implements OnInit {
  propId: string;
  informationAvailable = false;
  public buttonAction = 'Editar';
  public title = 'Editando';
  property: Property;

  constructor(
    private activatedroute: ActivatedRoute,
    private inventarioService: InventarioService,
    private router: Router) { }
  
  ngOnInit(): void {
    this.propId = this.activatedroute.snapshot.queryParamMap.get('propId');
    console.log(this.propId)
    this.inventarioService.getProperty(this.propId).subscribe((property) => {
      console.log('Property Information received from server');
      console.log(property);
      this.property = property;
      this.informationAvailable = true;
    });
  }

  onClicked(property: Property){
    console.log(property)
    const treatedProperty = {
      ...this.property,
      ...property
    };
    console.log("===treated")
    console.log(treatedProperty)
    this.inventarioService.editProperty(this.propId, treatedProperty).subscribe((receivedProperty) => {
      console.log('Updated Property received from server');
      console.log(receivedProperty);
      if (receivedProperty.prop_activo === 1) {
        this.router.navigate(['properties']);
      }
    });
  }

}
