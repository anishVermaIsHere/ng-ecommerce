import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, catchError, map, throwError} from 'rxjs';
import { Product} from '../model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private url=environment.baseAPIURL+'products';
  products=new BehaviorSubject<Product[]>([]);
  ratingList:boolean[]=[];
  constructor(private http:HttpClient) { }

  get get():Observable<Product[]|any>{
    return this.http.get<{[key:string]:Product}>(this.url).pipe(map((data)=>{
      let newProducts:Product[]=[];
      for(const key in data){
        newProducts.push({...data[key]})
      }
      return newProducts;
    }),
    catchError((error)=>{
      return throwError(error); //throwError is deprecated
      // return new Error(error);
    }));
  }
  getByCategory(category:string):Observable<Product[]|any>{
    return this.http.get(this.url,{
      params:new HttpParams().set('category',category)
    });
  }
  getRelated(type:string):Observable<Product[]|any>{
    return this.http.get(this.url,{
      params:new HttpParams().set('type',type)
    });
  }
  getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(this.url+'/'+id);
  }

  search(query:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.url,{
      params:new HttpParams().set('q',query)
    });
  }
  getRatingStar(product:Product){
    this.ratingList=[];
    [...Array(5)].map((_,index)=>{
      return index+1<= Math.trunc(product?.rating.rate)?this.ratingList.push(true):this.ratingList.push(false);
    });
    return this.ratingList;
  }
  
}
