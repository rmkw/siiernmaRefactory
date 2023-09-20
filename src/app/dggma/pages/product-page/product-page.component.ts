import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DGService } from '../../services/dg.service';
import { Products, Escalas, SecuenciaVar } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{

  public products: Products[] = [];
  public escalas: Escalas[]=[];
  public secuenciaVAR: SecuenciaVar[]=[]



  flagFilter : boolean = false;
  flagOther : boolean = true;
  elementoSeleccionado: any;
  expandedIndex: number | null = null;


  constructor(
    private _direServices: DGService,
  ){}


  ngOnInit(): void {

    //! TODOS LOS PRODUCTOS
    this._direServices.getProducts()
      .subscribe(data => {
        this.products = data;
        console.log('Respuesta del servicio:', data);
      });

      //! ESCALAS
      this._direServices.getEscalas()
    .subscribe( escala => this.escalas = escala);



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

    //! VARIABLES
    this._direServices.getSecuenciaVARBy(this.elementoSeleccionado.interview__id)
    .subscribe( data => { this.secuenciaVAR = data});



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
