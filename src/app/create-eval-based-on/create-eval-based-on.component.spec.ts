import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvalBasedOnComponent } from './create-eval-based-on.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatIconModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CreateEvalBasedOnComponent', () => {
  let component: CreateEvalBasedOnComponent;
  let fixture: ComponentFixture<CreateEvalBasedOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatIconModule,
        MatSnackBarModule,
        MatInputModule, // <== POURQUOI DEVOIR IMPORTER CES 2 MODULES ALORS QUE DANS D'AUTRE COMPOSANTS UTILISANT EXACTEMENT LE
        BrowserAnimationsModule, // <== MEME FORMULAIRE CE NE SOIT PAS OBLIGATOIRE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
      declarations: [ CreateEvalBasedOnComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEvalBasedOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
