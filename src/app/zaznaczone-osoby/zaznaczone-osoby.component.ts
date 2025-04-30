import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Osoba } from '../../models/osoba.class';
import { CommonModule } from '@angular/common';
import { ZaznaczoneOsobyService } from '../zaznaczone-osoby.service';
import { Observable, Subscription } from 'rxjs';
import { ParserOsobyPipe } from '../parser-osoby.pipe';

@Component({
  selector: 'app-zaznaczone-osoby',
  imports: [CommonModule, ParserOsobyPipe],
  templateUrl: './zaznaczone-osoby.component.html',
  styleUrl: './zaznaczone-osoby.component.css'
})
export class ZaznaczoneOsobyComponent implements OnInit, OnDestroy {
  // zaznaczoneOsoby: Osoba[] = [];

  private readonly service = inject(ZaznaczoneOsobyService);
  readonly zaznaczoneOsoby$: Observable<Osoba[]> = this.service.getZaznaczoneOsobyObservable();
  private readonly subs: Subscription = new Subscription();

  private static id = 0;
  private intervalRef!: any;

  constructor() {
    // const zaznaczoneOsoby$ = this.service.getZaznaczoneOsobyObservable();
    // const zaznaczoneOsobySub = zaznaczoneOsoby$.subscribe(noweOsoby => {
    //   console.log('Odebrano nowe osoby');
    //   this.zaznaczoneOsoby = noweOsoby;
    // });

    // this.subs.add(zaznaczoneOsobySub);
    let id = ZaznaczoneOsobyComponent.id++;

    this.intervalRef = setInterval(() => console.log('interval ', id), 300);
  }
  
  ngOnInit(): void {
    console.log('init');
  }

  ngOnDestroy(): void {
    console.log('destroy');
    clearInterval(this.intervalRef);
    this.subs.unsubscribe();
  }

  odznacz(osoba: Osoba): void {
    this.service.odznacz(osoba);
  }
}
