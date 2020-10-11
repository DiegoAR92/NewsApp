import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key' : apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinePage = 0;
  categoriaActual ='';
  categoriaPage=0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query : string){
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadLines(){
    this.headLinePage++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=`+ this.headLinePage);
  }

  getTopHeadLineCategoria(categoria:string){

    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaActual = categoria;
      this.categoriaPage =1;
    }
    
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=de&category=${categoria}&page=${this.categoriaPage}`);
  }

}
