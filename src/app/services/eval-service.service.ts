import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Eval, ReturnedEval } from 'src/app/models/eval';
import { BdInfos } from 'src/app/models/dbInfos';
import { EnvService } from '../env.service';
import { EvalTrackerError } from '../models/evalTrackerError';
import { MutliStackedGraphData } from '../models/graphData';

@Injectable({
  providedIn: 'root'
})
export class EvalServiceService {

  public evalToSend;

  API_URL = this.env.apiUrl;
  private baseUrl = `${this.API_URL}eval`;

  constructor(private http: HttpClient, private env: EnvService) { }

  createEval(evalToSend: Eval): Observable<ReturnedEval | EvalTrackerError> {
    return this.http.post<ReturnedEval>(`${this.baseUrl}/`, evalToSend )
      .pipe(
        catchError(err => this.handleHttpError(err, 'create'))
      );
  }

  retrieveAllEvals(): Observable<Eval[] | EvalTrackerError> {
    return this.http.get<Eval[]>(`${this.baseUrl}/`)
      .pipe(
        catchError(err => this.handleHttpError(err, 'retrieve'))
      );
  }

  searchEval(field, data): Observable<Eval[] | EvalTrackerError> {
    return this.http.get<Eval[]>(`${this.baseUrl}/?field=${field}&data=${data}`)
    .pipe(
      catchError(err => this.handleHttpError(err, 'retrieve'))
    );
  }

  retrieveEvalbyId(id: String): Observable<Eval | EvalTrackerError> {
    return this.http.get<Eval>(`${this.baseUrl}/getbyid?id=${id}`)
    .pipe(
      catchError(err => this.handleHttpError(err, 'retrieve'))
    );
  }

  updateEval(id: String, evalToSend: Eval): Observable<Eval | EvalTrackerError> {
    return this.http.post<Eval>(`${this.baseUrl}/${id}`, evalToSend )
    .pipe(
      catchError(err => this.handleHttpError(err, 'update'))
    );
  }

  deleteEval(id: String): Observable<BdInfos | EvalTrackerError> {
    return this.http.delete<BdInfos>(`${this.baseUrl}/${id}`)
      .pipe(
        map(i => <BdInfos>{
          id: i.id,
          result: i.result
        }),
        catchError(err => this.handleHttpError(err, 'delete'))
      );
  }

  retrieveGeneralGraphData(graphType: String): Observable<MutliStackedGraphData[]> {
    return this.http.get<MutliStackedGraphData[]>(`${this.baseUrl}/getgraphdata?graphType=${graphType}`);
  }

  retrieveFilteredGraphData(field: String, data: String, graphType: String): Observable<MutliStackedGraphData[]> {
    return this.http.get<MutliStackedGraphData[]>(`${this.baseUrl}/getgraphdata?field=${field}&data=${data}&graphType=${graphType}`);
  }

  // retrieveAllEvals + searchEval + retrieveEvalbyId
  private handleHttpError(error: HttpErrorResponse, flag: String): Observable<EvalTrackerError> {
    const dataError = new EvalTrackerError();
    let action: String;
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    if (flag === 'create') {
      action = ' création ';
    } else if (flag === 'retrieve') {
      action = ' récupération ';
    } else if (flag === 'update') {
      action = ' mise à jour ';
    } else if (flag === 'delete') {
      dataError.messageToUser = ' suppression ';
    }
    dataError.messageToUser = `Une erreur s\' est produite lors de la ${action} des données.`;
    console.log(
      `Erreur lors de la ${action} des evals: \n`,
      'Http error number: ', dataError.errorNumber, '\n',
      'Htpp error message:', dataError.message
    );
    return throwError(dataError);
  }

  /* retrieveAllEvalsHeaderExample(): Observable<Eval[]> {
    return this.http.get<Eval[]>(`${this.baseUrl}/`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token',
        'Content-Type' : 'application/json'
      })
    });
  } */
}

