import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import {Route, RouterModule} from "@angular/router";

const skillsRoute: Route[] = [
  {
    path     : '',
    component: SkillsComponent
  }
];

@NgModule({
  declarations: [
    SkillsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(skillsRoute),
  ]
})
export class SkillsModule { }
