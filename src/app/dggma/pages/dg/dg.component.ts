import { Component, OnInit } from '@angular/core';

import { DGService } from '../../services/dg.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

interface CheckboxesState {
  [key: string]: boolean;
}
@Component({
  selector: 'app-dg',
  templateUrl: './dg.component.html',
  styleUrls: ['./dg.component.css']
})
export class DgComponent implements OnInit{


  public isINEGISelected : boolean = true
  public isMDEASelected : boolean = true
  public isODSSelected : boolean = true
  public isINDSelected : boolean = true



  constructor(
    private _direServices: DGService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  //!Definimos los checkbox
  checkboxesState: CheckboxesState = {
    direGeogrAmbiente: false,
    direEstaSocio: false,
    direEstaEconomicas: false,
    direEstaGobSegPubJus: false,
    direInteAnaInv: false,
  }

  ngOnInit(): void {
    this.isINEGISelected = false;



  }
  hiddenTheOtherContents_INEGI(){
    this.isINEGISelected = false;
    this.isMDEASelected = true;
    this.isODSSelected = true;
  }
  hiddenTheOtherContents_MDEA(){
    this.isINEGISelected = true;
    this.isMDEASelected = false;
    this.isODSSelected = true;
  }
  hiddenTheOtherContents_ODS(){
    this.isINEGISelected = true;
    this.isMDEASelected = true;
    this.isODSSelected = false;

  }
  navigateWithParam() {


    this.checkboxesState['direGeogrAmbiente'] = true;


  // Luego, navegamos a la ruta con el parámetro
  this.router.navigate(['/dg/products'], { queryParams: this.checkboxesState });
}



}
