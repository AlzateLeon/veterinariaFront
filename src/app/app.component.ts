import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  './lib/flaticon/font/flaticon.css',
  './lib/owlcarousel/assets/owl.carousel.min.css',
  './lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css']
})
export class AppComponent {
  title = 'front-veterinaria';

  constructor(private router: Router) { }

}
