import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddUpdateMovieComponent } from './add-update-movie/add-update-movie.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'edit-movie/:id',
    component: AddUpdateMovieComponent,
  },
  {
    path: 'add-movie',
    component: AddUpdateMovieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
