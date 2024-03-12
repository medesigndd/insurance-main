

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})


export class TopBarComponent implements OnInit {

  // Index properties
  page!: string;
  dropdown!: string;

  constructor() {
    this.page = 'insurance';
  }

  ngOnInit(): void {}

  pageIs(page: string){
    this.page = page;
  }

}

