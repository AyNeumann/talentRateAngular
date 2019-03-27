import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eval } from 'src/app/models/eval';

@Injectable({
  providedIn: 'root'
})
export class EvalServiceService {

  public evalToSend;

  private baseUrl = 'http://localhost:8080/eval';

  constructor(private http: HttpClient) { }

  createEval(evalToSend: Eval): Observable<Object> {
    return this.http.post(`${this.baseUrl}/`, evalToSend);
  }

  retrieveAllEvals() {
    return this.http.get(`${this.baseUrl}/`);
  }

  searchEval(field, data) {
    return this.http.get(`${this.baseUrl}/?field=${field}&data=${data}`);
  }

  retrieveEvalbyId(id) {
    return this.http.get(`${this.baseUrl}/getbyid?id=${id}`);
  }

  updateEval(id, evalToSend: Eval) {
    console.log('[eval-service.service.ts |updatedEval]: ', `${this.baseUrl}/?id=${id}`, evalToSend );
    return this.http.post(`${this.baseUrl}/${id}`, evalToSend);
  }

  deleteEval(id) {
    return this.http.delete(`${this.baseUrl}/deleteeval?id=${id}`);
  }
}
