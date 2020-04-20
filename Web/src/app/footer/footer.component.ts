import { Component, OnInit } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const getCurrentYear = () => {
  return new Date().getFullYear();
}

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  author = ` ${getCurrentYear()} Józef Podlecki`;
  socials = [
    {
      icon: faGlobe,
      link: "https://google.com"
    },
    {
      icon: faGithub,
      link: "https://google.com"
    },
    {
      icon: faLinkedin,
      link: "https://google.com"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
