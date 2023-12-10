import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  movies: any;
  currentUser: any;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.getAllMovies();
    this.getCurrentUser();
  }
  getAllMovies() {
    let movies = localStorage.getItem('movies');
    this.movies = movies ? JSON.parse(movies) : [];

    this.movies.forEach((movie: any) => {
      movie.ratingControl = new FormControl(Math.round(movie.rating) || 5);
    });
  }

  getCurrentUser() {
    let currentUser = localStorage.getItem('currentUser');
    this.currentUser = currentUser ? JSON.parse(currentUser) : null;
  }
  logout() {
    this.loginService.logout();
  }
  likeMovie(id: number) {
    let i = this.movies.findIndex((movie: any) => movie.id == id);
    if (i !== -1) {
      if (this.movies[i].likes) {
        this.movies[i].likes.push(this.currentUser.userName);
      } else {
        this.movies[i].likes = [this.currentUser.userName];
      }

      localStorage.setItem('movies', JSON.stringify(this.movies));
    }
  }

  commentOnMovie(input: any, id: number) {
    if (!input.value) {
      return;
    }
    let i = this.movies.findIndex((movie: any) => movie.id == id);
    if (i !== -1) {
      if (this.movies[i].comments) {
        this.movies[i].comments.unshift({
          userName: this.currentUser.userName,
          comment: input.value,
        });
      } else {
        this.movies[i].comments = [
          {
            userName: this.currentUser.userName,
            comment: input.value,
          },
        ];
      }
      localStorage.setItem('movies', JSON.stringify(this.movies));
    }
    console.log(input);

    input.value = '';
  }

  rateMovie(id: number) {
    let i = this.movies.findIndex((movie: any) => movie.id == id);
    if (i !== -1) {
      let rating =
        ((this.movies[i].rating || 5) + this.movies[i].ratingControl.value) / 2;
      this.movies[i].rating = rating;

      localStorage.setItem('movies', JSON.stringify(this.movies));
    }
  }
}
