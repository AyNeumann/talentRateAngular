import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Eval } from 'src/app/models/eval';
import { EvalServiceService } from 'src/app/services/eval-service.service';
import { EvalTrackerError } from '../models/evalTrackerError';

@Injectable({
  providedIn: 'root'
})
export class EvalResolverService implements Resolve<Eval | EvalTrackerError> {

  constructor(private evalService: EvalServiceService) { }

  // TODO: faire en sorte que l'aplli ne charga pas la page de copy ou d'update ou que l'utilisateur soit renvoyé vers
  // la page d'acceuil avec un message d'erreur.
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Eval | EvalTrackerError> {
    console.log(this.evalService.retrieveEvalbyId(route.paramMap.get('evalId')));
    return this.evalService.retrieveEvalbyId(route.paramMap.get('evalId'))
    .pipe(
      catchError(err => of(err))
    );
  }
}
