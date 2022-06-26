import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import {AboutModule} from "../../pages/about/about.module";
import {HomeModule} from "../../pages/home/home.module";
import {ContactMeModule} from "../../pages/contact-me/contact-me.module";
import {BackgroundModule} from "../../../layout/layouts/background/background.module";

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ExampleComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent,
    ],
    imports: [
        RouterModule.forChild(exampleRoutes),
        AboutModule,
        HomeModule,
        ContactMeModule,
        BackgroundModule,
    ]
})
export class ExampleModule
{
}
