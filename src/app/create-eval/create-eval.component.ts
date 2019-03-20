import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Eval } from 'src/app/models/eval';
import { EvalServiceService } from 'src/app/services/eval-service.service';

@Component({
  selector: 'app-create-eval',
  templateUrl: './create-eval.component.html',
  styleUrls: ['./create-eval.component.css']
})
export class CreateEvalComponent implements OnInit {

  createEvalForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private evalService: EvalServiceService) { }

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
    })
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

    this.evalService.createEval(newEval)
      .subscribe(data => {
        this.evalService.evalToCreate = data;
        console.log('[create-eval.components.ts | onSubmit]: ', data);
      });
  }

}
