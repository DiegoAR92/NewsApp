import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { RespuestaTopHeadLines, Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias : Article[]  = [];

  constructor( private noticiasServices: NoticiasService) {

  }

  ngOnInit(){
    this.cargarNoticias();
    
  }

  loadData( event ){
    console.log(event)
    this.cargarNoticias( );

  }


  cargarNoticias(event?){
    this.noticiasServices.getTopHeadLines()
    .subscribe( resp => {
        if(resp.articles.length === 0){
          event.target.complete();
          event.target.disabled = true;

          return;
        }

        this.noticias.push( ...resp.articles);

        if(event){
          event.target.complete();
        }
    });
  } 
}
