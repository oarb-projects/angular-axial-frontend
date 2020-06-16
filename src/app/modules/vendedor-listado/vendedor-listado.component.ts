import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SellersService } from '../../services/vendedor.service';
import {User} from '../../Models/User';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vendedor-listado',
  templateUrl: './vendedor-listado.component.html',
  styleUrls: ['./vendedor-listado.component.scss']
})


export class VendedorListadoComponent implements OnInit, AfterViewInit  {
  users: User[];
  public displayedColumns = ['usu_nombre', 'usu_apellido', 'usu_correo', 'update', 'delete'];
  public dataSource = new MatTableDataSource<User>();
  pageEvent: PageEvent;
  private companyId = '1';


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sellersServices: SellersService,private router: Router) { }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {
    const updateUrl = `sellers/edit`;
    this.router.navigate([updateUrl], {queryParams: {userId: id, companyId: this.companyId} });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }

  public redirectToDelete = (id: string) => {
    this.sellersServices.delete(id, this.companyId).subscribe(
      result => {
        console.log('returned by server');
        console.log(result);
        if (result.hasOwnProperty('detail')) {
          this.redirectTo('/sellers');
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

  public getAllUsers = () => {
    this.sellersServices.getUsers()
    .subscribe(users => {
      console.log('Users recollected from db');
      console.log(users);
      this.users = users;
      this.dataSource.data = this.users;
    });
    // For user interface trials
    // this.users = this.sellersServices.getUsersHardcoded();
    // this.dataSource.data = this.users;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  // pagination code and sort
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
