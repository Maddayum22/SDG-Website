/** @author Madelief van Slooten */

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

  // This can later be an object with the corresponding router link routes bound to it.
  public footerContent(): string[] {
    return ['Take the Quiz!', 'SDG Information', 'Contact', 'Register', 'Terms and Conditions'];
  }

}
