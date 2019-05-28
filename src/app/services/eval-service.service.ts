import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Eval, ReturnedEval } from 'src/app/models/eval';
import { BdInfos } from 'src/app/models/dbInfos';
import { EnvService } from '../env.service';
import { EvalTrackerError } from '../models/evalTrackerError';

@Injectable({
  providedIn: 'root'
})
export class EvalServiceService {

  public evalToSend;

  API_URL = this.env.apiUrl;
  private baseUrl = `${this.API_URL}eval`;

  constructor(private http: HttpClient, private env: EnvService) { }

  createEval(evalToSend: Eval): Observable<ReturnedEval> {
    return this.http.post<ReturnedEval>(`${this.baseUrl}/`, evalToSend );
  }

  retrieveAllEvals(): Observable<Eval[] | EvalTrackerError> {
    return this.http.get<Eval[]>(`${this.baseUrl}/`)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  searchEval(field, data): Observable<Eval[] | EvalTrackerError> {
    return this.http.get<Eval[]>(`${this.baseUrl}/?field=${field}&data=${data}`)
    .pipe(
      catchError(err => this.handleHttpError(err))
    );
  }

  retrieveEvalbyId(id): Observable<Eval> {
    return this.http.get<Eval>(`${this.baseUrl}/getbyid?id=${id}`);
  }

  updateEval(id, evalToSend: Eval): Observable<Eval> {
    return this.http.post<Eval>(`${this.baseUrl}/${id}`, evalToSend );
  }

  deleteEval(id): Observable<BdInfos> {
    return this.http.delete<BdInfos>(`${this.baseUrl}/${id}`)
      .pipe(
        map(i => <BdInfos>{
          id: i.id,
          result: i.result
        })
      );
  }

  retrieveGeneralGraphData(graphType) {
    return this.http.get(`${this.baseUrl}/getgraphdata?graphType=${graphType}`);
  }

  retrieveFilteredGraphData(field, data, graphType) {
    return this.http.get(`${this.baseUrl}/getgraphdata?field=${field}&data=${data}&graphType=${graphType}`);
  }

  private handleHttpError(error: HttpErrorResponse): Observable<EvalTrackerError> {
    const dataError = new EvalTrackerError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.messageToUser = 'Une erreur s\' est produite lors de la récupération des données.';
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

