import { Component, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RuletaComponent } from '../ruleta/ruleta.component';

@Component({
  selector: 'app-game',
  imports: [CommonModule, TranslateModule, RuletaComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})

export class GameComponent {
  ruletes = Array(5).fill(null);
  categories: string[] = ["PERSON", "DURATION", "POSITION", "PLACE", "CONDITIONS"];

  persones: string[] = this.obtenirPersones();
  duracions: string[] = ["2","5","10","15","20","25","30","45","60","120","240","420","840"];
  postures: string[] = ["MISSIONARY", "DOGGY", "COWGIRL", "REVERSE_COWGIRL", "69", "STANDING", "ANAL", "ORAL", "BDSM", "GOLDEN_SHOWER", "SPIDER", "TITJOB", "PEARL_NECKLACE", "CREAMPIE", "FINGERING", "FISTING"];
  llocs: string[] = ["CEMETERY", "MALL", "CLASSROOM", "BEACH", "YOUR_BEDROOM", "CAR", "HOTEL_HALL", "HOLY_SEE", "FOREST", "POOL", "TRENCH", "GAZA", "GYM", "HOSPITAL", "GRADUATION_PARTY", "PARTY_CONGRESS", "CRAMPED_SHOWER", "CHINESE_RESTAURANT", "STADIUM", "COUSIN_WEDDING", "SUSHI_BUFFET", "AFRICAN_VILLAGE", "TABLE", "ROLLER_COASTER", "PIGSTY", "ISIL_CAMP", "LOOK_ALIKE_CONTEST", "MEETING", "RIDERS_RALLY", "CRIME_SCENE"];
  condicions: string[] = ["VIOLINIST", "CLOWN", "SWEATED", "JACKET", "RABBI", "POLICE", "FOOT_ODOR", "HIGH_AF", "MUEZZIN", "SCOOBY", "SALAD", "SMOKERS", "OILED", "DIARRHEA", "TIKTOK", "INNER_DEMONS", "DRUNKARD", "FULL_SHIT_ASS", "BEGGARS", "OLD_LADY_WIGS", "MENSTRUAL_RAGE", "THROAT_SINGING", "PANICKED", "CAREFULLY", "DRUNK", "BAWLING", "CRYING", "CRYING_BABY", "PUTIN_XI", "ROTTEN_FOOD", "LUBRICANT_ASHES", "XOKAS"];
  llistes = [this.persones, this.duracions, this.postures, this.llocs, this.condicions];

  personaA: string = '';
  personaB: string = '';
  duracioA: string = '';
  duracioB: string = '';
  posturaA: string = '';
  posturaB: string = '';
  llocA: string = '';
  llocB: string = '';
  condicioA: string = '';
  condicioB: string = '';

  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('lang') ?? 'ca';
    this.translate.use(lang);
  }

  @ViewChildren('ruletaSuperior') ruletesTop!: QueryList<RuletaComponent>;
  @ViewChildren('ruletaInferior') ruletesBottom!: QueryList<RuletaComponent>;

  girarTotes(pos: String) {
    const ruletesAGirar = pos == 'top' ? this.ruletesTop : this.ruletesBottom;
    if (pos == 'top') {
      this.personaA = this.duracioA = this.posturaA = this.llocA = this.condicioA = '';
    } else {
      this.personaB = this.duracioB = this.posturaB = this.llocB = this.condicioB = '';
    }
    ruletesAGirar.forEach((ruleta) => ruleta.girar());
  }

  actualitzarResultat(index: number, panell: 'top' | 'bottom', resultat: string) {
    switch (index) {
      case 0:
        if (panell === 'top') this.personaA = resultat;
        else this.personaB = resultat;
        break;
      case 1:
        let minuts = this.translate.instant('MINUTES');
        let hora = this.translate.instant('HOUR');
        let hores = this.translate.instant('HOURS');
        let resultatFloat = parseFloat(resultat);

        let duracio = "";
        if (resultatFloat < 60) {
          duracio = `${resultat} ${minuts}`;
        } else if (resultatFloat === 60) {
          duracio = `1 ${hora}`;
        } else {
          duracio = `${resultatFloat / 60} ${hores}`;
        }

        if (panell === 'top') this.duracioA = duracio;
        else this.duracioB = duracio;
        break;
      case 2:
        let postura = `${this.translate.instant('DOING')} ${this.translate.instant(resultat)}`;

        if (panell === 'top') this.posturaA = postura;
        else this.posturaB = postura;
        break;
      case 3:
        let lloc = this.translate.instant(resultat);

        if (panell === 'top') this.llocA = lloc;
        else this.llocB = lloc;
        break;
      case 4:
        let condicio = this.translate.instant(resultat);

        if (panell === 'top') this.condicioA = condicio;
        else this.condicioB = condicio;
        break;
      default:
        break;
    }
  }

  obtenirPersones(): string[] {
    try {
      const dades = localStorage.getItem('persones');
      const parsed = JSON.parse(dades ?? 'null');

      if (Array.isArray(parsed) && parsed.every((element) => typeof element === 'string')) {
        return parsed;
      }
    } catch (error) {
      console.warn('Error analitzant localStorage:', error);
    }

    return [];
  }
}
