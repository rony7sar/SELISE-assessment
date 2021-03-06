import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() authors: any;
  @Output() onAddFavorite = new EventEmitter<number>();
  @Output() onRemoveFavorite = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  addFavorite(index) {
    this.onAddFavorite.emit(index);
  }

  removeFavorite(index) {
    this.onRemoveFavorite.emit(index);
  }
}
