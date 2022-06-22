import {ChangeDetectorRef, Component, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnChanges {

  @Input() backgroundColor = 'black';
  @Input() imageURL: string;
  @Input() forceReflow: boolean;

  revealImage = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // ngOnInit not called for reused routing components, so
    // need to use ngOnChanges with a check for the particular property
    if (changes['imageURL']) {
      if (this.isBrowser) {
        this.updateImage();
      }
    }
  }


  updateImage() {
    this.revealImage = false;
    if (this.forceReflow) {
      // Apply data binding - removes reveal-image class
      this.changeDetectorRef.detectChanges();
      // Force a Recalculate Style so the 'reveal-image' style is applied
      // The div.cover element will then have { opactiy: 0 and visibility: hidden)
      BackgroundComponent.forceRecalculateStyle();
    }

    // Load the image into the browser cache first. When loaded,
    // apply the transition css class and background-image:url() at the
    // same time by setting revealImage=true
    if (this.imageURL) {
      const image: HTMLImageElement = document.createElement('img');
      let self = this;
      image.addEventListener('load', function handleImageLoad() {
        self.revealImage = true;
        image.removeEventListener('load', handleImageLoad);
      });
      image.src = this.imageURL; // begin loading image (to browser cache)
    }
  }

  private static forceRecalculateStyle() {
    return window.scrollY;
  }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
