import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductdetailComponent } from './components/product/productdetail/productdetail.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:':category',
        component:ProductComponent,
      },
      {
        path:'product/:id',
        component:ProductdetailComponent,
      }
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule { }
