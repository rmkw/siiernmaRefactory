import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DGService } from '../../services/dg.service';
import { Products, Escalas, SecuenciaVar } from '../../interfaces/product.interface';
import { DgaPprod, Pi, ProgInformacion } from '../../interfaces/pi.interface';
import { UAdmin } from '../../interfaces/u_admin.interface';
import { Aeg2, DgaProd, SecuenciaAeg } from '../../interfaces/aeg.interface';
import { Componente, Mdea, Subcomponente, Topico } from '../../interfaces/mdea.interface';
import { MetaODS, Ods, SecuenciaOds } from '../../interfaces/ods.interface';
import { IndicadoresPS2023, PS2023, SecuenciaPS } from '../../interfaces/ps.interface';

import { ActivatedRoute } from '@angular/router';



//! Interface de los checkbox
interface CheckboxesState {
  [key: string]: boolean;
}



@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{


  //*PRODUCTOS
  public products: Products[] = [];

  //*ESCALAS
  public escalas: Escalas[]=[];

  //* VARIABLES
  public secuenciaVAR: SecuenciaVar[]=[]

  //* Productos de información
  public pi?: Pi[]=[];

  //* direcciones generales
  public dgs: UAdmin[] = [];

  //*secuencia PI
  public proInfo: ProgInformacion[] = [];

  //*Secuencia AEG
  public aegSecuencia: SecuenciaAeg[]=[];

  //* NOMBRE dirección general AEG
  public dga_Pprod: DgaPprod[] = [];

  //*NOMBRES DE LA AEG
  public aeg_2: Aeg2[]=[];

  //* NOMBRE DE LA DIRECCIÓN GENERAL ADJUNTA RESPONSABLE
  public aeg_Prod: DgaProd[]=[];

  //*secuencia MDEAS
  public mdeas?: Mdea[]=[];

  //* NOMBRE DE LOS COMPONENTES
  public componentesMDEA: Componente[]=[];

  //*nombres de los sub componentes
  public subComponentesMDEA: Subcomponente[]=[];

  //*nombres de los tópicos
  public topicoMDEA: Topico[]=[];

  //*secuencia de los ODS
  public ODSes?: SecuenciaOds[]=[];

  //*nombre de los objetivos ODS
  public objetivODS: Ods[]=[];

  //*nombre de las metas del ods
  public metasODS: MetaODS[]=[];

  //*secuencia PS
  public PSes?: SecuenciaPS[]=[];

  //*nombre de los ps
  public ps2023: PS2023[]=[];

  //*nombre del segundo parámetro del PS
  public indicadoresPS2023: IndicadoresPS2023[]=[];



  //*banderas para ocultar filtros y mostrarlos
  flagHidden : boolean = true;
  flagFilter : boolean = false;
  flagOther : boolean = true;
  //! elementoSeleccionado es una variable para tomar el objeto del array de productos y poder sacar la info de uno solo
  elementoSeleccionado: any;


  //!Definimos los checkbox
  checkboxesState: CheckboxesState = {
    direGeogrAmbiente: false,
    direEstaSocio: false,
    direEstaEconomicas: false,
    direEstaGobSegPubJus: false,
    direInteAnaInv: false,
  }
  checkboxesCobe: CheckboxesState = {
    cobeNacional: false,
    cobeEstatal: false,
    cobeMunicipal: false,
    cobRegional: false
  }
  checkboxesType: CheckboxesState = {
    typeDatoGeo: false,
    typeTabulado: false,
    typePublicacion: false

  }

  //! elementos que nos ayudara a filtrar
  filteredProducts: Products[] = [];
  showFilteredProducts = false;
  displayedProductCount: number = 0;
  displayedProductCountAll: number = 0;


  //! términos de búsqueda
  terminoBusqueda: string = '';

  //! otro elemento para filtrar
  selectedRadioValue: string = '';






  //! FECHAS SELECT referencia
  allYears: number[] = [];
  uniqueYears: number[] = [];

  allYearsHasta: number[] = [];
  uniqueYearsHasta: number[] = [];

  //* Filtro fechas
  selectedYear: number | null = null;
  selectedYearHasta: number | null = null;


  //! FECHAS SELECT publicación
  pU_allYears: number[] = [];
  pU_uniqueYears: number[] = [];

  pU_allYearsHasta: number[] = [];
  pU_uniqueYearsHasta: number[] = [];
  //* Filtro fechas publicación
  pU_selectedYear: number | null = null;
  pU_selectedYearHasta: number | null = null;

  //! MDEA
  componentes:Componente[] = []
  subcomponente:Subcomponente[]=[]
  topicos : Topico[]=[]
  mdeasbyCompo: Mdea[]=[]




  selectedOptions: { [key: string]: boolean } = {};

  selectedOptionsSub_componente: { [key: string]: boolean } = {};

  selectedOptionsTopico: { [key: string]: boolean } = {};

  loading = true;





  constructor( private _direServices: DGService, private route: ActivatedRoute){}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.checkboxesState['direGeogrAmbiente'] = params['direGeogrAmbiente'] === 'true';
      this.checkboxesState['direEstaSocio'] = params['direEstaSocio'] === 'true';
      this.checkboxesState['direEstaEconomicas'] = params['direEstaEconomicas'] === 'true';
      this.checkboxesState['direEstaGobSegPubJus'] = params['direEstaGobSegPubJus'] === 'true';
      this.checkboxesState['direInteAnaInv'] = params['direInteAnaInv'] === 'true';
      console.log(this.checkboxesState)

    });


    //! TODOS LOS PRODUCTOS
    this._direServices.productos()
      .subscribe(data => {
        this.products = data;

        this.displayedProductCountAll = this.products.length
        this.extractAndSortYears();
        this.extractAndSortYearsHasta();
        this.pU_extractAndSortYears();
        this.pU_extractAndSortYearsHasta();
        this.loading = false;
      });

    //! ESCALAS
    this._direServices.escalas()
    .subscribe( escala => this.escalas = escala);

    //! PRODUCTOS DE INFORMACIÓN
    this._direServices.programasInformaName()
    .subscribe( pInfo => { this.proInfo = pInfo; });

    //! DIRECCIONES
    this._direServices.direccionesGenerales()
    .subscribe( dgs => this.dgs = dgs );

    //!direcciones en AEG
    this._direServices.dirGenProAEG()
    .subscribe( dga_pprod => this.dga_Pprod = dga_pprod);

    //!AEG nombre del AEG
    this._direServices.actiEstaGeoName()
    .subscribe( aeg_2 => this.aeg_2 = aeg_2)

    //!DIRECCIÓN GENERAL ADJUNTA RESPONSABLE
    this._direServices.direAdjResAEG()
    .subscribe( aeg_prod => this.aeg_Prod = aeg_prod )

    //! TODOS LOS COMPONENTES DEL MDEA
    this._direServices.componentes()
    .subscribe( componentes => this.componentesMDEA = componentes)

    //! todos los sub componentes del MDEA
    this._direServices.subcomponentes()
    .subscribe( subcomponente => this.subComponentesMDEA = subcomponente)

    //! todos los tópicos
    this._direServices.topicos()
    .subscribe( topicomdea => this.topicoMDEA = topicomdea)

    //! todos los OBJETIVOS del ods
    this._direServices.objetivos()
    .subscribe( objetivos => this.objetivODS = objetivos)

    //! todas las metas de los ODS
    this._direServices.metas()
    .subscribe( metas => this.metasODS = metas )

    //? COMPONENTES
    this._direServices.componentes().
    subscribe(data => {this.componentes = data;})

  }
  //! LLENAMOS SELECT de fechas hasta referencia
  extractAndSortYears(): void {
    const allYearSet = new Set<number>();
    this.products.forEach(product => {
      const year = product.a_referencia;
      if (typeof year === 'number' && !isNaN(year)) {
        allYearSet.add(year);
      }
    });
    this.allYears = Array.from(allYearSet);
    this.allYears.sort((a, b) => a - b);
    this.uniqueYears = [...this.allYears];
  }
  //! LLENAMOS SELECT de fechas desde referencia
  extractAndSortYearsHasta(): void {
    const allYearSet = new Set<number>();
    this.products.forEach(product => {
      const year = product.a_referencia2;
      if (typeof year === 'number' && !isNaN(year)) {
        allYearSet.add(year);
      }
    });
    this.allYearsHasta = Array.from(allYearSet);
    this.allYearsHasta.sort((a, b) => a - b);
    this.uniqueYearsHasta = [...this.allYearsHasta];
  }

  //! LLENAMOS SELECT de fechas hasta publicación
  pU_extractAndSortYears(): void {
    const allYearSet = new Set<number>();
    this.products.forEach(product => {
      const year = product.a_publicacion;
      if (typeof year === 'number' && !isNaN(year)) {
        allYearSet.add(year);
      }
    });
    this.pU_allYears = Array.from(allYearSet);
    this.pU_allYears.sort((a, b) => a - b);
    this.pU_uniqueYears = [...this.pU_allYears];
  }
  //! LLENAMOS SELECT de fechas desde publicación
  pU_extractAndSortYearsHasta(): void {
    const allYearSet = new Set<number>();
    this.products.forEach(product => {
      const year = product.a_publicacion2;
      if (typeof year === 'number' && !isNaN(year)) {
        allYearSet.add(year);
      }
    });
    this.pU_allYearsHasta = Array.from(allYearSet);
    this.pU_allYearsHasta.sort((a, b) => a - b);
    this.pU_uniqueYearsHasta = [...this.pU_allYearsHasta];
  }

  //* aquí lo del sub componente
  onChangeComp(event: any) {
    const id = event.target.value;
    this._direServices.subcomponenteByParentid(id).
    subscribe(data => {this.subcomponente = data;});

    //!por componente
    this._direServices.mdeaByComponenteId(id).subscribe(data => {this.mdeasbyCompo = data; this.productByCompont();})

  }
  productByCompont(){
    this.filteredProducts = this.products.filter(product =>
    this.mdeasbyCompo.some(mdea => mdea.interview__id === product.interview__id));
  }
  onChangeSubComp(event:any){
    const id = event.target.value;
    this._direServices.topicoByParentid(id).
    subscribe(data => {this.topicos = data;})
  }




  //!bandera para filtros para que mostrar
  changeFlagFilter(){
    this.flagHidden = false;
    this.flagFilter = true;
    this.flagOther = false;
  }
  //!bandera para filtros para que oculte
  hiddenFilters(){

    this.flagHidden = true;
    this.flagFilter = false;
    this.flagOther = true;
  }

  //* ABRE EL MODAL CON INFO
  openModal(elemento: any) {
    this.elementoSeleccionado = elemento;

    //! VARIABLES
    this._direServices.variableById(this.elementoSeleccionado.interview__id)
    .subscribe( data => { this.secuenciaVAR = data});

    //! Programas de Información
    this._direServices.prograInfo(this.elementoSeleccionado.interview__id)
    .subscribe(data => { this.pi = data; });

    //! Actividad Estadística o Geográfica
    this._direServices.actiEstaGeoById(this.elementoSeleccionado.interview__id)
    .subscribe(data => { this.aegSecuencia = data;
    console.log(this.aegSecuencia)});

    //!secuencia MDEA by id del producto
    this._direServices.mdeaById(this.elementoSeleccionado.interview__id)
    .subscribe(data => { this.mdeas = data; });

    //!secuencia de los ODS
    this._direServices.odsById(this.elementoSeleccionado.interview__id)
    .subscribe( data => { this.ODSes = data; });

    //!secuencia de PS
    this._direServices.programaSectorialById(this.elementoSeleccionado.interview__id)
    .subscribe( data => {
      this.PSes = data;
    });

    //! primer parámetro de texto del PS
    this._direServices.ps2023()
    .subscribe(ps2023 => this.ps2023 = ps2023)

    //! segundo parámetro de texto del ps
    this._direServices.indicadoresPS2023()
    .subscribe( indiPS2023 => this.indicadoresPS2023 = indiPS2023)
  }


  //! ESCALAS Transformando IDs a texto
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
  //! DIRECCIONES Transformando ID a texto
  getDireccionGeneralText(dg_pi: number): string {
    let direccionGeneralText = '';
    for (let direccion_general of this.dgs) {
      if (direccion_general.id === dg_pi) {
        direccionGeneralText = direccion_general.text;
        break;
      }
    }
    return direccionGeneralText;
  }
  //! PROGRAMAS DE INFORMACIÓN TRANSFORMANDO ID A TEXTO
  getProgInfoText(nom_pi: number): string {
    let progInfoText = '';
    for (let progInfo of this.proInfo) {
      if (progInfo.id === nom_pi) {
        progInfoText = progInfo.text;
        break;
      }
    }
    return progInfoText;
  }
  //! Dirección general en Actividad estadística o geográfica
  getDga_PprodText(dga_pi: number): string {
    let dga_PprodText = '';
    for (let dga_Pprod of this.dga_Pprod) {
      if (dga_Pprod.id === dga_pi) {
        dga_PprodText = dga_Pprod.text;
        break;
      }
    }
    return dga_PprodText;
  }
  //!TRANSFORMA EL IDS de LA AEG para hacerla texto
  getAEG_2Text(nom_aeg: number): string {
    let aeg_2Text = '';
    for (let aeg_2 of this.aeg_2) {
      if (aeg_2.id === nom_aeg) {
        aeg_2Text = aeg_2.text;
        break;
      }
    }
    return aeg_2Text;
  }
  //!TRANSFORMA EL IDS DEL DIRECCIÓN ADJUNTA RESPONSABLE PARA HACERLA TEXTO
  getAEG_ProdText(dga_eag: number): string {
    let aeg_ProdText = '';
    for (let aeg_Prod of this.aeg_Prod) {
      if (aeg_Prod.id === dga_eag) {
        aeg_ProdText = aeg_Prod.text;
        break;
      }
    }
    return aeg_ProdText;
  }
  //! TRANSFORMA EL IDs del componente para hacerlo texto
  getComponenteText(comp_mdea: number): string {
    let componentesMDEAText = '';
    for (let componentesMDEA of this.componentesMDEA) {
      if (componentesMDEA.id === comp_mdea) {
        componentesMDEAText = componentesMDEA.text;
        break;
      }
    }
    return componentesMDEAText;
  }
  //! transforma los ids de los sub componentes para hacerlos texto
  getSubcomponenteText(subcomp_mdea: number): string {
    let subComponentesMDEAText = '';
    for (let subComponentesMDEA of this.subComponentesMDEA) {
      if (subComponentesMDEA.id === subcomp_mdea) {
        subComponentesMDEAText = subComponentesMDEA.text;
        break;
      }
    }
    return subComponentesMDEAText;
  }
  //! Transforma los ids de los tópicos para hacerlos a texto
  getTopicoText(topico_mdea: number): string {
    let topicoMDEAText = '';
    for (let topicoMDEA of this.topicoMDEA) {
      if (topicoMDEA.id === topico_mdea) {
        topicoMDEAText = topicoMDEA.text;
        break;
      }
    }
    return topicoMDEAText;
  }
  //! Transforma los id de los objetivos a texto
  getObjetivODSText(obj_ods: number): string {
    let objetivODSText = '';
    for (let objetivODS of this.objetivODS) {
      if (objetivODS.id === obj_ods) {
        objetivODSText = objetivODS.text;
        break;
      }
    }
    return objetivODSText;
  }
  //! transforma los id de las metas a texto
  getMetaODSText(meta_ods: number): string {
    let metasODSText = '';
    for (let metasODS of this.metasODS) {
      if (metasODS.id === meta_ods) {
        metasODSText = metasODS.text;
        break;
      }
    }
    return metasODSText;
  }
  //! transforma los id de los ps a texto
  getps2023Text(prog_ps: number): string {
    let ps2023Text = '';
    for (let ps2023 of this.ps2023) {
      if (ps2023.id === prog_ps) {
        ps2023Text = ps2023.text;
        break;
      }
    }
    return ps2023Text;
  }
  //! transforma los ids del segunda parámetro de los ps a texto
  getIndicadoresPS2023Text(indicador_ps: number): string {
    let indicadoresPS2023Text = '';
    for (let indicadoresPS2023 of this.indicadoresPS2023) {
      if (indicadoresPS2023.id === indicador_ps) {
        indicadoresPS2023Text = indicadoresPS2023.text;
        break;
      }
    }
    return indicadoresPS2023Text;
  }


   //! función que detecta los cambios en los checks box DIRECCIONES
  handleCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const checkboxId = target.id;
    this.checkboxesState[checkboxId] = target.checked;
    this.applyFilters();
  }
   //! check flag de radios TIPO
  handleRadioChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedRadioValue = target.value;
    this.applyFilters();
  }
  //! función que detecta los cambios en los checks box COBERTURA
  handleCheckboxCobe(event: Event): void {
    const target = event.target as HTMLInputElement;
    const checkboxId = target.id;
    this.checkboxesCobe[checkboxId] = target.checked;
    this.applyFilters();
  }
  //! función que detecta los cambios en los checks box TYPO SOPORTE
  handleCheckboxType(event: Event): void {
    const target = event.target as HTMLInputElement;
    const checkboxId = target.id;
    this.checkboxesType[checkboxId] = target.checked;
    this.applyFilters();

  }
  //! función que detecta los cambios en los checks box FECHAS desde referencia
  onChangeDesdeRefe(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedYear = parseInt(target.value, 10); // Convierte el valor a un número entero
  this.selectedYear = selectedYear; // Asigna el valor a la propiedad selectedYear
  this.applyFilters(); // Aplica los filtros nuevamente
}
  onChangeHastaRefe(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedYearHasta = parseInt(target.value, 10);
  this.selectedYearHasta = selectedYearHasta;
  this.applyFilters();
}

  //! función que detecta los cambios en los checks box FECHAS desde referencia
  onChangeDesdePubli(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedYear = parseInt(target.value, 10);
  this.pU_selectedYear = selectedYear;
  this.applyFilters();
}
  onChangeHastaPubli(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedYearHasta = parseInt(target.value, 10);
  this.pU_selectedYearHasta = selectedYearHasta;
  this.applyFilters();
}
  //!filtro calis
  handleSelectChangeCOMPONENTES(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const value = selectedOption.value;

  this.selectedOptions[value] = !this.selectedOptions[value];

  console.log(this.selectedOptions);


}

   handleSelectChangeSUBCOMPONENTES(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const value = selectedOption.value;

  this.selectedOptionsSub_componente[value] = !this.selectedOptionsSub_componente[value];

  console.log(this.selectedOptionsSub_componente);


}

  handleSelectChangeTopico(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const value = selectedOption.value;

  this.selectedOptionsTopico[value] = !this.selectedOptionsTopico[value];

  console.log(this.selectedOptionsTopico);


}




  //TODO FILTROS

  applyFilters(): void {
  this.showFilteredProducts = false;
  let combinedResults = this.products;

  if (
    this.checkboxesState['direGeogrAmbiente'] || this.checkboxesState['direEstaSocio'] || this.checkboxesState['direEstaEconomicas'] ||
    this.checkboxesState['direEstaGobSegPubJus'] || this.checkboxesState['direInteAnaInv']
  ) {
    combinedResults = combinedResults.filter((product) => {
  return (
    (this.checkboxesState['direGeogrAmbiente'] && product.dg_prod === 1) ||
    (this.checkboxesState['direEstaSocio'] && product.dg_prod === 2) ||
    (this.checkboxesState['direEstaEconomicas'] && product.dg_prod === 3) ||
    (this.checkboxesState['direEstaGobSegPubJus'] && product.dg_prod === 4) ||
    (this.checkboxesState['direInteAnaInv'] && product.dg_prod === 5)
  );
});

  }

  const radioOption = this.selectedRadioValue;
  if (radioOption) {
    combinedResults = combinedResults.filter((product) => {
      if (radioOption === 'option1') {
        return product.tipo_prod__1 === 1 && product.tipo_prod__2 === 0;
      } else if (radioOption === 'option2') {
        return product.tipo_prod__1 === 0 && product.tipo_prod__2 === 1;
      } else if (radioOption === 'option3') {
        return product.tipo_prod__1 === 1 && product.tipo_prod__2 === 1;
      }
      return true;
    });
  }

  if (
    this.checkboxesCobe['cobeNacional'] || this.checkboxesCobe['cobeEstatal'] ||
    this.checkboxesCobe['cobeMunicipal'] ||this.checkboxesCobe['cobRegional']
  ) {
    combinedResults = combinedResults.filter((product) => {
      const coberturaGeo1 = this.checkboxesCobe['cobeNacional'] && product.cobertura_geo__1 === 1;
      const coberturaGeo2 = this.checkboxesCobe['cobeEstatal'] && product.cobertura_geo__2 === 1;
      const coberturaGeo3 = this.checkboxesCobe['cobeMunicipal'] && product.cobertura_geo__3 === 1;
      const coberturaGeo4 = this.checkboxesCobe['cobRegional'] && product.cobertura_geo__4 === 1;

      return coberturaGeo1 || coberturaGeo2 || coberturaGeo3 || coberturaGeo4;
    });
  }

  if (
    this.checkboxesType['typeDatoGeo'] || this.checkboxesType['typeTabulado'] || this.checkboxesType['typePublicacion']
  ) {
    combinedResults = combinedResults.filter((product) =>{
      const typeDato = this.checkboxesType['typeDatoGeo'] && product.tipo_soporte__1 === 1;
      const typeTabu = this.checkboxesType['typeTabulado'] && product.tipo_soporte__2 === 1;
      const typePubl = this.checkboxesType['typePublicacion'] && product.tipo_soporte__3 === 1;

      return typeDato || typeTabu || typePubl
    })
  }

  if (this.selectedYear) {
  combinedResults = combinedResults.filter((product) => {
    const productYear = parseInt(product.a_referencia as string, 10);
    return !isNaN(productYear) && productYear >= this.selectedYear!;
  });
}


if (this.selectedYearHasta != null) {
  combinedResults = combinedResults.filter((product) => {
    const productYear = parseInt(product.a_referencia2 as unknown as string, 10);
    return !isNaN(productYear) && productYear <= this.selectedYearHasta!;
  });
}

  //? desde aquí se filtra por a_publicación
  if (this.pU_selectedYear) {
  combinedResults = combinedResults.filter((product) => {
    const productYear = parseInt(product.a_publicacion as string, 10); // Convierte a número
    return !isNaN(productYear) && productYear >= this.pU_selectedYear!;
  });
}

// Aplicar el filtro de fecha "hasta" (selectedYearHasta)
if (this.pU_selectedYearHasta != null) {
  combinedResults = combinedResults.filter((product) => {
    const productYear = parseInt(product.a_publicacion2 as unknown as string, 10); // Convierte a número
    return !isNaN(productYear) && productYear <= this.pU_selectedYearHasta!;
  });
}

  this.filteredProducts = combinedResults;

  this.displayedProductCount = this.filteredProducts.length;

  if (this.filteredProducts.length === 0) {
    console.log('entre al infierno')
    console.log(this.filteredProducts)
    this.showFilteredProducts = true;
    //! Aquí puedes manejar cómo mostrar un mensaje o tomar alguna acción cuando no hay resultados.
    //! Por ejemplo, puedes mostrar un mensaje en la interfaz de usuario.
    //! this.showNoResultsMessage = true;
  } else {
    console.log('entre al cielo')
    console.log(this.filteredProducts)
    this.showFilteredProducts = true;
  }
}

  deleteFilter(){
    this.checkboxesState = {
    direGeogrAmbiente: false,
    direEstaSocio: false,
    direEstaEconomicas: false,
    direEstaGobSegPubJus: false,
    direInteAnaInv: false,
  };

  this.checkboxesCobe = {
    cobeNacional: false,
    cobeEstatal: false,
    cobeMunicipal: false,
    cobRegional: false
  };

  this.checkboxesType = {
    typeDatoGeo: false,
    typeTabulado: false,
    typePublicacion: false
  };

  this.selectedRadioValue = '';


  this.showFilteredProducts = false;



  //! FECHAS SELECT referencia
  this.allYears = [];
  this.uniqueYears = [];

  this.allYearsHasta = [];
  this.uniqueYearsHasta = [];

  //* Filtro fechas
  this.selectedYear = null;
  this.selectedYearHasta = null;


  //! FECHAS SELECT publicación
  this.pU_allYears = [];
  this.pU_uniqueYears = [];

  this.pU_allYearsHasta = [];
  this.pU_uniqueYearsHasta = [];
  //* Filtro fechas publicación
  this.pU_selectedYear = null;
  this.pU_selectedYearHasta = null;

  this.allProducts();



  }

  allProducts(){
    this._direServices.productos()
      .subscribe(data => {
        this.products = data;

        this.displayedProductCountAll = this.products.length
        this.extractAndSortYears();
        this.extractAndSortYearsHasta();
        this.pU_extractAndSortYears();
        this.pU_extractAndSortYearsHasta();
      });
  }

















  //! función para búsqueda difusa
  funcionParaBuscarByQuery() {
    const inputValue = this.terminoBusqueda !== null && this.terminoBusqueda !== undefined ? this.terminoBusqueda : '';
    if (inputValue) {
      this._direServices.suggestionByQuery(inputValue).subscribe(result => {
        this.filteredProducts = result;
        this.displayedProductCount = this.filteredProducts.length;
        this.showFilteredProducts = true;
      });
    } else {
      this.filteredProducts = this.products;
      this.showFilteredProducts = false;
    }
  }
}





