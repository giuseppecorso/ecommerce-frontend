import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { Login } from './login/login';
import { MyOrders } from './my-orders/my-orders';
import { NewProduct } from './new-product/new-product';

export const routes: Routes = [
    { path: '', component: Home, title: 'Curio Lane — Small finds, big stories' },
    { path: 'products', component: ProductList, title: 'Shop — Curio Lane' },
    { path: 'products/:id', component: ProductDetail, title: 'Curio Lane' },
    { path: 'login', component: Login, title: 'Login — Curio Lane' },
    { path: 'my-orders', component: MyOrders, title: 'My orders — Curio Lane' },
    { path: 'new-product', component: NewProduct, title: 'New product — Curio Lane' },
    { path: '**', redirectTo: '' },
];
