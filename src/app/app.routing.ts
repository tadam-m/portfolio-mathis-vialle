import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { PageResolverService } from 'app/core/navigation/page-resolver.service';
// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const baseImageURL = 'https://i.ibb.co';
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'home'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    // {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'modern',
        },
          resolve    : {
              initialData: InitialDataResolver,
          },
        children: [
          {path: 'about',  data: {resolvedData: {imageURL: baseImageURL + '/RydWZkk/pexels-jo-o-jesus-925743.jpg', title: 'Page One'}},
            loadChildren: () => import('app/modules/pages/about/about.module').then(m => m.AboutModule)},
          {path: 'home', data: {resolvedData: {imageURL: baseImageURL + '/RydWZkk/pexels-jo-o-jesus-925743.jpg', title: 'Page Two'}},
              loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
          {path: 'contact', data: {resolvedData: {imageURL: baseImageURL + '/NLt5vZv/pexels-eberhard-grossgasteiger-691668.jpg', title: 'Page Two'}},
            loadChildren: () => import('app/modules/pages/contact-me/contact-me.module').then(m => m.ContactMeModule)},
          {path: 'skills', data: {resolvedData: {imageURL: baseImageURL + '/NLt5vZv/pexels-eberhard-grossgasteiger-691668.jpg', title: 'Page Two'}},
            loadChildren: () => import('app/modules/pages/skills/skills.module').then(m => m.SkillsModule)}
        ]
    },
  // plongeur <img src="https://i.ibb.co/tPzCLF9/pexels-inchs-6702562.jpg" alt="pexels-inchs-6702562" border="0">
  // meduse <img src="https://i.ibb.co/7GdfHpD/pexels-maverick-f-10820363.jpg" alt="pexels-maverick-f-10820363" border="0">
    // // Auth routes for authenticated users
    // {
    //     path: '',
    //     canActivate: [AuthGuard],
    //     canActivateChild: [AuthGuard],
    //     component: LayoutComponent,
    //     data: {
    //         layout: 'empty'
    //     },
    //     children: [
    //         {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
    //         {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
    //     ]
    // },

    // Landing routes
    // {
    //     path: '',
    //     component  : LayoutComponent,
    //     data: {
    //         layout: 'empty'
    //     },
    //     children   : [
    //         {path: 'home', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.LandingHomeModule)},
    //     ]
    // },

    // Admin routes
    // {
    //     path       : '',
    //     canActivate: [AuthGuard],
    //     canActivateChild: [AuthGuard],
    //     component  : LayoutComponent,
    //   data: {
    //     layout: 'modern'
    //   },
    //     resolve    : {
    //         initialData: InitialDataResolver,
    //     },
    //     children   : [
  //         {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
    //     ]
    // }
];
