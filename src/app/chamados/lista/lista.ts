import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChamadoService } from '../chamado';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './lista.html',
  styleUrl: './lista.css'
})
export class ListaComponent implements OnInit {

  chamados: any[] = [];
  page: number = 0;
  size: number = 5;
  statusSelecionado: string = '';

  constructor(
    private service: ChamadoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.listar(this.page, this.size, this.statusSelecionado).subscribe({
      next: (response) => {
        this.chamados = [...response.content];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  filtrar() {
    this.page = 0; // Resetar para a primeira página ao filtrar
    this.carregar();
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