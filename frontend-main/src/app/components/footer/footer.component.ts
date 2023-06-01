/** @author Madelief van Slooten & Sven Molenaar */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public footerContent(): string[] {
    return ['Made by The DataBase Detectives 2023 ©'];
  }

}
