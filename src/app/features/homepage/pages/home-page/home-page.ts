import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { USER_ROAD } from '../../../../constants/routes';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  public router: Router = inject(Router);

  public goToProfile(): void {
    this.router.navigate([USER_ROAD]);
  }

}
