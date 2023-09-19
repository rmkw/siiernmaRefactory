import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DGService } from '../../services/dg.service';
import { Products } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{


  public products: Products[] = [];

  constructor(
    private _direServices: DGService,
  ){}


  ngOnInit(): void {
    this._direServices.getProducts()
      .subscribe(data => {
        this.products = data;
        console.log('Respuesta del servicio:', data);
      });

  }

}
