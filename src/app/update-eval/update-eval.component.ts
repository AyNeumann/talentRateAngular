import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EvalServiceService } from 'src/app/services/eval-service.service';
import { Eval, ReturnedEval } from 'src/app/models/eval';
import { ScoreValidator} from 'src/app/validators/score-validator';

import { MatSnackBar } from '@angular/material';
import { EvalTrackerError } from '../models/evalTrackerError';

@Component({
  selector: 'app-student-update-eval',
  templateUrl: './update-eval.component.html',
  styleUrls: ['./update-eval.component.css']
})
export class UpdateEvalComponent implements OnInit {

  updateEvalForm: FormGroup;
  evalId;
  private evalData;
  private evalDate;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private evalService: EvalServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.initialisationForm();
    const resolvedEval: Eval | EvalTrackerError = this.route.snapshot.data['resolvedEval'];
    if (resolvedEval instanceof EvalTrackerError) {
      this.openSnackBar(resolvedEval.messageToUser, 'snackBarError');
    } else {
      this.evalData = resolvedEval;
      this.formUpdating();
      console.log('[update-eval.component.ts | ngOnInit] - resolvedEval: ', resolvedEval);
      this.evalId = this.route.snapshot.paramMap.get('evalId');
    }
    /* this.route.params.subscribe((params: Params) => {
      this.evalId = params['evalId'];
      this.evalService.retrieveEvalbyId(this.evalId).subscribe(
        response => {
          this.evalData = response;
          console.log('[update-eval.components.ts | ngOnInit]:  - response', response);
        },
        err => {
          this.openSnackBar('Une erreur s\' est produite lors de la récupération des données.', 'snackBarError');
          console.log('[update-eval.components.ts | ngOnInit]: Cannot get eval');
        },
        () => {
          this.formUpdating();
        }
      );
    }); */

    this.updateEvalForm.markAsPristine();
  }

  initialisationForm() {
    this.updateEvalForm = this.formBuilder.group({
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
    this.updateEvalForm = this.formBuilder.group({
      school: [this.evalData.school, Validators.required],
      module: [this.evalData.module, Validators.required],
      promotion: [this.evalData.promotion, Validators.required],
      category: [this.evalData.category, Validators.required],
      skill: [this.evalData.skill, Validators.required],
      homework: [this.evalData.homework, Validators.required],
      given: [this.evalDate, Validators.required],
      student: [this.evalData.student.name, Validators.required],
      score: [this.evalData.score, Validators.required],
      obtainable: [this.evalData.obtainable, Validators.required]
    }, { validator: ScoreValidator.scoreValidator });
  }

  onSubmit() {
    const formValue = this.updateEvalForm.value;
    const updatedEval = new Eval(
      this.evalId,
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
    console.log('[update-eval.components.ts | onSubmit - updatedEval]: ', updatedEval);

    this.evalService.updateEval(this.evalId, updatedEval)
      .subscribe((data: ReturnedEval) => {
        this.evalService.evalToSend = data;
        if (data.isDone === true) {
          this.openSnackBar(data.message, 'snackBarSuccess');
        } else {
          this.openSnackBar(data.message, 'snackBarError');
        }
      },
        (err: EvalTrackerError) => {
          this.openSnackBar(err.messageToUser, 'snackBarError');
        }
      );
    this.updateEvalForm.markAsPristine();
  }

  openSnackBar(message, type) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: [type],
    });
  }

}
