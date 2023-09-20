import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DGService } from '../../services/dg.service';
import { Products, Escalas, SecuenciaVar } from '../../interfaces/product.interface';
import { DgaPprod, Pi, ProgInformacion } from '../../interfaces/pi.interface';
import { UAdmin } from '../../interfaces/u_admin.interface';
import { Aeg2, DgaProd, SecuenciaAeg } from '../../interfaces/aeg.interface';
import { Componente, Mdea, Subcomponente, Topico } from '../../interfaces/mdea.interface';
import { MetaODS, Ods, SecuenciaOds } from '../../interfaces/ods.interface';
import { IndicadoresPS2023, PS2023, SecuenciaPS } from '../../interfaces/ps.interface';

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

    //! PRODUCTOS DE INFORMACIÓN
    this._direServices.getProdInfo()
    .subscribe( pInfo => { this.proInfo = pInfo; });

    //! DIRECCIONES
    this._direServices.getDG()
    .subscribe( dgs => this.dgs = dgs );

    //!direcciones en AEG
    this._direServices.getDgaPprod()
    .subscribe( dga_pprod => this.dga_Pprod = dga_pprod);

    //!AEG nombre del AEG
    this._direServices.getAEG_2()
    .subscribe( aeg_2 => this.aeg_2 = aeg_2)

    //!DIRECCIÓN GENERAL ADJUNTA RESPONSABLE
    this._direServices.getAEG_prod()
    .subscribe( aeg_prod => this.aeg_Prod = aeg_prod )

    //! TODOS LOS COMPONENTES DEL MDEA
    this._direServices.getComponentes()
    .subscribe( componentes => this.componentesMDEA = componentes)

    //! todos los sub componentes del MDEA
    this._direServices.getSubcomponentes()
    .subscribe( subcomponente => this.subComponentesMDEA = subcomponente)

    //! todos los tópicos
    this._direServices.getTopicos()
    .subscribe( topicomdea => this.topicoMDEA = topicomdea)

    //! todos los OBJETIVOS del ods
    this._direServices.getObjetivos()
    .subscribe( objetivos => this.objetivODS = objetivos)

    //! todas las metas de los ODS
    this._direServices.getMetas()
    .subscribe( metas => this.metasODS = metas )




  }

  //!bandera para filtros para que mostrar
  changeFlagFilter(){
    this.flagFilter = true;
    this.flagOther = false;
  }
  //!bandera para filtros para que oculte
  hiddenFilters(){
    this.flagFilter = false;
    this.flagOther = true;
  }

  //* ABRE EL MODAL CON INFO
  openModal(elemento: any) {
    this.elementoSeleccionado = elemento;

    //! VARIABLES
    this._direServices.getSecuenciaVARBy(this.elementoSeleccionado.interview__id)
    .subscribe( data => { this.secuenciaVAR = data});

    //! Programas de Información
    this._direServices.getPIById(this.elementoSeleccionado.interview__id)
    .subscribe(data => { this.pi = data; });

    //! Actividad Estadística o Geográfica
    this._direServices.getAEGById(this.elementoSeleccionado.interview__id)
    .subscribe(data => { this.aegSecuencia = data;
    console.log(this.aegSecuencia)});

    //!secuencia MDEA by id del producto
    this._direServices.getMDEASById(this.elementoSeleccionado.interview__id)
    .subscribe(data => { this.mdeas = data; });

    //!secuencia de los ODS
    this._direServices.getODSById(this.elementoSeleccionado.interview__id)
    .subscribe( data => { this.ODSes = data; });

    //!secuencia de PS
    this._direServices.getSecuenciaPSBy(this.elementoSeleccionado.interview__id)
    .subscribe( data => {
      this.PSes = data;
    });

    //! primer parámetro de texto del PS
    this._direServices.getPS2023()
    .subscribe(ps2023 => this.ps2023 = ps2023)

    //! segundo parámetro de texto del ps
    this._direServices.getIndicadoresPS2023()
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

}
