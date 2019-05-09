import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchEvalComponent } from './search-eval/search-eval.component';
import { CreateEvalComponent } from './create-eval/create-eval.component';
import { UpdateEvalComponent } from './update-eval/update-eval.component';
import { CreateEvalBasedOnComponent } from './create-eval-based-on/create-eval-based-on.component';

const routes: Routes = [
  {path: '', component: SearchEvalComponent},
  {path: 'search', component: SearchEvalComponent},
  {path: 'create', component: CreateEvalComponent},
  {path: 'updateeval/:evalId', component: UpdateEvalComponent},
  {path: 'copyeval/:evalId', component: CreateEvalBasedOnComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
