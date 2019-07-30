import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReturnedEval } from 'src/app/models/eval';
import { EvalTrackerError } from '../models/evalTrackerError';
import { EvalServiceService } from 'src/app/services/eval-service.service';
import { SnackBarServiceService } from '../common/snack-bar-service.service';
import { ScoreValidator} from 'src/app/validators/score-validator';

@Component({
  selector: 'app-create-eval',
  templateUrl: './create-eval.component.html',
  styleUrls: ['./create-eval.component.css']
})
export class CreateEvalComponent implements OnInit, OnDestroy {

  private createEvalForm: FormGroup;
  private copyingEval: boolean = false;
  private evalId: string = '';
  private subcription;

  constructor(private formBuilder: FormBuilder,
    private evalService: EvalServiceService,
    private route: ActivatedRoute,
    private snackBar: SnackBarServiceService,
    private router: Router) { }

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
      given: [new Date(), Validators.required],
      student: ['', Validators.required],
      score: ['', [Validators.required, Validators.pattern('^[0-9][0-9]?[0-9]?$')]],
      obtainable: ['', [Validators.required, Validators.pattern('^[0-9][0-9]?[0-9]?$')]]
    }, { validator: ScoreValidator.scoreValidator });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createEvalForm.controls; }

  onSubmit() {
    if (this.createEvalForm.invalid) {
      return;
    }

    this.subcription = this.evalService.createEval(this.createEvalForm.value)
      .subscribe(
        (data: ReturnedEval) => { this.evalService.evalToSend = data;
        this.manageSnackBar(data.isDone, data.message);
        this.evalId = data.evalId;
        if (data.isDone === true && this.copyingEval === true) {
          this.router.navigate(['/copyeval', this.evalId]);
        }
      },
        (err: EvalTrackerError) => {
          this.snackBar.open(err.messageToUser, 'snackBarError');
        }
      );
    this.createEvalForm.get('score').setValue('');
    this.createEvalForm.markAsPristine();
  }

  manageSnackBar(isDone: boolean, message: string) {
    if (isDone === true) {
      this.snackBar.open(message, 'snackBarSuccess');
    } else {
      this.snackBar.open(message, 'snackBarError');
    }
  }

  copyEval() {
    this.copyingEval = true;
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
