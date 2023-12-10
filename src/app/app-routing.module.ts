import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { IsLoggedInGuard } from './core/guards/isloggedin.guard';
import { AuthUserGuard } from './core/guards/auth-user.guard';
import { AuthAdminGuard } from './core/guards/auth-admin.guard';
import { UserDashboardComponent } from './modules/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',

    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'user',
    canLoad: [AuthUserGuard],
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    canLoad: [AuthAdminGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
