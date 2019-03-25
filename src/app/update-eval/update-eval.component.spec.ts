import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEvalComponent } from './update-eval.component';

describe('edit-evalComponent', () => {
  let component: UpdateEvalComponent;
  let fixture: ComponentFixture<UpdateEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
