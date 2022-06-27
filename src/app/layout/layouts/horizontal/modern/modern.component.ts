import {
  AfterViewInit,
  Component, ElementRef,
  OnDestroy,
  OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, Subject, Subscription, takeUntil} from 'rxjs';
import {FuseMediaWatcherService} from '@fuse/services/media-watcher';
import {Navigation} from 'app/core/navigation/navigation.types';
import {NavigationService} from 'app/core/navigation/navigation.service';
import LocomotiveScroll from 'locomotive-scroll';

@Component({
  selector: 'modern-layout',
  templateUrl: './modern.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ModernLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollContent') scrollContent: ElementRef;
  scroll;

  isScreenSmall: boolean;
  navigation: Navigation;
  showMenu: boolean = false;

  imageURL: string = '';
  title: string = '';
  forceReflow: boolean = false;
  private settingsSubscription: Subscription;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _route: ActivatedRoute,
    private _navigationService: NavigationService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    // private settingsConsumer: AbstractSettingsConsumer,
  ) {
    this.showMenu = false;
    this._route.url.subscribe(() => {
      this.imageURL = this._route.snapshot.firstChild.data.resolvedData.imageURL;
      this.title = this._route.snapshot.firstChild.data.resolvedData.title;
    });
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.imageURL = this._route.snapshot.firstChild.data.resolvedData.imageURL;
      this.title = this._route.snapshot.firstChild.data.resolvedData.title;
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to navigation data
    this._navigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: Navigation) => {
        this.navigation = navigation;
      });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({matchingAliases}) => {

        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
      });
    this.scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      mobile: {
        breakpoint: 0,
        smooth: false
      },
      tablet: {
       breakpoint: 0,
       smooth: false
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    const ro = new ResizeObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
        if(this.scroll) {
          this.scroll.update();
        }
      });
    });

    ro.observe(this.scrollContent.nativeElement);
  }

  showMenuMobile(): void {
    this.showMenu = !this.showMenu;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  scrollToElem(id: string): void {
    let el = document.getElementById(id);
    this.scroll.scrollTo( el, {
      'offset': 0,
      'callback': function() {
        // do something...
      },
      'duration': 800,
      'easing': [0.25, 0.00, 0.35, 1.00],
      'disableLerp': true
    } );
  }
}
