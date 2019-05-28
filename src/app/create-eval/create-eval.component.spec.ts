import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvalComponent } from './create-eval.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from 'src/app/loader/loader.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('CreateEvalComponent', () => {
  let component: CreateEvalComponent;
  let fixture: ComponentFixture<CreateEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        LoaderComponent
      ],
      declarations: [ CreateEvalComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
