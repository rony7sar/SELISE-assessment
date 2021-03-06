import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LongestRepeationLettersComponent } from './longest-repeation-letters/longest-repeation-letters.component';

const appRoutes: Routes = [
  {
    path: 'authors',
    loadChildren: () => import('./authors/authors.module').then(m => m.AuthorsModule)
  },{
    path: 'favorite-authors',
    loadChildren: () => import('./favorite-authors/favorite-authors.module').then(m => m.FavoriteAuthorsModule)
  }, {
    path: 'longest-repeatition', component: LongestRepeationLettersComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
