import { Component, OnInit, ViewChild } from '@angular/core';
import { EvalServiceService } from 'src/app/services/eval-service.service';
import { Eval } from 'src/app/models/eval';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-eval',
  templateUrl: './search-eval.component.html',
  styleUrls: ['./search-eval.component.css']
})
export class SearchEvalComponent implements OnInit {

  private evalData: Eval[] = [];
  displayedColumns: string[] = ['school', 'promotion', 'module', 'category', 'skill', 'homework', 'student', 'score', 'obtainable'];
  dataSource = new MatTableDataSource();
  field = new FormControl();
  data = new FormControl();

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private evalService: EvalServiceService) { }

  ngOnInit() {
    this.evalService.retrieveAllEvals().subscribe(
      (response: any[]) => {
        this.evalData = response;
        console.log('[search-eval.components.ts | ngOnInit]: - response ', response);
        console.log('[search-eval.components.ts | ngOnInit]: - evalData', this.evalData);
        this.dataSource = new MatTableDataSource(this.evalData);
      }
    );
  }

  searchEval() {
    this.evalService.searchEval(this.field.value, this.data.value).subscribe(
      (response: any[]) => {
        this.evalData = response;
        console.log('[search-eval.components.ts | searchEval]: ', response);
        this.dataSource = new MatTableDataSource(this.evalData);
      }
    );
  }

}



