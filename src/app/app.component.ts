import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  nomPersona: string = '';
  persones: string[] = [];
  idiomes: { [key: string]: string } = {
    "ca": "es-ct",
    "en": "gb",
    "es": "es"
  };
  idiomaActual = 'ca';

  constructor(private translate: TranslateService, private router: Router) {
    this.idiomaActual = this.translate.getDefaultLang();
  }

  canviaIdioma(event: Event) {
    const select = event.target as HTMLSelectElement;
    const lang = select.value;
    this.translate.use(lang);
    this.idiomaActual = lang;
    localStorage.setItem('lang', lang);
  }

  ngOnInit() {
    const dades = localStorage.getItem('persones');
    if (dades) {
      this.persones = JSON.parse(dades);
    }
    const lang = localStorage.getItem('lang') ?? 'ca';
    this.translate.use(lang);
    this.idiomaActual = lang;
  }

  afegirPersona() {
    const nom = this.nomPersona.trim();
    if (nom) {
      this.persones.push(nom);
      localStorage.setItem('persones', JSON.stringify(this.persones));
      this.nomPersona = '';
    }
  }

  eliminaPersona(index: number) {
    this.persones.splice(index, 1);
    localStorage.setItem('persones', JSON.stringify(this.persones));
  }

  jugar() {
    this.router.navigate(['/game']);
  }

  get minim(): boolean {
    const persones = JSON.parse(localStorage.getItem('persones') || '[]');
    return persones.length >= 4;
  }
}