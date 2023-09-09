import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { CategoryFilter, Product } from '../model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public filteredProducts=new BehaviorSubject<Product[]>([]);
  filterList=new BehaviorSubject<CategoryFilter[]>([]);
  products!:Product[];
  category='';
  cloneOfProducts!:Product[];
  constructor(private productService:ProductService) { }

  filterProduct(products:Product[]){
    return this.filteredProducts.next(products);
  }

  getProductTypeFilter(category:string){
    let prodTypes:CategoryFilter[]=[];
    this.category=category;
    this.productService.getByCategory(category).subscribe(data=>{
      this.products=data
      this.cloneOfProducts=data
      const types=[...new Set(this.cloneOfProducts.map(item=>item.type))];
      types.map((prod,index)=>{
        return prodTypes.push({
        label:prod,
        value:prod,
        checked:false,
        id:index+1
      })});
      this.filterList.next(prodTypes);
    },error=>error)
  }

  handlePriceFilter(min:number,max:number){
    const products=this.cloneOfProducts.filter(item=>item.price>=min&&item.price<=max);
    this.filterProduct(products);
  }
  handleCatFilter(checkedItems:CategoryFilter[]):Product[]{
    this.productService.getByCategory(this.category).subscribe(data=>this.products=data);
    this.filterProduct(this.products);
    let checked=checkedItems.filter(item=>item.checked).map(item=>item.value);
    if(checked.length){
      this.filteredProducts.subscribe((data:Product[])=>{
        this.products=data.filter(item=>checked.includes(item.type));
      })
    } 
    return this.products;

  }
  handleRateFilter(rating:number):Product[]{
    this.productService.getByCategory(this.category).subscribe(data=>this.products=data);
    this.filterProduct(this.products);
    this.filteredProducts.subscribe((data:Product[])=>{
     this.products= data.filter(item=>rating<=Math.trunc(item.rating.rate));
    })
    return this.products;
  }

}
