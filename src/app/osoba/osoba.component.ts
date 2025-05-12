import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Osoba } from '../../models/osoba.class';
import { CommonModule } from '@angular/common';
import { PodswietlenieDirective } from '../podswietlenie.directive';
import { ZaznaczoneOsobyService } from '../zaznaczone-osoby.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-osoba',
  imports: [CommonModule, PodswietlenieDirective, RouterLink],
  templateUrl: './osoba.component.html',
  styleUrl: './osoba.component.css'
})
export class OsobaComponent implements OnDestroy {
  @Input() osoba!: Osoba;
  @Output() zmianaWyroznienia = new EventEmitter<Osoba>();

  czyNajechany = false;
  czyZaznaczony = false;

  private readonly sub = new Subscription();

  constructor(private readonly service: ZaznaczoneOsobyService) {
    //this.osoba = new Osoba("Jan", "Kowalski", 33, false);
    const odznaczenie$ = service.getOdznaczenieObservable();
    const odznaczenieSub = odznaczenie$.subscribe(x => {
      if(x === this.osoba) {
        this.czyZaznaczony = false;
      }
    });
    this.sub.add(odznaczenieSub);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onZmianaWyroznieniaClick(): void {
    this.zmianaWyroznienia.emit(this.osoba);
    //this.osoba.czyWyrozniona = !this.osoba.czyWyrozniona;
  }

  zaznacz(): void {
    this.service.zaznacz(this.osoba);
    this.czyZaznaczony = true;
  }

  odznacz(): void {
    this.service.odznacz(this.osoba);
    this.czyZaznaczony = false;
  }
}
