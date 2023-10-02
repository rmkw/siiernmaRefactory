import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ByidsComponent } from './pages/byids/byids.component';
import { DgComponent } from './pages/dg/dg.component';
import { OdsPageComponent } from './pages/ods-page/ods-page.component';
import { MdeaPageComponent } from './pages/mdea-page/mdea-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', component: DgComponent},
      { path: 'products', component: ProductPageComponent},
      { path: 'search', component: SearchPageComponent},
      { path: 'new', component: NewPageComponent},
      { path: 'mdea', component: MdeaPageComponent},
      { path: 'ods', component: OdsPageComponent},
      { path: 'by/:id', component: ByidsComponent},
      { path: '**', redirectTo: 'dg' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DggmaRoutingModule { }
