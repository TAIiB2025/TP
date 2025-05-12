import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OsobyService } from '../osoby.service';
import { Osoba } from '../../models/osoba.class';
import { OsobaForm } from '../../models/osoba-form';

@Component({
  selector: 'app-osoba-formularz',
  imports: [FormsModule, CommonModule],
  templateUrl: './osoba-formularz.component.html',
  styleUrl: './osoba-formularz.component.css'
})
export class OsobaFormularzComponent {
  private readonly router = inject(Router);
  private readonly osobyService = inject(OsobyService);
  private readonly activatedRoute = inject(ActivatedRoute);

  imie = 'Imię';
  nazwisko = 'Nazwisko';
  wiek = 18;

  constructor() {
    const idOsoby = this.activatedRoute.snapshot.paramMap.get('id');
    if(idOsoby != null) {
      this.osobyService.getById(+idOsoby).subscribe(res => {
        this.imie = res.imie;
        this.nazwisko = res.nazwisko;
        this.wiek = res.wiek;
      })
    }
  }

  onSubmit(event: NgForm): void {
    console.log(event.form.value);

    console.log(this.imie);
    console.log(this.nazwisko);
    console.log(this.wiek);

    console.log('Czy poprawnie wypełniony: ', event.form.valid);
    console.log('Czy błędnie wypełniony: ', event.form.invalid);

    const dto: OsobaForm = {
      imie: event.form.value['imie'],
      nazwisko: event.form.value['nazwisko'],
      wiek: event.form.value['wiek']
    };

    this.osobyService.post(dto).subscribe(() => {
      this.onAnuluj();
    })
  }

  onAnuluj(): void {
    this.router.navigate(['/osoby']);
  }

  onWiekChange(event: number): void {
    console.log('nowy wiek: ', event);
    if(event > 200) {
      this.wiek = 10;
    }
  }
}
