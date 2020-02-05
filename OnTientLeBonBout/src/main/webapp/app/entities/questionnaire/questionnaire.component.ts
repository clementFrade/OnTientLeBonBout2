import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQuestionnaire } from 'app/shared/model/questionnaire.model';
import { AccountService, Account, UserService } from 'app/core';
import { QuestionnaireService } from './questionnaire.service';

@Component({
  selector: 'jhi-questionnaire',
  templateUrl: './questionnaire.component.html'
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  questionnaires: IQuestionnaire[];
  currentAccount: any;
  account: Account;
  eventSubscriber: Subscription;
  isClient: Boolean = false;
  quest: IQuestionnaire[] = [];
  doitAfficher: Boolean;

  constructor(
    protected questionnaireService: QuestionnaireService,
    protected userService: UserService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.questionnaireService
      .query()
      .pipe(
        filter((res: HttpResponse<IQuestionnaire[]>) => res.ok),
        map((res: HttpResponse<IQuestionnaire[]>) => res.body)
      )
      .subscribe(
        (res: IQuestionnaire[]) => {
          this.questionnaires = res;
          for (let element of this.account.authorities) {
            if (element === 'ROLE_ADMIN') {
              this.isClient = true;
            }
          }
          if (!this.isClient) {
            for (let _i = 0; _i < res.length; _i++) {
              for (let us of this.questionnaires[_i].users) {
                console.log('this.account.login : ' + this.account.login);
                console.log('us.login' + us.login);
                if (us.login === this.account.login) {
                  console.log(this.quest);
                  this.quest.push(this.questionnaires[_i]);
                  break;
                }
              }
            }
            this.questionnaires = this.quest;
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
      this.account = account;
      for (let element of account.authorities) {
        if (element === 'ROLE_ADMIN') {
          this.isClient = true;
          console.log('coucou');
        }
      }
    });
    this.registerChangeInQuestionnaires();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IQuestionnaire) {
    return item.id;
  }

  registerChangeInQuestionnaires() {
    this.eventSubscriber = this.eventManager.subscribe('questionnaireListModification', response => this.loadAll());
    this.accountService.identity().then(account => {
      this.account = account;
    });
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
