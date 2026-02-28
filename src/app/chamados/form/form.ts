import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ChamadoService } from '../chamado';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class FormComponent {

  form!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private service: ChamadoService
    ) {
      this.form = this.fb.group({
        titulo: ['', Validators.required],
        descricao: ['', Validators.required]
      });
    }

  salvar() {

    if (this.form.invalid) {
      console.log('Formulário inválido');
      return;
    }

    console.log('Form válido!');
    console.log(this.form.value);

    const dados = {
      titulo: this.form.value.titulo,
      descricao: this.form.value.descricao,
      usuarioId: 1,
      grupoId: 1
    };

    this.service.criar(dados).subscribe({
      next: () => {
        alert('Chamado criado com sucesso!');
        this.form.reset();
      },
      error: (err) => {
        console.error('Erro ao criar chamado:', err);
        alert('Ocorreu um erro ao criar o chamado.');
      }
    });

  }  
}
