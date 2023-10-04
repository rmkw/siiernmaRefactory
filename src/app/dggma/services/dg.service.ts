import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { environments } from 'src/app/environments/environments';
import { Escalas, Products, SecuenciaVar } from "../interfaces/product.interface";
import { Componente, Mdea, Subcomponente, Topico } from '../interfaces/mdea.interface';
import { UAdmin } from '../interfaces/u_admin.interface';
import { DgaPprod, Pi, ProcProduccion, ProgInformacion } from '../interfaces/pi.interface';
import { Aeg2, DgaProd, SecuenciaAeg } from '../interfaces/aeg.interface';
import { MetaODS, Ods, SecuenciaOds } from '../interfaces/ods.interface';
import { IndicadoresPS2023, PS2023, SecuenciaPS } from '../interfaces/ps.interface';


@Injectable({providedIn: 'root'})
export class DGService {

  private baseUrl: string = environments.baseUrl;
  constructor(private _http: HttpClient) {}


  //! get direcciones generales
  direccionesGenerales(){
    return this._http.get<UAdmin[]>(`${ this.baseUrl}/direcciones_ctrl`)
  }
  direccionesGeneralesPI(){
    return this._http.get<UAdmin[]>(`${ this.baseUrl}/direcciones_ctrl_PI`)
  }
  //! get productos
  productos(){
    return this._http.get<Products[]>(`${ this.baseUrl}/producto_coll`)
  }
  escalas(){
    return this._http.get<Escalas[]>(`${ this.baseUrl}/escalas_ctrl`)
  }






  //! get secuencia MDEA
  mdeaById( id: string ): Observable<Mdea[]> {
    const url = `${ this.baseUrl}/mdea_coll?interview__id=${ id }`;
    return this._http.get<Mdea[]>(url)
  }
  mdeaByComponenteId( id: number ): Observable<Mdea[]> {
    const url = `${ this.baseUrl}/mdea_coll?comp_mdea=${ id }`;
     return this._http.get<Mdea[]>(url)
   }
  mdeaBySubcomponenteId( id: number ): Observable<Mdea[]> {
    const url = `${ this.baseUrl}/mdea_coll?subcomp_mdea=${ id }`;
     return this._http.get<Mdea[]>(url)
   }
  mdeaByTopicoId( id: number ): Observable<Mdea[]> {
    const url = `${ this.baseUrl}/mdea_coll?topico_mdea=${ id }`;
     return this._http.get<Mdea[]>(url)
   }

  componentes(){
    return this._http.get<Componente[]>(`${ this.baseUrl}/componentes_ctrl`)
  }

  subcomponentes(){
    return this._http.get<Subcomponente[]>(`${ this.baseUrl}/subcomponentes_ctrl`)
  }
  subcomponenteByParentid(id:string){
    const url = `${ this.baseUrl}/subcomponentes_ctrl?parentid=${ id }`;
    return this._http.get<Subcomponente[]>(url);
  }

  topicos(){
    return this._http.get<Topico[]>(`${ this.baseUrl}/topicos_ctrl`)
  }
  topicoByParentid( id: number ): Observable<Topico[]> {
    const url = `${ this.baseUrl}/topicos_ctrl?parentid=${ id }`;
     return this._http.get<Topico[]>(url)
   }













   //! PROGRAMAS DE INFORMACIÓN

  prograInfo( id: string ): Observable<Pi[]> {
    const url = `${ this.baseUrl}/pi_coll?interview__id=${ id }`;
    return this._http.get<Pi[]>(url)
  }
  programasInformaName(){
    return this._http.get<ProgInformacion[]>(`${ this.baseUrl}/prog_informacion_ctrl`)
  }



  //!VARIABLES
  variableById( id: string ): Observable<SecuenciaVar[]> {
    const url = `${ this.baseUrl}/variable_coll?interview__id=${ id }`;
    return this._http.get<SecuenciaVar[]>(url)
  }

  //! Actividad Estadística Geográfica
  actiEstaGeoById( id: string ): Observable<SecuenciaAeg[]> {
    const url = `${ this.baseUrl}/aeg_coll?interview__id=${ id }`;
   return this._http.get<SecuenciaAeg[]>(url)
  }
  dirGenProAEG(){
    return this._http.get<DgaPprod[]>(`${ this.baseUrl}/dga_pprod_ctrl`)
  }
  actiEstaGeoName(){
    return this._http.get<Aeg2[]>(`${ this.baseUrl}/aeg_name_ctrl`)
  }
  //? Dirección general adjunta responsable de la AEG
  direAdjResAEG(){
    return this._http.get<DgaProd[]>(`${ this.baseUrl}/dga_prod_ctrl`)
  }



  //!ODS

  odsById( id: string ): Observable<SecuenciaOds[]> {
    const url = `${ this.baseUrl}/ods_coll?interview__id=${ id }`;
    return this._http.get<SecuenciaOds[]>(url)
  }
  objetivos(){
    return this._http.get<Ods[]>(`${ this.baseUrl}/objetivo_ctrl`)
  }
  metas(){
    return this._http.get<MetaODS[]>(`${ this.baseUrl}/meta_ctrl`)
  }
  metasByparentid( id: number ): Observable<MetaODS[]> {
    const url = `${ this.baseUrl}/meta_ctrl?parentid=${ id }`;
     return this._http.get<MetaODS[]>(url)
   }
  odsByObjetivo( id: number ): Observable<SecuenciaOds[]> {
    const url = `${ this.baseUrl}/ods_coll?obj_ods=${ id }`;
    return this._http.get<SecuenciaOds[]>(url)
  }
  odsByMeta( id: string ): Observable<SecuenciaOds[]> {
    const url = `${ this.baseUrl}/ods_coll?meta_ods=${ id }`;
    return this._http.get<SecuenciaOds[]>(url)
  }











  //! PROGRAMAS SECTORIALES
  programaSectorialById( id: string ): Observable<SecuenciaPS[]> {
    const url = `${ this.baseUrl}/ps_coll?interview__id=${ id }`;
    return this._http.get<SecuenciaPS[]>(url);
  }

  // procesoProduccionPS(){
  //   return this._http.get<ProcProduccion[]>(`${ this.baseUrl}/proc_produccion_ctrl`)
  //! } no se usa revisar

  ps2023(){
    return this._http.get<PS2023[]>(`${ this.baseUrl}/PS_2023_ctrl`)
  }
  indicadoresPS2023(){
    return this._http.get<IndicadoresPS2023[]>(`${ this.baseUrl}/indicadores_PS_2023_ctrl`)
  }








  suggestionByQuery( query: string ) : Observable<Products[]> {
    if (query.trim() === '') {
    return of([]);
  }
  return this._http.get<Products[]>(`${ this.baseUrl }/fuzzy-search?q=${ query }`)
}
}




// .pipe(
//       tap(data => console.log('DATA by Service',data))
//     );
