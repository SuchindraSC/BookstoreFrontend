import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import { HomeComponent } from './Components/home/home.component';
import { OrderplacedComponent } from './Components/orderplaced/orderplaced.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  {
    path: 'resetpassword/:token/:CustomerId',
    component: ResetpasswordComponent,
  },
  { path: 'home', component: HomeComponent },
  { path: 'orderplaced', component: OrderplacedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
