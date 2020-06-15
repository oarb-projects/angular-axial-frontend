import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { LoginComponent } from '../../modules/login/login.component';
import { RegistrarComponent } from '../../modules/registrar/registrar.component';

import { DashboardService } from 'src/app/modules/dashboard.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

// Oscar Rosete Deliverable
import { SellersService } from '../../services/vendedor.service';
import { VendedorListadoComponent } from '../../modules/vendedor-listado/vendedor-listado.component';
import { VendedorAgregarComponent } from '../../modules/vendedor-agregar/vendedor-agregar.component';

import { PhoneMaskDirective } from 'src/app/directives/phone-mask.directive';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    LoginComponent,
    RegistrarComponent,
    PhoneMaskDirective,
    VendedorListadoComponent,
    VendedorAgregarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    DashboardService,
    SellersService
  ]
})

export class DefaultModule { }
