import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../ofertas.service';
import { CarrinhoService } from '../carrinho.service';

import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta

  constructor(
	  private route: ActivatedRoute,
	  private ofertaService: OfertasService,
	  private carrinhoService: CarrinhoService
	) { }

  ngOnInit() {
	  //Recuperação com Snapshot
	  //this.route.snapshot.params.id
	  //Recuperação com Subscribe
	  //this.route.params.subscribe((parametro: any)=>{console.log(parametro)})
	this.route.params.subscribe((parametros: Params) => {
		this.ofertaService.getOfertaPorId(parametros.id)
		.then(
			( ofertas: Oferta ) => {
					this.oferta = ofertas
				}
		)
		.catch(
			( param: any ) => { console.log( param ) }
		)
	})
  }

  ngOnDestroy(){
  }
  public adicionarItemCarrinho():void{
	this.carrinhoService.incluirItem(this.oferta)
	console.log(this.carrinhoService.exibirItens())
  }

}
