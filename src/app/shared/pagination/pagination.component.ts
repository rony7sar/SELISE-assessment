import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() limit: number;
  @Input() skip: number;
  @Input() pageNumber: number;
  @Output() onGetMore = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  
  getMore(next: boolean = true) {
    this.onGetMore.emit(next);
  }
}
