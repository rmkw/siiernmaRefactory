import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  getLogoClass(): string {
  return window.innerWidth <= 768 ? 'logo-mobile' : 'logo-desktop';
}


}
