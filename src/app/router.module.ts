import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';


const appRoutes: Routes = [
  {path: 'search', component: UserComponent}
];
@NgModule({
  imports:[ RouterModule.forRoot(appRoutes) ],
  exports: [RouterModule]
})

export class AppRoutingModule{}
