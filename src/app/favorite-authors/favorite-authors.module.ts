import { NgModule } from '@angular/core';

import { FavoriteAuthorsRoutingModule } from './favorite-authors-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FavoriteAuthorsComponent } from './favorite-authors/favorite-authors.component';


@NgModule({
  declarations: [FavoriteAuthorsComponent],
  imports: [
    SharedModule,
    FavoriteAuthorsRoutingModule
  ]
})
export class FavoriteAuthorsModule { }
