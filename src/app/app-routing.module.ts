import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { LoginComponent } from './modules/login/login.component';
import { RegistrarComponent } from './modules/registrar/registrar.component';

// Oscar Rosete Deliverable
import { VendedorListadoComponent } from './modules/vendedor-listado/vendedor-listado.component';
import { VendedorAgregarComponent } from './modules/vendedor-agregar/vendedor-agregar.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuardService],
    children: [{
      path: '',
      component: DashboardComponent
    },
    {
      path: 'posts',
      component: PostsComponent
    },
    // Oscar Rosete Deliverable
    {
      path: 'sellers',
      component: VendedorListadoComponent
    },
    {
      path: 'add-seller',
      component: VendedorAgregarComponent
    }
  ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
];

/*const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'producto', component: ProductoListaComponent },
  { path: 'producto-agregar', component: ProductoAgregarComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', component: ErrorComponent },
]*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
