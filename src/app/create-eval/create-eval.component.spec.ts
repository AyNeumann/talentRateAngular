import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvalComponent } from './create-eval.component';

describe('CreateEvalComponent', () => {
  let component: CreateEvalComponent;
  let fixture: ComponentFixture<CreateEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEvalComponent ]
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
