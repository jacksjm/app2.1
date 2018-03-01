import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Pedido } from './shared/pedido.model';
import { URL_API } from './app.api';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

@Injectable()
export class OrdemCompraService {

	constructor(private http: Http) {}

	public efetivarCompra(pedido: Pedido): Observable<number> {

		let headers: Headers = new Headers()

		headers.append('Content-type', 'application/json')

		return this.http.post(
			`${URL_API}/pedidos` ,
			JSON.stringify(pedido),
			new RequestOptions({ headers: headers })
		)
		.map((resposta: Response) => resposta.json().id )
	}
}