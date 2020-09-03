import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-cv1',
  templateUrl: './cv1.component.html',
  styleUrls: ['./cv1.component.css']
})
export class Cv1Component implements OnInit {
  tiles: Tile[] = [
    {text: 'Cabecera', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Datos personales', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Datos profesionales', cols: 3, rows: 2, color: 'lightpink'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
