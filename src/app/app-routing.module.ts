import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonComponentComponent } from './json-component/json-component.component';
import { ImageListComponentComponent } from './image-list-component/image-list-component.component';

const routes: Routes = [
  { path: '',  component: JsonComponentComponent },
  { path: 'json', component: JsonComponentComponent },
  { path: 'imagelist', component: ImageListComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
