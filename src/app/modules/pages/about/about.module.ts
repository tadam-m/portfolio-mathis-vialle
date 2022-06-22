import { NgModule } from '@angular/core';
import { AboutComponent } from './about.component';
import {Route, RouterModule} from "@angular/router";

const aboutRoutes: Route[] = [
  {
    path     : '',
    component: AboutComponent
  }
];

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    RouterModule.forChild(aboutRoutes),
  ]
})
export class AboutModule { }
