import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EvalServiceService } from 'src/app/services/eval-service.service';
import { Eval } from 'src/app/models/eval';

import { MatSnackBar } from '@angular/material';
import { CompileTemplateMetadata } from '@angular/compiler';

@Component({
  selector: 'app-student-update-eval',
  templateUrl: './update-eval.component.html',
  styleUrls: ['./update-eval.component.css']
})
export class UpdateEvalComponent implements OnInit {

  updateEvalForm: FormGroup;
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
          console.log('[update-eval.components.ts | ngOnInit]:  - response', response);
          console.log('[update-eval.components.ts | ngOnInit]:  - evalDagta', this.evalData);
        },
        err => {
          console.log('[update-eval.components.ts | ngOnInit]: Cannot get eval');
        },
        () => {
          console.log('[update-eval.components.ts | ngOnInit]: Get eval');
          this.formUpdating();
        }
      );
    });
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
      student: [''],
      score: [''],
      obtainable: ['']
    });
  }

  formUpdating() {
    this.updateEvalForm = this.formBuilder.group({
      school: [this.evalData.school],
      module: [this.evalData.module],
      promotion: [this.evalData.promotion],
      category: [this.evalData.category],
      skill: [this.evalData.skill],
      homework: [this.evalData.homework],
      student: [this.evalData.student.name],
      score: [this.evalData.score],
      obtainable: [this.evalData.obtainable]
    });
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
    );
    console.log('[update-eval.components.ts | onSubmit - updatedEval]: ', updatedEval);

    this.evalService.updateEval(this.evalId, updatedEval)
      .subscribe(data => {
        this.evalService.evalToSend = data;
      },
        error => {
          alert('Une erreur s\' est produite lors de l\' envoie des données.');
        }
      );
    this.openSnackBar();
    this.updateEvalForm.markAsPristine();
  }

  openSnackBar() {
    this.snackBar.open('Données modifiées!', 'OK', {
      duration: 2000,
    });
  }

}
