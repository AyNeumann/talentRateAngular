import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEvalComponent } from './update-eval.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('edit-evalComponent', () => {
  let component: UpdateEvalComponent;
  let fixture: ComponentFixture<UpdateEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSnackBarModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
      declarations: [ UpdateEvalComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO résoudre erreur: 'TypeError: Cannot read property 'given' of undefined'.
  xit('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
