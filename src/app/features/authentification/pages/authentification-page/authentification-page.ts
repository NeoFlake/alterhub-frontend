import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AUTHENTIFICATION_ROAD } from '../../../../constants/routes';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { LoginForm } from '../../components/login-form/login-form';
import { CreateAccountForm } from '../../components/create-account-form/create-account-form';
import { SwitchFormLink } from '../../components/switch-form-link/switch-form-link';
import { AUTHENTIFICATION_LIBELLE, TITLE_PAGE } from '../../../../constants/authentification-page.constantes';

@Component({
  selector: 'app-authentification-page',
  imports: [LoginForm, CreateAccountForm, SwitchFormLink],
  templateUrl: './authentification-page.html',
  styleUrl: './authentification-page.css',
})
export class AuthentificationPage implements OnInit {

  public readonly LOGIN: string = AUTHENTIFICATION_ROAD.LOGIN;
  public readonly CREATE_ACCOUNT: string = AUTHENTIFICATION_ROAD.CREATE_ACCOUNT;

  public pageTitle: string = TITLE_PAGE.LOGIN;
  public authentificationMode: string = AUTHENTIFICATION_ROAD.LOGIN;
  public redirectionLibelle: string = AUTHENTIFICATION_LIBELLE.LOGIN;
  public redirectLink: string = `${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.CREATE_ACCOUNT}`;

  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.authentificationMode = this.route.snapshot.url.map((segment: UrlSegment) => segment.path)[1];
    if(this.authentificationMode === this.CREATE_ACCOUNT){
      this.pageTitle = TITLE_PAGE.CREATE_ACCOUNT;
      this.redirectionLibelle = AUTHENTIFICATION_LIBELLE.CREATE_ACCOUNT;
      this.redirectLink = `${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.LOGIN}`;
    }
  }

}
