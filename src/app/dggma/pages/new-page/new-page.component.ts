import { Component, OnInit } from '@angular/core';
import { DGService } from '../../services/dg.service';

import { Componente, Mdea, Subcomponente, Topico } from '../../interfaces/mdea.interface';
import { Products } from '../../interfaces/product.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})


export class NewPageComponent implements OnInit{

  componentes:Componente[] = []
  subcomponente:Subcomponente[]=[]
  topicos : Topico[]=[]
  mdeasbyCompo: Mdea[]=[]
  products: Products[]=[];
  filteredProducts: Products[]=[];

   constructor( private _direServices: DGService, ){}


  ngOnInit(): void {
    this._direServices.getComponentes().
    subscribe(data => {this.componentes = data;})

    this._direServices.getProducts()
    .subscribe(data => this.products = data )
  }

  onChangeComp(event: any) {
    const id = event.target.value;
    this._direServices.subCompbyId(id).
    subscribe(data => {this.subcomponente = data;});

    //!por componente
    this._direServices.MdeaByCompId(id).subscribe(data => {this.mdeasbyCompo = data; this.productByCompont();})

  }

  productByCompont(){
    this.filteredProducts = this.products.filter(product =>
    this.mdeasbyCompo.some(mdea => mdea.interview__id === product.interview__id));
  }

  onChangeSubComp(event:any){
    const id = event.target.value;
    this._direServices.TopicbyId(id).
    subscribe(data => {this.topicos = data;})
  }



}
