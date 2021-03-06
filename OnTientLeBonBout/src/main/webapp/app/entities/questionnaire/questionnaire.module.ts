import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

import { OnTientLeBonBoutSharedModule } from 'app/shared';
import {
  QuestionnaireComponent,
  QuestionnaireDetailComponent,
  QuestionnaireUpdateComponent,
  QuestionnaireDeletePopupComponent,
  QuestionnaireDeleteDialogComponent,
  questionnaireRoute,
  questionnairePopupRoute,
} from './';
import './safepipe.ts'
const ENTITY_STATES = [...questionnaireRoute, ...questionnairePopupRoute];

@NgModule({
  imports: [OnTientLeBonBoutSharedModule, RouterModule.forChild(ENTITY_STATES), FormsModule, ReactiveFormsModule],
  declarations: [
    QuestionnaireComponent,
    QuestionnaireDetailComponent,
    QuestionnaireUpdateComponent,
    QuestionnaireDeleteDialogComponent,
    QuestionnaireDeletePopupComponent
  ],
  entryComponents: [
    QuestionnaireComponent,
    QuestionnaireUpdateComponent,
    QuestionnaireDeleteDialogComponent,
    QuestionnaireDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnTientLeBonBoutQuestionnaireModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
