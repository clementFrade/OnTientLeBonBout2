import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQuestionnaire } from 'app/shared/model/questionnaire.model';
import { AccountService, Account } from 'app/core';
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

  constructor(
    protected questionnaireService: QuestionnaireService,
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
        }
      }
    });
    this.registerChangeInQuestionnaires();

    console.log('HEY' + this.isClient);
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
