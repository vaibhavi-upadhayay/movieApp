import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-update-movie',
  templateUrl: './add-update-movie.component.html',
  styleUrls: ['./add-update-movie.component.css'],
})
export class AddUpdateMovieComponent implements OnInit {
  MovieForm;
  editMovieId!: number;
  isEditMoive = false;
  movieDontExists = false;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.MovieForm = this.initializeForm();

    this.activatedRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id) {
        this.isEditMoive = true;
        this.movieDontExists = false;
        this.fillMovieForm(+id);
      }
    });
  }

  ngOnInit(): void {}

  fillMovieForm(id: number) {
    this.editMovieId = id;
    let movies: any = localStorage.getItem('movies');
    if (movies) {
      movies = JSON.parse(movies);

      let m = movies.find((movie: any) => movie.id == id);

      if (m) {
        m.castMembers &&
          m.castMembers.forEach((cast: any) => {
            this._castMembers.push(
              this.formBuilder.control('', [Validators.required])
            );
          });
        this.MovieForm.patchValue(m);

        // this._castMembers.patchValue(m.castMembers);
      } else {
        this.movieDontExists = true;
      }
    } else {
      this.movieDontExists = true;
    }
  }

  get _castMembers() {
    return this.MovieForm.get('castMembers') as FormArray<FormControl>;
  }
  initializeForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      castMembers: this.formBuilder.array([]),
      releaseDate: [''],
    });
  }

  addCastMember() {
    this._castMembers.push(this.formBuilder.control('', [Validators.required]));
  }

  removeCastMember(index: number) {
    this._castMembers.removeAt(index);
  }

  onSubmit() {
    if (this.MovieForm.valid) {
      let movies: any = localStorage.getItem('movies');
      movies = movies ? JSON.parse(movies) : [];

      if (this.isEditMoive) {
        let index = movies.findIndex(
          (movie: any) => movie.id == this.editMovieId
        );

        if (index !== -1) {
          movies[index] = {
            id: this.editMovieId,
            ...this.MovieForm.value,
          };
          localStorage.setItem('movies', JSON.stringify(movies));
          this.router.navigateByUrl('admin/dashboard');
        }
      } else {
        let id = movies && movies.length > 0 ? movies[movies.length - 1].id : 0;
        movies.push({
          id: id + 1,
          ...this.MovieForm.value,
        });
        localStorage.setItem('movies', JSON.stringify(movies));
        this.router.navigateByUrl('admin/dashboard');
      }
    }
  }
}
