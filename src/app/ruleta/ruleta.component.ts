import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ruleta',
  imports: [CommonModule],
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.css']
})

export class RuletaComponent {
  colors = ['#f44336', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0'];
  angle = 0;
  spinning = false;
  
  @Input() opcions: string[] = [];
  @Output() resultatFinal = new EventEmitter<string>();

  girar() {
    if (this.spinning) return;

    this.spinning = true;

    const randomAngle = 360 * 5 + Math.floor(Math.random() * 360);
    this.angle += randomAngle;

    setTimeout(() => {
      this.spinning = false;
      const resultat = this.opcions[Math.floor(Math.random() * this.opcions.length)];
      this.resultatFinal.emit(resultat);
    }, 4000);
  }
}