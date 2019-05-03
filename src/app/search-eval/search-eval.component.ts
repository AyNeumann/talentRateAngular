import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EvalServiceService } from 'src/app/services/eval-service.service';
import { Eval } from 'src/app/models/eval';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-search-eval',
  templateUrl: './search-eval.component.html',
  styleUrls: ['./search-eval.component.css']
})
export class SearchEvalComponent implements OnInit {

  searchEvalForm: FormGroup;

  private dataObtained = false;
  private dataError = false;
  private graphOneData = false;
  private graphTwoData = false;
  private evalData: Eval[] = [];
  displayedColumns: string[] = ['copy', 'school', 'promotion', 'module', 'category', 'skill', 'homework',
  'student', 'score', 'obtainable', 'actions'];
  dataSource = new MatTableDataSource();
  field = new FormControl();
  data = new FormControl();

  graphType1 = 'progress_stacked_global';
  graphType2 = 'progress_stacked_by_skill';
  totalScoreGrapData: any [];
  scorePerSkillGrapData: any [];

  graph1;
  graph2;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Compétences';
  showYAxisLabel = true;
  yAxisLabel = 'Points';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private evalService: EvalServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllDatas();
    this.searchEvalForm = this.formBuilder.group({
      field: [''],
      data: [''],
    });
  }

  searchEval() {
    this.evalService.searchEval(this.field.value, this.data.value).subscribe(
      (response: any[]) => {
        this.evalData = response;
        // console.log('[search-eval.components.ts | searchEval]: ', response);
        this.dataSource = new MatTableDataSource(this.evalData);
      },
      error => {
        this.openSnackBar('Une erreur s\' est produite lors de la récupération des données.', 'snackBarError');
        this.dataError = true;
      }
    );
    this.evalService.retrieveFilteredGraphData(this.field.value, this.data.value, this.graphType1).subscribe(
      (response: any[]) => {
        this.totalScoreGrapData = response;
        // console.log('[search-eval.components.ts | searchEval | retrieveGeneralGraphData]: - General graph w/filter ', response);
      }
    );
    this.evalService.retrieveFilteredGraphData(this.field.value, this.data.value, this.graphType2).subscribe(
      (response: any[]) => {
        this.scorePerSkillGrapData = response;
        // console.log('[search-eval.components.ts | searchEval | retrieveGeneralGraphData]: - Skill graph w/filter', response);
      }
    );
  }

  removeFilters() {
    this.getAllDatas();
    this.searchEvalForm.get('field').setValue('');
    this.searchEvalForm.get('data').setValue('');
  }

  getAllDatas() {
    this.evalService.retrieveAllEvals().subscribe(
      (response: any[]) => {
        this.evalData = response;
        this.dataSource = new MatTableDataSource(this.evalData);
        this.dataObtained = true;
      },
      error => {
        this.openSnackBar('Une erreur s\' est produite lors de la récupération envoie des données.', 'snackBarError');
        this.dataError = true;
      }
    );
    this.evalService.retrieveGeneralGraphData(this.graphType1).subscribe(
      (response: any[]) => {
        //console.log('[search-eval.components.ts | ngOnInit | retrieveGeneralGraphData]: - General graph ', response);
        this.totalScoreGrapData = response;
        this.graphOneData = true;
      }
    );
    this.evalService.retrieveGeneralGraphData(this.graphType2).subscribe(
      (response: any[]) => {
        //console.log('[search-eval.components.ts | ngOnInit | retrieveGeneralGraphData]: - General Skill graph ', response);
        this.scorePerSkillGrapData = response;
        this.graphTwoData = true;
      }
    );
  }

  copyEval(evalId) {
    this.router.navigate(['/copyeval', evalId]);
  }

  editEval(evalId) {
    // console.log('[search-eval.components.ts | editEval]: - evalId ', evalId);
    this.router.navigate(['/updateeval', evalId]);
  }

  deleteEval(evalId) {
    this.evalService.deleteEval(evalId).subscribe();
  }

  onSelect(event) {
    // console.log(event);
  }

  openSnackBar(message, type) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: [type],
    });
  }
}



