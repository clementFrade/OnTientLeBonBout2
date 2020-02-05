import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuestionnaire, Questionnaire } from 'app/shared/model/questionnaire.model';
import { NgForm } from '@angular/forms';
import { Reponse } from 'app/shared/model/reponse.model';
import { ReponseService } from '../reponse';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'jhi-questionnaire-detail',
  templateUrl: './questionnaire-detail.component.html'
})
export class QuestionnaireDetailComponent implements OnInit {
  questionnaire: IQuestionnaire;
  list_rep: Array<String>;
  reponseService: ReponseService;
  id: number;
  point:number=0;

  constructor(protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ questionnaire }) => {
      this.questionnaire = questionnaire;
    });
  }
  previousState() {
    window.history.back();
  }
  photoURL(url) {

  }
onSubmit(form: NgForm) {
  this.point=0;
  this.list_rep = form.value;
  console.log(this.list_rep);
  //this.list_rep.forEach(element => console.log(element));
  for(const element in this.list_rep){
    const valide = form.value[element];
    console.log(valide,element);
    this.id = +element;
    console.log(this.id);
    //console.log(this.reponseService.find(this.id));
    for(const i of this.questionnaire.questions){
      for (const j of i.reponses){
        if(j.id==(+element)){
          console.log(j.id,j.intitule,j.valide,valide);
          if(j.valide==true && valide==true){
              console.log(j.intitule,j.valide,valide);
              this.point=this.point+1; 
          } 
          if(j.valide==false && valide==true){
            this.point=this.point-1;
          }
        }
      }
    }
    }
    console.log(this.point);
  }
}

