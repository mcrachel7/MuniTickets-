import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { jsPDF } from 'jspdf';
import  autoTable  from 'jspdf-autotable';

@Component({
  selector: 'app-admin-tickets',
  templateUrl: './admin-tickets.component.html',
  styleUrls: ['./admin-tickets.component.scss']
})
export class AdminTicketsComponent implements OnInit{


  LISTTICKETS: Ticket[] = [];
  public flagLoadTasks:boolean = false;
  searchText!: '';
  selectedStatus!: '';
  selectedTicketType!: '';
  statusTickets: string[] = ['Abierto', 'En Proceso', 'Terminado', 'Cerrado'];
  typeTickets: string[] = ['Impresora', 'Computadora', 'Periféricos', 'Carnet', 'Otros'];
  public imageUrl = '../../../../../assets/logo_muni.png';

  constructor(private _ticketService: TicketService,
    private loginService: LoginService){}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(){

    this._ticketService.loadTickets().subscribe(res => {
     if(res.length>0){
      this.LISTTICKETS = res;
      this.flagLoadTasks= true;
     }
    }

    )
  }



onPrint() {
  const pdf = new jsPDF('portrait', 'px', 'letter');

  const img = new Image();
  img.onload = () => {
    const logoWidth = 50;
    const imageXPosition = 20;
    const logoHeight = (img.height * logoWidth) / img.width;


    pdf.addImage(img, 'PNG', imageXPosition, 20, logoWidth, logoHeight);

    pdf.setFont('Calibri');
    pdf.setFontSize(24);
    pdf.setTextColor(0,0,0);

    pdf.text('Reporte de Tickets', pdf.internal.pageSize.width/2, 50 , {align: 'center'});

    pdf.setFont('Calibri');
    pdf.setFontSize(12);
    pdf.setTextColor(0,0,0);
    pdf.text('Municipalidad de Tela', pdf.internal.pageSize.width/2, 65, {align: 'center'} );


    pdf.addImage(img, 'PNG', pdf.internal.pageSize.width - imageXPosition - logoWidth, 20, logoWidth, logoHeight);


    const tableYPosition = 35 + logoHeight + 5;
    autoTable(pdf, { html: '#content', startY: tableYPosition });
    pdf.save('admin.pdf');
  };

  img.src = this.imageUrl;
}


filterByStatus() {
  if (this.selectedStatus === '') {
    this.searchText = '';
  } else {
    this.searchText = this.selectedStatus;
  }
}

filterByTicketType(){
  if (this.selectedTicketType === '') {
    this.searchText = '';
  } else {
    this.searchText = this.selectedTicketType;
  }
}

}
