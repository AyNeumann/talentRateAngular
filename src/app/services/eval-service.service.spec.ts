import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { EvalServiceService } from './eval-service.service';
import { Eval, ReturnedEval } from 'src/app/models/eval';

describe('EvalServiceService', () => {
  let evalService: EvalServiceService;
  let httpTestingController: HttpTestingController;

  let testEvals: Eval[] = [
    { evalId: 'eval1', school: 'TestSchool1', promotion: 'Mai2019', module: 'TestAngular', category: 'TestService', skill: 'TestAuto', 
    homework: 'GrandTestAuto', student: {name: 'AngularTest'}, score: 40, obtainable: 50, given: 1558957256920 },
    { evalId: 'eval2', school: 'TestSchool1', promotion: 'Mai2019', module: 'TestAngular', category: 'TestService', skill: 'TestAuto', 
    homework: 'GrandTestAuto', student: {name: 'AngularTest2'}, score: 45, obtainable: 50, given: 1558957256920 }
  ];

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ EvalServiceService ]
    });

    evalService = TestBed.get(EvalServiceService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: EvalServiceService = TestBed.get(EvalServiceService);
    expect(service).toBeTruthy();
  });

  it('should GET all evals', () => {
    evalService.retrieveAllEvals()
      .subscribe((data: Eval[]) => {
        expect(data.length).toBe(2);
      });

    let evalRequest: TestRequest = httpTestingController.expectOne('eval/');
    expect(evalRequest.request.method).toEqual('GET');

    evalRequest.flush(testEvals);

    httpTestingController.verify();
  });

  it('test 2', () => {

  });
});
