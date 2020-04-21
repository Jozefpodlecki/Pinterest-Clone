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
