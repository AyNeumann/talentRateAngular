import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EvalServiceService } from 'src/app/services/eval-service.service';
import { Eval } from 'src/app/models/eval';
import { ScoreValidator} from 'src/app/validators/score-validator';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-eval-based-on',
  templateUrl: './create-eval-based-on.component.html',
  styleUrls: ['./create-eval-based-on.component.css']
})
export class CreateEvalBasedOnComponent implements OnInit {

  createEvalForm: FormGroup;
  evalId;
  private evalData;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private evalService: EvalServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.initialisationForm();
    this.route.params.subscribe((params: Params) => {
      this.evalId = params['evalId'];
      this.evalService.retrieveEvalbyId(this.evalId).subscribe(
        response => {
          this.evalData = response;
          //console.log('[create-eval-based.components.ts | ngOnInit]:  - response', response);
          //console.log('[create-eval-based.components.ts | ngOnInit]:  - evalDagta', this.evalData);
        },
        err => {
          this.openSnackBar('Une erreur s\' est produite lors de la récupération des données.', 'snackBarError');
          console.log('[update-eval.components.ts | ngOnInit]: Cannot get eval');
        },
        () => {
          //console.log('[create-eval-based.components.ts | ngOnInit]: Get eval');
          this.formUpdating();
        }
      );
    });
    this.createEvalForm.markAsPristine();
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

  formUpdating() {
    this.createEvalForm = this.formBuilder.group({
      school: [this.evalData.school, Validators.required],
      module: [this.evalData.module, Validators.required],
      promotion: [this.evalData.promotion, Validators.required],
      category: [this.evalData.category, Validators.required],
      skill: [this.evalData.skill, Validators.required],
      homework: [this.evalData.homework, Validators.required],
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
    );
    //console.log('[create-eval.components.ts | onSubmit - newEval]: ', newEval);

    this.evalService.createEval(newEval)
      .subscribe(data => {
        this.evalService.evalToSend = data;
        console.log('[create-eval-based.components.ts | onSubmit - data]: ', data);
        console.log(Object.values(data)[0]);
        if (data) {
          this.openSnackBar('Données sauvegardées!', 'snackBarSuccess');
        }
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
}
