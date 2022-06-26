import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import LocomotiveScroll from 'locomotive-scroll';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    styleUrls    : ['./example.css'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ExampleComponent implements OnInit, AfterViewInit {
  // @ViewChild('scrollContent') scrollContent: ElementRef;
  // scroll;

  /**
     * Constructor
     */
    constructor()
    {
    }

    ngOnInit() {
      // this.scroll = new LocomotiveScroll({
      //   el: document.querySelector('[data-scroll-container]'),
      //   smooth: true,
      // });
    }
    ngAfterViewInit() {
        // const ro = new ResizeObserver((entries, observer) => {
        //   entries.forEach((entry, index) => {
        //     const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
        //     if(this.scroll) {
        //       this.scroll.update();
        //     }
        //   });
        // });
        //
        // ro.observe(this.scrollContent.nativeElement);
    }
}
