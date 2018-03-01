import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Oferta } from "./shared/oferta.model"
import { URL_API } from "./app.api"
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
//import 'rxjs/add/operator/toPromise'

@Injectable()
export class OfertasService {

	constructor(private http: Http){}

	public getOfertas(): Promise<Array<Oferta>> {
		//Efetua uma requisição HTTP e retorna um promisse Array<Oferta>
		return this.http.get(`${URL_API}/ofertas?destaque=true`)
			.toPromise()
			.then( ( resposta: Response ) => resposta.json() )
	}
	public getOfertasPorCategorias(categoria: string): Promise<Array<Oferta>> {
		return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
			.toPromise()
			.then( ( resposta: Response ) => resposta.json() )
	}
	public getOfertaPorId(id: number): Promise<Oferta>{
		return this.http.get(`${URL_API}/ofertas?id=${id}`)
		.toPromise()
		.then( ( resposta: Response ) => resposta.json().shift() )
	}

	public getComoUsarOfertaPorId(id: number): Promise<string>{
		return this.http.get(`${URL_API}/como-usar?id=${id}`)
		.toPromise()
		.then( ( resposta: Response ) => resposta.json().shift().descricao )
	}

	public getOndeFicaOfertaPorId(id: number): Promise<string>{
		return this.http.get(`${URL_API}/onde-fica?id=${id}`)
		.toPromise()
		.then( ( resposta: Response ) => resposta.json().shift().descricao )
	}

	public pesquisaOfertas( termo: string): Observable<Array<Oferta>>{
		return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
			.retry(10)
			.map( (resposta: Response) => resposta.json() )
	}
}