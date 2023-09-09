import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { ShippingForm } from './model/ShippingForm.model';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [
  ]
})
export class CheckoutComponent implements OnInit{
  gstAmount!:number;
  grandTotal!:number;
  shippingForm!:FormGroup;
  constructor(private cartService:CartService, private formBulider:FormBuilder){
    this.shippingForm=this.formBulider.group({
      firstName:new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
      lastName:new FormControl('', [Validators.minLength(3),Validators.maxLength(15)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      mobile:new FormControl('',[Validators.required,Validators.minLength(10)]),
      address:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      state:new FormControl('',[Validators.required]),
      country:new FormControl('India',[Validators.required]),
      postalCode:new FormControl('',[Validators.required]),
    })
  }
  ngOnInit(): void {
    this.getTotal();
  }
  getTotal(){
    this.cartService.gstAmount.subscribe(data=>this.gstAmount=parseInt(data.toFixed(2)));
    this.cartService.estimatedTotal.subscribe(data=>this.grandTotal=parseInt(data.toFixed(2)));
  }

  get firstName(){
    return this.shippingForm.get('firstName');
  }
  get lastName(){
    return this.shippingForm.get('lastName');
  }
  get email(){
    return this.shippingForm.get('email');
  }
  get mobile(){
    return this.shippingForm.get('mobile');
  }
  get address(){
    return this.shippingForm.get('address');
  }
  get state(){
    return this.shippingForm.get('state');
  }
  get city(){
    return this.shippingForm.get('city');
  }
  get country(){
    return this.shippingForm.get('country');
  }
  get postalCode(){
    return this.shippingForm.get('postalCode');
  }
  onSave(){
    alert(JSON.stringify(this.shippingForm.value));
    this.shippingForm.reset();
  }
  
}
