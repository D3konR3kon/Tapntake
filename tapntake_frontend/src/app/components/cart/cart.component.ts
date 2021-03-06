import { Component, OnInit } from '@angular/core';
import { Product } from '../../product';
import { CartService } from '../../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CheckoutComponent } from '../../components/checkout/checkout.component'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  product !: Product
  total:any
  items: any
  totalAmount = this.cartService.totalAmount
  constructor(private cartService: CartService, 
    private router : Router, 
    private activated: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getItems()
    this.Total()
    
  }
  getItems(){
    
        this.items = this.cartService.getItems();
        localStorage.setItem('form', JSON.stringify(this.items))
  }
  Total() {
    this.totalAmount = 0
    this.items.forEach((item: { qty: number; price: number; }) => {
      this.totalAmount += (item.qty * item.price)
      localStorage.setItem('Total',JSON.stringify(this.totalAmount))
    })
    
  }
  deletei(i: number): void {
    this.items.splice(i, 1);
    this.items.length
    this.Total();
  
  }
  qntUpdate($event: any) {
    this.Total();
  }

  incre(qty: any, index: number){
    qty++
    this.items[index].qty = qty
    this.items.length
    this.Total();
  }
  decr(qty: any, index: number){
    
  if(qty > 1)
  qty--
    this.items[index].qty = qty
    this.items.length
    this.Total();
   
  }

  goBack(){
    this.location.back()
    // window.location.replace('/')
  }
}
