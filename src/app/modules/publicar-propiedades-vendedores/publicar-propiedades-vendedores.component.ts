import { Component, OnInit,Inject } from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox'
import {PublicacionesService} from '../../services/publicaciones.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
  propId:number
}

export class Unit {   
  constructor(public code:string,   
    public usu_nombre: string,
    public usu_apellido: string,
    public usu_telefono_personal:string,
    public checked: boolean, 
    public photo:string) {
  }
}

@Component({
  selector: 'app-publicar-propiedades-vendedores',
  templateUrl: './publicar-propiedades-vendedores.component.html',
  styleUrls: ['./publicar-propiedades-vendedores.component.scss']
})
export class PublicarPropiedadesVendedoresComponent implements OnInit {
  checked = false;
  labelPosition= 'before';
  public units: Unit[]=[];
  public company=2;
  public propId=1;

  constructor(private publicacionesService: PublicacionesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
   

  ngOnInit(): void {
    console.log(this.data)
    console.log(this.units)
    // this.getPlaceholderSellers();
    this.getSellers()
  }

  getPlaceholderSellers(){
    this.units.push(new Unit("code1","liz",'ortiz', '686265083',false,"https://unsplash.it/300"));
    this.units.push(new Unit("code2","axel",'ortiz', '686265083',true,"https://unsplash.it/300"));
    this.units.push(new Unit("code3","liz",'ortiz', '686265083',false,"https://unsplash.it/300"));
    this.units.push(new Unit("code4","axel",'ortiz', '686265083',true,"https://unsplash.it/300"));
    this.units.push(new Unit("code5","liz",'ortiz', '686265083',false,"https://unsplash.it/300"));
    this.units.push(new Unit("code6","axel",'ortiz', '686265083',true,"https://unsplash.it/300"));
  }

  modifyPublications(){
    console.log("===sellers")
    let objPublish={
      sellers:this.units,
      propId:this.data.propId
    }
    console.log(objPublish)
    this.publicacionesService.publishProperties(objPublish).subscribe((result) => {
      console.log('Created Property received from server');
      console.log(result);
      // if (result.hasOwnProperty('detail')) {
      //   this.router.navigate(['properties']);
      // }
    });
  }

  getSellers(){
    console.log("====get Sellers")
    this.publicacionesService.getSellers(this.company,this.data.propId).subscribe(receivedSellers=>{
      console.log('sellers recollected from db');
      console.log(receivedSellers);
      receivedSellers.forEach((seller)=>{
        this.units.push(new Unit(seller.usu_id.toString(),
        seller.usu_nombre,
        seller.usu_apellido,
        seller.usu_telefono_personal,
        seller.status==="Publicada"?true:false,
        seller.photo))
      })
      // this.properties = receivedProperties;
      // this.dataSource.data = this.properties;
    })
  }

  toggle(event:MatCheckboxChange,modifiedUnit:Unit){
    let filteredUnit=this.units.findIndex((unit)=> unit.code===modifiedUnit.code)
    this.units[filteredUnit].checked=event.checked
  }
}

// export interface DialogData {
//   animal: string;
//   name: string;
// }


// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }