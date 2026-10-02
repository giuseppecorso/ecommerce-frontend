import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { Login } from './login/login';
import { MyOrders } from './my-orders/my-orders';
import { NewProduct } from './new-product/new-product';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductList },
    { path: 'products/:id', component: ProductDetail},
    { path: 'login', component: Login },
    { path: 'my-orders', component: MyOrders},
    { path: 'new-product', component: NewProduct},
];
