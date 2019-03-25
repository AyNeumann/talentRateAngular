import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EvalServiceService } from 'src/app/services/eval-service.service';

@Component({
  selector: 'app-student-update-eval',
  templateUrl: './update-eval.component.html',
  styleUrls: ['./update-eval.component.css']
})
export class UpdateEvalComponent implements OnInit {
  evalId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evalService: EvalServiceService
  ) { }

  ngOnInit() {
    /*this.route.params.subscribe((params: Params) => {
      this.evalId = params['evalId'];
      //Récupérer eval avec l'id passer en paramètre
    });*/
  }

}
