import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Departamento } from '../../models/departamento';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-details-component',
  standalone: false,
  styleUrl: './details-component.css',
  templateUrl: './details-component.html',
})
export class DetailsComponent implements OnInit {
  public Departamento!: Departamento;
  constructor(
    private _activeRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params) => {
      console.log(params);
      let id = parseInt(params['id']);
      let nombre = params['nombre'];
      let localidad = params['localidad'];
      this.Departamento = new Departamento(id, nombre, localidad);
      this._cdr.detectChanges();
    })
  }

}
