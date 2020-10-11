import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { not } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias : Article[] = []

  constructor(private storage: Storage) { }

guardarNoticia (noticia : Article){

  const existe = this.noticias.find(noti => noti.title === noticia.title);
  console.log('a',existe)
  if(!existe)
  {
    this.noticias.unshift(noticia);
    this.storage.set('favoritos', this.noticias);
  }
}

async cargarFavorito(){
   const favoritos = await this.storage.get('favoritos');
  
   if(favoritos === undefined) return;
   this.noticias = favoritos;
  
}

async borrarNoticia( noticia : Article){
  this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
  this.storage.set('favoritos', this.noticias);
}

}
