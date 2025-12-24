import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HomepageFacade } from '../../services/homepage-facade';
import { Card } from '../../../../models/interfaces/api/card';
import { Page } from '../../../../models/interfaces/api/page';
import { tap } from 'rxjs';
import { BACKEND_API_ROADS } from '../../../../constants/backend-api-road';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { CardContainer } from '../../../../shared/components/card-container/card-container';
import { DecklistTotem } from '../../../../shared/components/decklist-totem/decklist-totem';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
