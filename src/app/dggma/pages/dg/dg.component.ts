import { Component, OnInit } from '@angular/core';

import { DGService } from '../../services/dg.service';



@Component({
  selector: 'app-dg',
  templateUrl: './dg.component.html',
  styleUrls: ['./dg.component.css']
})
export class DgComponent implements OnInit{


  public isINEGISelected : boolean = true
  public isMDEASelected : boolean = true
  public isODSSelected : boolean = true


  constructor(
    private _direServices: DGService,
  ){}

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



}
