import { Component, EventEmitter, Input,OnDestroy,OnInit, Output } from '@angular/core';
import { CategoryFilter, Product } from '../../../model';
import {BehaviorSubject, Subscription } from 'rxjs';
import { FilterService } from '../../../services/filter.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styles: [
  ]
})
export class FilterComponent implements OnInit,OnDestroy{
  @Input() products!:Product[];
  @Input() category!:string;
  @Output() onFilter= new EventEmitter<boolean>();
  @Input() ratingList!:boolean[];
  filterCategories:CategoryFilter[]=[];
  @Input() selectedFilter!:{rating:BehaviorSubject<number|null>,categoryId:BehaviorSubject<number|null>};
  // filteredProducts=new Subject<Product[]>();
  selectedRating!:number|null;
  selectedCategory!:number|null;
  filteredProducts:Product[]=[];
  cloneOfProducts!:Product[];
  subsFilterList!:Subscription;

  constructor(private filterService:FilterService){}

  ngOnInit(): void {
    this.loadCategoryFilters();
  }
  loadCategoryFilters(){
    this.subsFilterList=this.filterService.filterList.subscribe(data=>this.filterCategories=data.slice());
    this.initFilterValues();
  }

  handleCheckbox(id:number):Product[]{
    const checkedItems=this.filterCategories.map(item=>item.id==id?{...item,checked:!item.checked}:item);
    this.filterCategories=checkedItems;
    const prods=this.handleFilter(checkedItems);
    return prods;
  }
  handleRating(rating:number):Product[]{
    this.ratingList=this.ratingList.map((rate,i)=>rating>=i+1?rate=true:rate=false)
    const prods=this.filterService.handleRateFilter(rating);
    return prods;
    // this.filterService.filteredProducts.next(prods);
  }

  handleFilter(checkedItems:CategoryFilter[]):Product[]{
    this.cloneOfProducts=[...this.products];   
    const prods=this.filterService.handleCatFilter(checkedItems);
    return prods;
  }

  initFilterValues(){
    this.selectedFilter.rating.subscribe(value=>this.selectedRating=value);
    this.selectedFilter.categoryId.subscribe(value=>this.selectedCategory=value);
  }
  applyFilter(value:number,type:string){
    let prods=this.products;
    if(type=='rating'){
      this.selectedRating=value;
    }
    if(type=='category'){
      this.selectedCategory=value;
    }
    if(this.selectedRating){
      prods=this.handleRating(this.selectedRating);
      this.filterService.filterProduct(prods);
    }

    if(this.selectedCategory){
      prods=this.handleCheckbox(this.selectedCategory);
      this.filterService.filterProduct(prods);
    }
    // this.filterService.filterProduct(prods);
  }

  onClose(){
    this.onFilter.emit(false);
  }
  unsubscribeSubject(){
    this.subsFilterList.unsubscribe();
  }
  ngOnDestroy(): void {
    this.unsubscribeSubject();
  }
 
}
