import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styles: [
  ]
})
export class ProductdetailComponent implements OnInit{
  isLoading=false;
  selectedSize!:string;
  category!:string;
  cart:Product[]=[];
  relatedProductList:Product[]=[];
  ratingList:boolean[]=[];
  images!:string[];
  product!:Product;
  imageSrc!:string;
  selectedImage!:number;
  discount=0;
  title:string='';
  constructor(private route:ActivatedRoute, private productService:ProductService, private cartService:CartService, private router:Router){}

  ngOnInit(): void {
    this.getProduct();
    this.cart=this.cartService.getCart;
    this.route.params.subscribe(()=>{
      this.getProduct();
      this.scrollToTop();
    })
  }

  getProduct(){
    this.isLoading=true;
    const id= this.route.snapshot.params['id'];
    this.productService.getProduct(id).subscribe((data:Product)=>{
      this.isLoading=false;
      this.product=data;
      const {images}=this.product;
      this.images=images;
      this.imageSrc=images[0];
      this.category=data.category;
      this.title=data.title;
      this.discount=this.product&&Math.round(100-(this.product.price/this.product.prevprice)*100);
      this.getRatingStar();
      this.relatedProducts();
    });
  }
  
  scrollToTop(){
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  getRatingStar(){
    this.ratingList=this.productService.getRatingStar(this.product);
  }
  addToCart(product:Product){
    this.cartService.add(product);
  }
  removeFromCart(product:Product){
    this.cartService.remove(product);    
  }
  isProductInCart(product:Product){
    return this.cart.some(item=>item.id==product.id);
  }

  relatedProducts(){
    this.isLoading=true;
   this.productService.getRelated(this.product.type).subscribe(data=>{
    this.relatedProductList=data.filter((item:Product)=>{
    this.isLoading=false;
     return this.product.id!==item.id
    });
    });
  }

  addSize(value:string,index:string){
    this.selectedSize=index;
    this.product.size=value;
  }
  onImage(value:string,index:number){
    this.imageSrc=value;
    this.selectedImage=index;
  }
  
}
