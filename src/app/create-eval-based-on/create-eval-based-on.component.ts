import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EvalServiceService } from 'src/app/services/eval-service.service';
import { SnackBarServiceService } from '../common/snack-bar-service.service';
import { Eval, ReturnedEval } from 'src/app/models/eval';
import { ScoreValidator} from 'src/app/validators/score-validator';

import { EvalTrackerError } from '../models/evalTrackerError';

@Component({
  selector: 'app-create-eval-based-on',
  templateUrl: './create-eval-based-on.component.html',
  styleUrls: ['./create-eval-based-on.component.css']
})
export class CreateEvalBasedOnComponent implements OnInit {

  createEvalForm: FormGroup;
  evalId;
  private evalData;
  private evalDate;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private evalService: EvalServiceService,
    private snackBar: SnackBarServiceService
  ) { }

  ngOnInit() {
    this.initialisationForm();
    const resolvedEval: Eval | EvalTrackerError = this.route.snapshot.data['resolvedEval'];
    if (resolvedEval instanceof EvalTrackerError) {
      this.snackBar.open(resolvedEval.messageToUser, 'snackBarError');
      console.log('EvalTrackerError');
    } else {
      this.evalData = resolvedEval;
      this.formUpdating();
      console.log('[create-eval-based-on.component.ts | ngOnInit] - resolvedEval: ', resolvedEval);
      this.evalId = this.route.snapshot.paramMap.get('evalId');
    }
    /* this.route.params.subscribe((params: Params) => {
      this.evalId = params['evalId'];
      this.evalService.retrieveEvalbyId(this.evalId).subscribe(
        (response: Eval) => {
          this.evalData = response;
        },
        err => {
          this.snackBar.open(err.messageToUser, 'snackBarError');
        },
        () => {
          this.formUpdating();
        }
      );
    });
    this.createEvalForm.markAsPristine(); */
  }

  initialisationForm() {
    this.createEvalForm = this.formBuilder.group({
      school: [''],
      module: [''],
      promotion: [''],
      category: [''],
      skill: [''],
      homework: [''],
      given: [''],
      student: [''],
      score: [''],
      obtainable: ['']
    });
  }

  formUpdating() {
    this.evalDate = new Date(this.evalData.given);
    this.createEvalForm = this.formBuilder.group({
      school: [this.evalData.school, Validators.required],
      module: [this.evalData.module, Validators.required],
      promotion: [this.evalData.promotion, Validators.required],
      category: [this.evalData.category, Validators.required],
      skill: [this.evalData.skill, Validators.required],
      homework: [this.evalData.homework, Validators.required],
      given: [this.evalDate, Validators.required],
      student: ['', Validators.required],
      score: ['', Validators.required],
      obtainable: [this.evalData.obtainable, Validators.required]
    }, { validator: ScoreValidator.scoreValidator });
  }

  onSubmit() {
    const formValue = this.createEvalForm.value;
    const newEval = new Eval(
      '',
      formValue['school'],
      formValue['promotion'],
      formValue['module'],
      formValue['category'],
      formValue['skill'],
      formValue['homework'],
      formValue['student'],
      formValue['score'],
      formValue['obtainable'],
      formValue['given'].getTime()
    );
    // console.log('[create-eval.components.ts | onSubmit - newEval]: ', newEval);

    this.evalService.createEval(newEval)
      .subscribe(
        (data: ReturnedEval) => { this.evalService.evalToSend = data;
        if (data.isDone === true) {
          this.snackBar.open(data.message, 'snackBarSuccess');
        } else {
          this.snackBar.open(data.message, 'snackBarError');
        }
      },
        (err: EvalTrackerError) => {
          this.snackBar.open(err.messageToUser, 'snackBarError');
        }
      );
    this.createEvalForm.get('score').setValue('');
    this.createEvalForm.markAsPristine();
  }

}
