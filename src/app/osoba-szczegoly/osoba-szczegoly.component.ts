import { Component, inject } from '@angular/core';
import { Osoba } from '../../models/osoba.class';
import { OsobyService } from '../osoby.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-osoba-szczegoly',
  imports: [RouterLink],
  templateUrl: './osoba-szczegoly.component.html',
  styleUrl: './osoba-szczegoly.component.css'
})
export class OsobaSzczegolyComponent {
  osoba?: Osoba;

  private readonly osobyServie = inject(OsobyService);
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id == null) {
      id = '0';
    }

    this.osobyServie.getById(+id).subscribe(res => {
      this.osoba = res;
    })
  }
}
