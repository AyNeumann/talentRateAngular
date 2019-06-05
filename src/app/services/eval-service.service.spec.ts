import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { EvalServiceService } from './eval-service.service';
import { Eval, ReturnedEval } from 'src/app/models/eval';
import { EvalTrackerError } from '../models/evalTrackerError';

describe('EvalServiceService', () => {
  let evalService: EvalServiceService;
  let httpTestingController: HttpTestingController;

  let testEvals: Eval[] = [
    { evalId: 'eval1', school: 'TestSchool1', promotion: 'Mai2019', module: 'TestAngular', category: 'TestService', skill: 'TestAuto',
    homework: 'GrandTestAuto', student: {name: 'AngularTest'}, score: 40, obtainable: 50, given: 1558957256920 },
    { evalId: 'eval2', school: 'TestSchool1', promotion: 'Mai2019', module: 'TestAngular', category: 'TestService', skill: 'TestAuto',
    homework: 'GrandTestAuto', student: {name: 'AngularTest2'}, score: 45, obtainable: 50, given: 1558957256920 }
  ];

// tslint:disable-next-line: max-line-length
  let evalToSend: Eval = { evalId: 'eval3', school: 'TestSchool1', promotion: 'Mai2019', module: 'TestAngular', category: 'TestService', skill: 'TestAuto',
    homework: 'GrandTestAuto', student: {name: 'AngularTest3'}, score: 40, obtainable: 50, given: 1558957256920 };

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ EvalServiceService ]
    });

    evalService = TestBed.get(EvalServiceService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
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
  });

  it('should return a EvalTrackerError', () => {
    evalService.retrieveAllEvals()
      .subscribe(
        (data: Eval[]) => fail('this should have been an error'),
        (err: EvalTrackerError) => {
          expect(err.errorNumber).toEqual(500);
          expect(err.messageToUser).toEqual('Une erreur s\' est produite lors de la récupération des données.');

        }
      );

      let evalRequest: TestRequest = httpTestingController.expectOne('eval/');

      evalRequest.flush('error', {
        status: 500,
        statusText: 'Server error'
      });
  });

  it('should POST/create an eval', () => {
    evalService.createEval(evalToSend)
      .subscribe((data: Eval) => {
        expect(data).toBe(evalToSend);
      });

    let evalRequest: TestRequest = httpTestingController.expectOne('eval/');
    expect(evalRequest.request.method).toEqual('POST');

    evalRequest.flush(evalToSend);
  });

  it('should GET an eval by id', () => {
    evalService.retrieveEvalbyId('eval1')
      .subscribe((data: Eval) => {
        expect(data).toBe(testEvals[0]);
      });

    let evalRequest: TestRequest = httpTestingController.expectOne('eval/getbyid?id=eval1');
    expect(evalRequest.request.method).toEqual('GET');

    evalRequest.flush(testEvals[0]);
  });

});
