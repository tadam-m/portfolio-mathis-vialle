import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactMeComponent } from './contact-me.component';
import {SharedModule} from "../../../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {QuillModule} from "ngx-quill";
import {Route, RouterModule} from "@angular/router";


const contactRoute: Route[] = [
  {
    path     : '',
    component: ContactMeComponent
  }
];

@NgModule({
  declarations: [
    ContactMeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    QuillModule,
    RouterModule.forChild(contactRoute),
  ]
})
export class ContactMeModule { }
