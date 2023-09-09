import { Component, EventEmitter, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryFilter, Product } from '../../model';
import { FilterService } from '../../services/filter.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent implements OnInit, OnDestroy {
  cloneOfProducts: Product[] = [];
  products: Product[] = [];
  category = '';
  isLoading = false;
  isFilter=false;
  error!:string;
  subsFilterProducts!:Subscription;
  
  selectedFilter:{rating:BehaviorSubject<number|null>;categoryId:BehaviorSubject<number|null>}={
    rating:new BehaviorSubject<number|null>(null),
    categoryId:new BehaviorSubject<number|null>(null)
  }
  ratingList:boolean[]=[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.getProductsByCategory();
    this.handleFilter();
  }

  getProductsByCategory(): Product[] {
    this.isLoading = true;
    this.route.params.subscribe((data: Params) => {
      this.category = data['category'];
      this.ratingList=[false,false,false,false];
      this.resetFilter();
      this.productService.getByCategory(this.category).subscribe((data)=>{
        this.isLoading = false;
        this.products = data;
        this.cloneOfProducts=data;
        this.filterService.filterProduct(data);
      },
      (error)=>this.error=error.message
      );
      this.filterService.getProductTypeFilter(this.category);
    });

    return this.products;
  }
  handleFilter() {
    this.subsFilterProducts=this.filterService.filteredProducts.subscribe((data) => {
      this.products = data
    });
  }
  
  onFilter(value:boolean){
    this.isFilter=value;
  }

  resetFilter(){
    this.selectedFilter.categoryId.next(null);
    this.selectedFilter.rating.next(null);
  }
  

  ngOnDestroy(): void {
    this.subsFilterProducts.unsubscribe();
  }
}
