import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ListItemComponent } from './list-item/list-item.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
 imports:      [ CommonModule, FormsModule ],
 declarations: [ ListItemComponent, PaginationComponent ],
 exports:      [ ListItemComponent, PaginationComponent, CommonModule, FormsModule, HttpClientModule ]
})
export class SharedModule { }
