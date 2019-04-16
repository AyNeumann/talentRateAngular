import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Eval } from 'src/app/models/eval';
import { EvalServiceService } from 'src/app/services/eval-service.service';
import { ScoreValidator} from 'src/app/validators/score-validator';

import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-create-eval',
  templateUrl: './create-eval.component.html',
  styleUrls: ['./create-eval.component.css']
})
export class CreateEvalComponent implements OnInit {

  createEvalForm: FormGroup;
  private isEvalCreated = false;
  private evalId: String = '';

  constructor(private formBuilder: FormBuilder,
    private evalService: EvalServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initialisationForm();
  }

  initialisationForm() {
    this.createEvalForm = this.formBuilder.group({
      school: ['', Validators.required],
      module: ['', Validators.required],
      promotion: ['', Validators.required],
      category: ['', Validators.required],
      skill: ['', Validators.required],
      homework: ['', Validators.required],
      student: ['', Validators.required],
      score: ['', Validators.required],
      obtainable: ['', Validators.required]
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
    );
    //console.log('[create-eval.components.ts | onSubmit - newEval]: ', newEval);

    this.evalService.createEval(newEval)
      .subscribe(data => {
        this.evalService.evalToSend = data;
        console.log('[create-eval.components.ts | onSubmit - data]: ', data);
        console.log('[create-eval.components.ts | onSubmit - Object.values(data)[0]]: ', Object.values(data)[0]);
        if (data) {
          this.openSnackBar('Données sauvegardées!', 'snackBarSuccess');
        }
        this.evalId = Object.values(data)[0];
        this.isEvalCreated = true;
      },
        error => {
          this.openSnackBar('Une erreur s\' est produite lors de l\' envoie des données.', 'snackBarError');
        }
      );
    this.createEvalForm.get('score').setValue('');
    this.createEvalForm.markAsPristine();
  }

  openSnackBar(message, type) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: [type],
    });
  }

  copyEval() {
    console.log('Copy Eval');
    console.log('[create-eval.components.ts | copyEval - evalId]', this.evalId);
    this.router.navigate(['/copyeval', this.evalId]);
  }
}
