import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, animate, style, query } from '@angular/animations';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.2s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('.2s', style({ opacity: 0 }))
      ])
      // transition('* <=> *', [
      //   query(':enter', style({
      //     opacity: 1
      //   }), { optional: true }),
      //   query(':leave', style({
      //     position: 'absolute',
      //     opacity: 0
      //   }), { optional: true })
      // ])
    ])
  ]
})
export class AppComponent {

  backgroundStyle: object;

  constructor() {
    const link = `images/app-background.jpg`;
    this.backgroundStyle = {
      filter: `blur(5px) brightness(.5)`
    };

    this.getImage(link)
      .then(pr => {
        this.backgroundStyle = {
          ...this.backgroundStyle,
          background: `url(${link}) `
        }
      })
      .catch(pr => {
        this.backgroundStyle = {
          ...this.backgroundStyle,
          background: 'black',
        }
      })
  }
  
  animationStart(event: Event) {
    
  }

  animationEnd(event: Event) {
    
  }

  getImage(link: string) {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = link;
  
      const onLoad = () => {
        image.removeEventListener("load", onLoad)
        resolve();
      }

      image.addEventListener("load", onLoad)
      
      const onError = () => {
        image.removeEventListener("error", onError)
        reject();
      }
      
      image.addEventListener("error", onError)
    })
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
