import { Component, ViewEncapsulation } from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    styleUrls    : ['./example.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ExampleComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
