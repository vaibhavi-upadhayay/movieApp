import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateMovieComponent } from './add-update-movie.component';

describe('AddUpdateMovieComponent', () => {
  let component: AddUpdateMovieComponent;
  let fixture: ComponentFixture<AddUpdateMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
