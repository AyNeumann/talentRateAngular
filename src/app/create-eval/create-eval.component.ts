import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Eval } from 'src/app/models/eval';
import { EvalServiceService } from 'src/app/services/eval-service.service';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-eval',
  templateUrl: './create-eval.component.html',
  styleUrls: ['./create-eval.component.css']
})
export class CreateEvalComponent implements OnInit {

  createEvalForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private evalService: EvalServiceService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initialisationForm();
  }

  initialisationForm() {
    this.createEvalForm = this.formBuilder.group({
      school: [''],
      module: [''],
      promotion: [''],
      category: [''],
      skill: [''],
      homework: [''],
      student: [''],
      score: [''],
      obtainable: ['']
    });
  }

  onSubmit() {
    const formValue = this.createEvalForm.value;
    const newEval = new Eval(
      formValue['school'],
      formValue['module'],
      formValue['promotion'],
      formValue['category'],
      formValue['skill'],
      formValue['homework'],
      formValue['student'],
      formValue['score'],
      formValue['obtainable'],
    );
    console.log('[create-eval.components.ts | onSubmit - newEval]: ', newEval);

    this.evalService.createEval(newEval)
      .subscribe(data => {
        this.evalService.evalToCreate = data;
      },
        error => {
          alert('Une erreur s\' est produite lors de l\' envoie des données.');
        }
      );
    this.openSnackBar();
    this.createEvalForm.get('score').setValue('');
    this.createEvalForm.markAsPristine();
  }

  openSnackBar() {
    this.snackBar.open('Données envoyées!', 'OK', {
      duration: 2000,
    });
  }
}
