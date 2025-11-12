import { Component, inject, OnInit } from '@angular/core';
import { AUTHENTIFICATION_ROAD } from '../../../../constants/routes';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { LoginForm } from '../../components/login-form/login-form';
import { CreateAccountForm } from '../../components/create-account-form/create-account-form';

@Component({
  selector: 'app-authentification-page',
  imports: [LoginForm, CreateAccountForm],
  templateUrl: './authentification-page.html',
  styleUrl: './authentification-page.css',
})
export class AuthentificationPage implements OnInit {

  public readonly LOGIN = AUTHENTIFICATION_ROAD.LOGIN;
  public readonly CREATE_ACCOUNT = AUTHENTIFICATION_ROAD.CREATE_ACCOUNT;

  public authentificationMode: string = AUTHENTIFICATION_ROAD.LOGIN;

  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.authentificationMode = this.route.snapshot.url.map((segment: UrlSegment) => segment.path)[1]; 
  }

}
