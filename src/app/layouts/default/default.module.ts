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
import { VendedorFormComponent  } from '../../modules/vendedor-form/vendedor-form.component';
import { VendedorEditarComponent } from '../../modules/vendedor-editar/vendedor-editar.component';
import { PhoneMaskDirective } from 'src/app/directives/phone-mask.directive';

// Oscar Rosete Deliverable 2
import {InventarioService} from '../../services/inventario.service';
import { InventarioAgregarComponent } from '../../modules/inventario-agregar/inventario-agregar.component';
import { InventarioListadoComponent } from '../../modules/inventario-listado/inventario-listado.component';
import { InventarioEditarComponent } from '../../modules/inventario-editar/inventario-editar.component';
import { InventarioFormComponent } from '../../modules/inventario-form/inventario-form.component';
import {MainPipe} from './main-pipe.module'

// Oscar Rosete Deliverable 3
import { PublicarPropiedadesComponent } from '../../modules/publicar-propiedades/publicar-propiedades.component';
import { PublicarPropiedadesVendedoresComponent } from '../..//modules/publicar-propiedades-vendedores/publicar-propiedades-vendedores.component';
import {PublicacionesService} from '../../services/publicaciones.service';

// Oscar Rosete Deliverable 4
import { RegisterEmailComponent } from '../../modules/register-email/register-email.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    LoginComponent,
    RegistrarComponent,
    PhoneMaskDirective,
    VendedorListadoComponent,
    VendedorAgregarComponent,
    VendedorFormComponent,
    VendedorEditarComponent,
    InventarioAgregarComponent,
    InventarioListadoComponent,
    InventarioEditarComponent,
    InventarioFormComponent,
    PublicarPropiedadesComponent,
    PublicarPropiedadesVendedoresComponent,
    RegisterEmailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    MainPipe
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    DashboardService,
    SellersService,
    InventarioService,
    PublicacionesService
  ]
})

export class DefaultModule { }
