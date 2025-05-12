import { Routes } from '@angular/router';
import { OsobyComponent } from './osoby/osoby.component';
import { KlienciComponent } from './klienci/klienci.component';
import { FilmyComponent } from './filmy/filmy.component';

export const routes: Routes = [
    { path: 'osoby', component: OsobyComponent },
    { path: 'klienci', component: KlienciComponent },
    { path: 'filmy', component: FilmyComponent }
];
