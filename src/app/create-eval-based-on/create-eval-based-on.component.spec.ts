import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvalBasedOnComponent } from './create-eval-based-on.component';

describe('CreateEvalBasedOnComponent', () => {
  let component: CreateEvalBasedOnComponent;
  let fixture: ComponentFixture<CreateEvalBasedOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEvalBasedOnComponent ]
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
