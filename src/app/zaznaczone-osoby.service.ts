import { Injectable } from '@angular/core';
import { Osoba } from '../models/osoba.class';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZaznaczoneOsobyService {
  // private zaznaczoneOsoby: Osoba[] = [];

  // private readonly zaznaczoneOsobySub = new Subject<Osoba[]>();
  private readonly zaznaczoneOsobySub = new BehaviorSubject<Osoba[]>([]);

  private readonly odznaczenieSub = new Subject<Osoba>();

  constructor() { }

  // get getZaznaczoneOsoby(): Osoba[] {
  //   console.log('getZaznaczoneOsoby')
  //   return this.zaznaczoneOsoby;
  // }

  getOdznaczenieObservable(): Observable<Osoba> {
    return this.odznaczenieSub.asObservable();
  }

  getZaznaczoneOsobyObservable(): Observable<Osoba[]> {
    return this.zaznaczoneOsobySub.asObservable();
  }

  zaznacz(osoba: Osoba): void {
    // this.zaznaczoneOsoby.push(osoba);
    const staraTablica = this.zaznaczoneOsobySub.value;
    staraTablica.push(osoba);
    this.zaznaczoneOsobySub.next(staraTablica);
  }

  odznacz(osoba: Osoba): void {
    // const nowaTablica = this.zaznaczoneOsoby.filter(os => os !== osoba);
    // this.zaznaczoneOsoby = nowaTablica;
    const staraTablica = this.zaznaczoneOsobySub.value;
    const nowaTablica = staraTablica.filter(os => os !== osoba);
    this.zaznaczoneOsobySub.next(nowaTablica);
    this.odznaczenieSub.next(osoba);
  }
}
