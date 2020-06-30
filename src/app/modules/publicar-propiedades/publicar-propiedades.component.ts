import { Component, OnInit,  ViewChild, Inject } from '@angular/core';
import {PublicacionesService} from '../../services/publicaciones.service'
import {PublishedProperty} from '../../Models/PublishedProperty'

// angular material dependencies
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

//Dialog Component
import {PublicarPropiedadesVendedoresComponent} from '../publicar-propiedades-vendedores/publicar-propiedades-vendedores.component'

@Component({
  selector: 'app-publicar-propiedades',
  templateUrl: './publicar-propiedades.component.html',
  styleUrls: ['./publicar-propiedades.component.scss']
})
export class PublicarPropiedadesComponent implements OnInit {
  constructor(private publicacionesService: PublicacionesService, public dialog: MatDialog) { }
  private properties: PublishedProperty[];
  private tipo_negocio=['','venta','renta'];
  private company=2;
  animal: string;
  name: string;

  // material angular
  public dataSource = new MatTableDataSource<PublishedProperty>();
  public displayedColumns = ['descripcion','direccion', 'precio', 'id_tipo_negocio','status','action']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  // pagination code and sort
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllProperties()
  }

  getAllProperties(){
    this.publicacionesService.getPublishedProperties(this.company).subscribe(receivedProperties=>{
      console.log('properties recollected from db');
      console.log(receivedProperties);
      this.properties = receivedProperties;
      this.dataSource.data = this.properties;
    })
  }

  getTextTipoNegocio(tipo:number):string{
    return this.tipo_negocio[tipo];
  }

  retreiveStatusDb(id:number){
    console.log(id)
    if(id===1){
      return 'Sin Publicar'
    }
    return 'Publicada'
  }

  getStatus(id:number){
    return this.retreiveStatusDb(id);
  }

  getAction(id:number){
    const status=    this.retreiveStatusDb(id);
    let action=status==='Sin Publicar'?  'Publicar' : 'Vendedores'
    return action
  }

  publishAction(id:number){
    console.log('===publishing')
    console.log(id)
    const dialogRef = this.dialog.open(PublicarPropiedadesVendedoresComponent, {
      width: '500px',
      height:'500px',
      data: {name: this.name, animal: this.animal,propId:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}