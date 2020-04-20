import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;
  displayName: FormControl;

  constructor() {
    this.displayName = new FormControl('', [Validators.required]);

    this.settingsForm = new FormGroup({
      displayName: this.displayName,
    });
  }

  ngOnInit(): void {
  }

  selectImage() {
    
  }

  onSubmit() {

  }
}
