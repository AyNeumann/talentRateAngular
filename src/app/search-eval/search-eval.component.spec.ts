import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEvalComponent } from './search-eval.component';

describe('SearchEvalComponent', () => {
  let component: SearchEvalComponent;
  let fixture: ComponentFixture<SearchEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
