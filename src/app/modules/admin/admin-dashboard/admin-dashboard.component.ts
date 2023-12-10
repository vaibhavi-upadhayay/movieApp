import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  movies: any;
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies() {
    let movies = localStorage.getItem('movies');
    this.movies = movies ? JSON.parse(movies) : [];
  }
  editMovie(id: number) {
    this.router.navigate(['admin', 'edit-movie', id]);
  }
  removeMovie(id: number) {
    let movies = localStorage.getItem('movies');
    this.movies = movies ? JSON.parse(movies) : [];
    let m_id = this.movies.findIndex((movie: any) => movie.id == id);
    if (m_id !== -1) {
      this.movies.splice(m_id, 1);
      localStorage.setItem('movies', JSON.stringify(this.movies));
    }
  }
  onAddMovies() {
    this.router.navigateByUrl('/admin/add-movie');
  }
  logout() {
    this.loginService.logout();
  }
}
