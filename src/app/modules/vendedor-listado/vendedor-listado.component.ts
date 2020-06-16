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
    console.log(updateUrl);
    this.router.navigate([updateUrl], {queryParams: {userId: id, companyId: this.companyId} });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }

  public redirectToDelete = (id: string) => {
    console.log(id)
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

  public newUser = () => {
    console.log('adding new user');
  }

  public doFilter = (value: string) => {
    console.log('filtering');
    console.log(value);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    console.log( this.dataSource);
  }

  public getAllUsers = () => {
    this.sellersServices.getUsers()
    .subscribe(users => {
      console.log(users);
      this.users = users;
      this.dataSource.data = this.users;
    });
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
