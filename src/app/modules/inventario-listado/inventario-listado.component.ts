import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {InventarioService} from '../../services/inventario.service';
import { Router } from '@angular/router';
import {Property} from '../../Models/Property';
// angular material dependencies
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-inventario-listado',
  templateUrl: './inventario-listado.component.html',
  styleUrls: ['./inventario-listado.component.scss']
})
export class InventarioListadoComponent implements OnInit {
  properties: Property[];
  private companyId = '2';

  // material angular
  public dataSource = new MatTableDataSource<Property>();
  public displayedColumns = ['ubicacion', 'direccion', 'descripcion', 'update', 'delete'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private inventarioService: InventarioService,private router: Router) { }
  
  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers = () => {
    this.inventarioService.getProperties()
    .subscribe(properties => {
      console.log('properties recollected from db');
      console.log(properties);
      this.properties = properties;
      this.dataSource.data = this.properties;
    });
    // For user interface trials
    // this.users = this.sellersServices.getUsersHardcoded();
    // this.dataSource.data = this.users;
  }

  public redirectToUpdate = (id: string) => {
    console.log(id)
    const updateUrl = `properties/edit`;
    this.router.navigate([updateUrl], {queryParams: {propId: id, companyId: this.companyId} });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }

  public redirectToDelete = (id: string) => {
    console.log(id)
    this.inventarioService.delete(id, this.companyId).subscribe(
      result => {
        console.log('returned by server');
        console.log(result);
        if (result.hasOwnProperty('detail')) {
          this.redirectTo('/properties');
        }
      },
      err => {
        console.log('err');
        console.log(err);
      }
      );
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
