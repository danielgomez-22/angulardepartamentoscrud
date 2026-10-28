import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Departamento } from '../../models/departamento';
import { DepartamentosService } from '../../services/service.departamentos';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home-component',
  standalone: false,
  styleUrl: './home-component.css',
  templateUrl: './home-component.html',
})
export class HomeComponent implements OnInit {
  public departamentos!: Array<Departamento>;

  constructor(
    private _service: DepartamentosService, 
    private _cdr: ChangeDetectorRef         
  ) {}

  async loadDepartamentos(): Promise<void> {
    this.departamentos = await this._service.getDepartamentos();
    this._cdr.detectChanges();
  }

  async deleteDepartamento(id: number): Promise<void> {
    let response = await this._service.deleteDepartamento(id);
    await this.loadDepartamentos();
  }

  async ngOnInit(): Promise<void> {
    await this.loadDepartamentos();
  }
    
}