import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DGService } from '../../services/dg.service';
import { Products, Escalas } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{
  flagFilter : boolean = false;
  flagOther : boolean = true;


  public products: Products[] = [];
  elementoSeleccionado: any;
  public escalas: Escalas[]=[];

  constructor(
    private _direServices: DGService,
  ){}


  ngOnInit(): void {
    this._direServices.getProducts()
      .subscribe(data => {
        this.products = data;
        console.log('Respuesta del servicio:', data);
      });

      this._direServices.getEscalas()
    .subscribe( escala => this.escalas = escala)

  }

  changeFlagFilter(){
    this.flagFilter = true;
    this.flagOther = false;
  }
  hiddenFilters(){
    this.flagFilter = false;
    this.flagOther = true;
  }
  abrirModal(elemento: any) {
    this.elementoSeleccionado = elemento;
  }
  getEscalasText(indicador_ps: number): string {
    let escalasText = '';
    for (let escalas of this.escalas) {
      if (escalas.id === indicador_ps) {
        escalasText = escalas.text;
        break;
      }
    }
    return escalasText;
  }

}
