import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eval } from 'src/app/models/eval';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvalServiceService {

  public evalToSend;

  //'http://localhost:8080/'
  private API_URL = environment.API_URL;
  private baseUrl = `${this.API_URL}eval`;

  constructor(private http: HttpClient) { };

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
    return this.http.post(`${this.baseUrl}/${id}`, evalToSend);
  }

  // TODO: Create back end.
  deleteEval(id) {
    return this.http.delete(`${this.baseUrl}/deleteeval?id=${id}`);
  }

  retrieveGeneralGraphData(graphType){
    return this.http.get(`${this.baseUrl}/getgraphdata?graphType=${graphType}`);
  }

  retrieveFilteredGraphData(field, data, graphType) {
    return this.http.get(`${this.baseUrl}/getgraphdata?field=${field}&data=${data}&graphType=${graphType}`);
  }
}
