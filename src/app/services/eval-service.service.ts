import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eval } from 'src/app/models/eval';

@Injectable({
  providedIn: 'root'
})
export class EvalServiceService {

  public evalToCreate;

  private baseUrl = 'http://localhost:8080/eval';

  constructor(private http: HttpClient) { }

  createEval(evalToCreate: Eval): Observable<Object> {
    console.log('[eval-service | createEval]:', evalToCreate);
    return this.http.post(`${this.baseUrl}/`, evalToCreate);
  }

  retrieveAllEvals() {
    return this.http.get(`${this.baseUrl}/`);
  }

  searchEval(field, data) {
    return this.http.get(`${this.baseUrl}/?field=${field}&data=${data}`);
  }
}
