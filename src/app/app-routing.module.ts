import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchEvalComponent } from './search-eval/search-eval.component';
import { CreateEvalComponent } from './create-eval/create-eval.component';
import { UpdateEvalComponent } from './update-eval/update-eval.component';

const routes: Routes = [
  {path: '', component: SearchEvalComponent},
  {path: 'search', component: SearchEvalComponent},
  {path: 'create', component: CreateEvalComponent},
  {path: 'updateeval', component: UpdateEvalComponent} //A AJOUTER POUR PARAMS: /:evalId
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
