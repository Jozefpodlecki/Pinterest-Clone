import { Component, OnInit } from '@angular/core';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {
  faSadTear = faSadTear;
  
  constructor() { }

  ngOnInit(): void {
  }

}
