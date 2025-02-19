// app-routing.module.ts
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SvgEditorComponent} from './components/svg-editor/svg-editor.component';

const routes: Routes = [
  {path: '', component: SvgEditorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
