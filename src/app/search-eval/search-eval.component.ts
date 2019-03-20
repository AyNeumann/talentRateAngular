import { Component, OnInit, ViewChild } from '@angular/core';
import { EvalServiceService } from 'src/app/services/eval-service.service';
import { Eval } from 'src/app/models/eval';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

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
        console.log('[search-eval.components.ts | ngOnInit]: ', response);
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



