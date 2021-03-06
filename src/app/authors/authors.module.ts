import { NgModule } from '@angular/core';

import { AuthorsRoutingModule } from './authors-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthorsComponent } from './authors/authors.component';


@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    SharedModule,
    AuthorsRoutingModule
  ]
})
export class AuthorsModule { }
