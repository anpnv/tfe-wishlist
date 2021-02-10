import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {

  @Input() isPrivate: boolean;

  constructor() { }

  ngOnInit() {}

}
