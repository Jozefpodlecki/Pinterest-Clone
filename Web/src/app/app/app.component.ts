import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        animate('.1s', style({
          
        }))
      ])
    ])
  ]
})
export class AppComponent {

  backgroundStyle: object;

  constructor() {
    this.backgroundStyle = {
      background: `url(images/app-background.jpg)`,
      filter: `blur(5px) brightness(.5)`
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
