import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Osoba } from '../../models/osoba.class';
import { LicznikComponent } from '../licznik/licznik.component';
import { OsobaComponent } from '../osoba/osoba.component';
import { ZaznaczoneOsobyComponent } from '../zaznaczone-osoby/zaznaczone-osoby.component';

@Component({
  selector: 'app-osoby',
  imports: [ZaznaczoneOsobyComponent, OsobaComponent, LicznikComponent, CommonModule],
  templateUrl: './osoby.component.html',
  styleUrl: './osoby.component.css'
})
export class OsobyComponent {
  osoby: Osoba[] = [
    new Osoba("Jan", "Kowalski", 33, false),
    new Osoba("Anna", "Nowak", 44, false),
    new Osoba("Adam", "XXX", 13, true),
    new Osoba("Ewelina", "YYY", 41, false),
  ];

  licznik = 0;
  wyswietlLicznik = true;

  constructor() {
    for(let os of this.osoby) {
      if(os.czyWyrozniona) {
        this.licznik++;
      }
    }
  }

  onZmianaWyroznienia(event: Osoba): void {
    event.czyWyrozniona = !event.czyWyrozniona;
    if(event.czyWyrozniona) {
      this.licznik++;
    } 
    else {
      this.licznik--;
    }
  }
}
