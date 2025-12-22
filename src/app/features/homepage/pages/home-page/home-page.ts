import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { USER_ROAD } from '../../../../constants/routes';
import { UserManager } from '../../../../core/services/user-manager';
import { HomepageFacade } from '../../services/homepage-facade';
import { Card } from '../../../../models/interfaces/api/card';
import { Page } from '../../../../models/interfaces/api/page';
import { tap } from 'rxjs';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { StateService } from '../../../../core/services/state/state-service';
import { Navbar } from '../../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-home-page',
  imports: [Pagination],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  private router: Router = inject(Router);
  private userManager: UserManager = inject(UserManager);
  private homepageFacade: HomepageFacade = inject(HomepageFacade);
  public stateService: StateService = inject(StateService);

  public pageCards: WritableSignal<Page<Array<Card>>> = signal({
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 0,
    first: false,
    last: false,
  });

  ngOnInit() {
    this.loadCardPage(0, false);
  }

  public goToProfile(): void {
    this.router.navigate([USER_ROAD]);
  }

  public getCardImageUrl(imagePath: string): string {
    if (!imagePath) return 'assets/default-card.png';
    return `${BACKEND_API_ROADS.ROOT_URL}/${imagePath.split('ic/')[1]}`;
  }

  public loadCardPage(pageNumber: number, anchorToTopPage: boolean): void {
    this.homepageFacade
      .getCardsByFactionId("7a0c3410-b39f-449b-90d0-ea7f99d71899", pageNumber)
      .pipe(
        tap((cardPage: Page<Array<Card>>) => {
          this.pageCards.set(cardPage);
          anchorToTopPage ? window.scrollTo({ top: 0, behavior: "instant"}) : null; 
        })
      )
      .subscribe();
  }

  public onPageSelect(pageSelected: number): void {
    this.loadCardPage(pageSelected, true);
  }

}
