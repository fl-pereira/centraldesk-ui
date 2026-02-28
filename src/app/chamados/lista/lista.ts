import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChamadoService } from '../chamado';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista.html',
  styleUrl: './lista.css'
})
export class ListaComponent implements OnInit {

  chamados: any[] = [];
  page: number = 0;
  size: number = 5;

  constructor(
    private service: ChamadoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

carregar() {
  this.service.listar(this.page, this.size).subscribe({
    next: (response) => {
      this.chamados = [...response.content];
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error(err);
    }
  });
}

  proximaPagina() {
    console.log('Página atual:', this.page);
    this.page++;
    this.carregar();
  }

  paginaAnterior() {
    console.log('Página atual:', this.page);
    if (this.page > 0) {
      this.page--;
      this.carregar();
    }
  }

  trackById(index: number, item: any) {
    return item.id;
  }
  
}