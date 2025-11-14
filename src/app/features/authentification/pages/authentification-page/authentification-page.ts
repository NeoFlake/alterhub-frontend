import { Component, inject, model, OnInit, signal, WritableSignal } from '@angular/core';
import { AUTHENTIFICATION_ROAD } from '../../../../constants/routes';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { LoginForm } from '../../components/login-form/login-form';
import { CreateAccountForm } from '../../components/create-account-form/create-account-form';
import { SwitchFormLink } from '../../components/switch-form-link/switch-form-link';
import { AUTHENTIFICATION_LIBELLE, TITLE_PAGE } from '../../../../constants/authentification-page.constantes';
import { FeedbackPanel } from '../../components/feedback-panel/feedback-panel';

@Component({
  selector: 'app-authentification-page',
  imports: [LoginForm, CreateAccountForm, SwitchFormLink, FeedbackPanel],
  templateUrl: './authentification-page.html',
  styleUrl: './authentification-page.css',
})
export class AuthentificationPage implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);

  public readonly LOGIN: string = AUTHENTIFICATION_ROAD.LOGIN;
  public readonly CREATE_ACCOUNT: string = AUTHENTIFICATION_ROAD.CREATE_ACCOUNT;

  public pageTitle: string = TITLE_PAGE.LOGIN;
  public authentificationMode: string = AUTHENTIFICATION_ROAD.LOGIN;
  public redirectionLibelle: string = AUTHENTIFICATION_LIBELLE.LOGIN;
  public redirectLink: string = `${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.CREATE_ACCOUNT}`;

  public feedBackData = model<{ statut: string; codeRetour: number; message: string }>({
    statut: "",
    codeRetour: 0,
    message: ""
  });

  ngOnInit(): void {
    this.authentificationMode = this.route.snapshot.url.map((segment: UrlSegment) => segment.path)[1];
    if(this.authentificationMode === this.CREATE_ACCOUNT){
      this.pageTitle = TITLE_PAGE.CREATE_ACCOUNT;
      this.redirectionLibelle = AUTHENTIFICATION_LIBELLE.CREATE_ACCOUNT;
      this.redirectLink = `${AUTHENTIFICATION_ROAD.ROOT}/${AUTHENTIFICATION_ROAD.LOGIN}`;
    }
  }

  public handleFeedBackForm(feedBackData: { statut: string; codeRetour: number; message: string }){
    this.feedBackData.set(feedBackData);
  }

}
