import { MetaODS, SecuenciaOds, Ods } from './../../interfaces/ods.interface';
import { DGService } from './../../services/dg.service';
import { Component, OnInit } from '@angular/core';
import { Products } from '../../interfaces/product.interface';

@Component({
  selector: 'app-ods-page',
  templateUrl: './ods-page.component.html',
  styleUrls: ['./ods-page.component.css']
})
export class OdsPageComponent implements OnInit{
  public products: Products[] = [];
  public ods?: SecuenciaOds[]=[];
  public objetivods: Ods[]=[];
  public metaods: MetaODS[]=[];
  objetivo: Ods[] = [];
  meta: MetaODS []= [];

  filteredProducts: Products[] = [];
  noProductsFound: boolean = false;
  odsImg: boolean = false;
  showFilteredProducts = false;



  constructor(
    private _direServices: DGService
    )
    {}


    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    odsByProducts(){

      this.filteredProducts = this.products.filter(data => this.ods?.some(ods => ods.interview__id === data.interview__id))
       console.log(this.filteredProducts)

       if (this.filteredProducts.length === 0) {
        this.noProductsFound = true;
      } else {
        this.noProductsFound = false;
      }
   }


    SelectorODS(event: any)  {

      const id = event.target.value;
      this._direServices.metasByparentid(id)
      .subscribe( data => {
        this.meta = data;


        if (id >= 1) {
          this.odsImg = true;
        }


      })
      this._direServices.odsByObjetivo(id)
      .subscribe(data => {
        this.ods = data;
        this.odsByProducts()
      })

    }

    SelectorMetas(event: any)  {
      const id = event.target.value;
      console.log(id);

      this._direServices.odsByMeta(id)
      .subscribe(data => {
        this.ods = data;
        this.odsByProducts()
      })


    }


  ngOnInit(): void{

    this._direServices.productos()
    .subscribe(data => this.products = data )

    this._direServices.objetivos()
  .subscribe( objetivoOds => this.objetivods = objetivoOds)

  this._direServices.metas()
  .subscribe( metaOds => this.metaods = metaOds)

  }
  allFalse(): void {

    this.showFilteredProducts = false;

    this.ngOnInit();
  }
}
