import { Component, OnInit } from '@angular/core';
import { UAdmin } from '../../interfaces/u_admin.interface';
import { DGService } from '../../services/dg.service';
import { Componente, Mdea } from '../../interfaces/mdea.interface';
import { Products } from '../../interfaces/product.interface';


@Component({
  selector: 'app-dg',
  templateUrl: './dg.component.html',
  styleUrls: ['./dg.component.css']
})
export class DgComponent implements OnInit{

  loading = true;


public componentesMDEA: Componente[]=[];
  public dgs: UAdmin[] = [];
  productCounts: number[] = [];
  public imgArray: any[] = [];


  public contandoProductos?: Mdea[]=[];

  constructor(
    private _direServices: DGService,
  ){}

  ngOnInit(): void {
    this._direServices.getComponentes().subscribe(componentes => {
  this.componentesMDEA = componentes;
  console.log(this.componentesMDEA); // Esto debería mostrar los datos correctamente
});

    const directions = ['1','2','3','4','5']; //id de direcciones

    directions.forEach(direction => {
      this._direServices.getProductCountByDirection(direction).subscribe(count => {
        this.productCounts.push(count);
      }); //me trae el numero de productos que tiene cada dirección
    });

    this._direServices.getDG().subscribe(dgs => {
      this.dgs = dgs;
      this.loading = false;
    }); // me traigo todas las direcciones


    const imgArray: any[] = [];
    const extensions = ['jpg', 'jpg', 'jpg', 'png', 'png']; // Cambia según tus necesidades
    for (let i = 0; i < extensions.length; i++) {
      const imgExtension = extensions[i];
      imgArray.push({ img: `./assets/img${i + 1}.${imgExtension}` });
      this.imgArray = imgArray;
    }
    console.log(imgArray);



    this._direServices.cuantosProdcutosCompo1().subscribe(contando =>{
     this.contandoProductos = contando,
     console.log(this.componentesMDEA)
    })

  }



}
