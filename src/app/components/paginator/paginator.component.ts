import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {

  // Inyección de Input para recibir el atributo desde el componente padre
  @Input() child_paginator: any;

  // Total de registros
  total_elements: number;
  
  // Arreglo de paginas que se iteran en el html
  pages: number[];

  // Variables para controlar el numero de paginas
  since: number;
  to: number;

  constructor() { }

  // Inicializa el paginador la primera vez
  ngOnInit() {
    this.initPaginator();
    this.total_elements = this.child_paginator.totalElements;
  }

  // Actualiza el paginador cuando cambia de pagina, actualiza los botones de páginas
  ngOnChanges(changes: SimpleChanges) {
    let updatedPaginator = changes['child_paginator'];

    // Verifica si existe una actualización accedencia al valor previo(previousValue)
    if(updatedPaginator.previousValue){
      this.initPaginator();
    }
  }

  initPaginator(): void{
    // Calcula el minimo y máximo de páginados
    this.since = Math.min(Math.max(1, (this.child_paginator.number - 4)), (this.child_paginator.totalPages - 5));
    this.to = Math.max(Math.min(this.child_paginator.totalPages, (this.child_paginator.number + 4)), 6);

    if(this.child_paginator.totalPages > 5){
      this.pages = new Array(this.to - (this.since + 1)).fill(0).map((_value, index) => index + this.since);
    }else{
      // Crea un nuevo arreglo, luego lo rellena con ceros y reemplaza los valores el valor del index + 1
      // Al nombre del value se coloca un "_" para que no aparezca el warning de que no se está utilizando
      this.pages = new Array(this.child_paginator.totalPages).fill(0).map((_value, index) => index + 1);
    }
  }
}
