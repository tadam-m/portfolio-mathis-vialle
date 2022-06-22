import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {Observable} from "rxjs";

export interface IResolvedData {
  imageURL: string;
  title: string;
}

// StackBlitz local asset loading doesn't work any more (April 2019)
const galaxiesURL = 'https://i.ibb.co/NpmV56j/galaxies.jpg';
const starsURL = 'https://i.ibb.co/Fq3Kr2f/stars.jpg';

@Injectable()
export class PageResolverService implements Resolve<IResolvedData> {

  constructor() {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResolvedData> {

    const param = route.paramMap.get('id');
    let url = ''
    if(param === 'stars') {
      url = starsURL;
    }
    else {
      url = galaxiesURL;
    }

    return new Observable(observer => {
      observer.next({ imageURL: url, title: `Reused Route (${param})` });
      observer.complete();
    });
  }

}
