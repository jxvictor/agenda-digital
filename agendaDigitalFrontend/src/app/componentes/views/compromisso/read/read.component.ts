import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Compromisso } from 'src/app/componentes/model/Compromisso';
import { Page } from 'src/app/componentes/model/page.model';
import { CompromissoService } from 'src/app/componentes/service/compromisso.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent {

  isAscendingOrder: boolean = true;

  compromissos: Array<Compromisso> = [];
  private page!: Page;
  pageEvent!: PageEvent;

  displayedColumns: string[] = ['id', 'nome', 'inicio', 'fim', 'acoes'];

  constructor(private service: CompromissoService,
    private router: Router,
    private dialog: MatDialog
  ){}

  ngOnInit(){
    this.pageCompromissos(0, 10);
    
    this.pageEvent = {
      length: 0,
      pageIndex: 0,
      pageSize: 10,
      previousPageIndex: 0
    };
  }

  pageCompromissos(page: number, size: number, sort: string = '') {
    this.service.findCompromissoPage(page, size, sort).subscribe(resposta => {
      this.page = resposta;
      this.compromissos = this.page.content;
    });
  }
  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page;
    this.service.findCompromissoPage(page, size).subscribe(resposta =>{
      this.page = resposta;
      this.compromissos = this.page.content;
    });
  }

  sortData(column: string): void {
    const sortDirection = this.isAscendingOrder ? 'asc' : 'desc';

    // Add the sorting logic here based on the column and direction
    const sort = `${column},${sortDirection}`;

    this.pageCompromissos(this.pageEvent.pageIndex, this.pageEvent.pageSize, sort);

    // Toggle the sorting order for the next click
    this.isAscendingOrder = !this.isAscendingOrder;
  }

}
