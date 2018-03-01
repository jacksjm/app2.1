import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model';

class CarrinhoService {
	public itens: Array<ItemCarrinho> = []

	public exibirItens(): Array<ItemCarrinho> {
		return this.itens
	}

	public incluirItem(oferta: Oferta): void {
		let itemCarrinho: ItemCarrinho = new ItemCarrinho(
			oferta.id,
			oferta.imagens[0],
			oferta.titulo,
			oferta.descricao_oferta,
			oferta.valor,
			1
		)

		//Verificar se o item em questão já não existe dentro de this.itens
		let itemCarrinhoEncontrado = this.itens.find( (item: ItemCarrinho) => item.id === itemCarrinho.id )

		if (itemCarrinhoEncontrado) {
			itemCarrinhoEncontrado.quantidade += 1
		} else {
			this.itens.push( itemCarrinho )
		}
	}

	public totalCarrinhoCompras(): number {
		let total: number = 0

		this.itens.map( (item: ItemCarrinho) => {
			total += item.quantidade * item.valor
		} )

		return total
	}

	public adicionarQuantidade(itemCarrinho: ItemCarrinho): void{
		let itemCarrinhoEncontrado = this.itens.find( (item: ItemCarrinho) => item.id === itemCarrinho.id )
		if (itemCarrinhoEncontrado){
			itemCarrinhoEncontrado.quantidade++
		}
	}
	public diminuirQuantidade(itemCarrinho: ItemCarrinho): void{
		let itemCarrinhoEncontrado = this.itens.find( (item: ItemCarrinho) => item.id === itemCarrinho.id )
		if (itemCarrinhoEncontrado){
			itemCarrinhoEncontrado.quantidade--
			if (itemCarrinhoEncontrado.quantidade === 0){
				this.itens.splice(this.itens.indexOf(itemCarrinho), 1)
			}
		}
	}

	public limparCarrinho(): void{
		this.itens = []
	}
}

export { CarrinhoService }