import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { Ticket } from '../../models/ticket';
import { jsPDF } from 'jspdf';
import  autoTable  from 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.scss']
})
export class ListTicketsComponent implements OnInit{
  public listTicket: any= [];
  private idUser!:string;
  private token!:string;
  public flagLoadTasks:boolean = false;
  searchText!: '';
  selectedStatus!: '';
  selectedTicketType!: '';
  statusTickets: string[] = ['Abierto', 'En Proceso', 'Terminado','Cerrado'];
  typeTickets: string[] = ['Impresora', 'Computadora', 'Periféricos', 'Carnet', 'Otros'];
  public ticket!: Ticket;
  public imageUrl = '../../../../../assets/logo_muni.png';


  constructor(private ticketService: TicketService,
    private loginService: LoginService,
    private mainContentService: MainContentService
    ){}

  ngOnInit(): void {
    this.listTickets();
  }


  listTickets() {
    this.idUser = this.mainContentService.getIdUser();
    this.token = this.mainContentService.getToken();

    this.ticketService.viewTicket(this.idUser, this.token).subscribe(
      (tickets) => {
        if (tickets.length > 0) {
          this.listTicket = tickets;
          this.flagLoadTasks = true;
        }
      },
      (error) => {
        // Handle the error (e.g., redirect to login page or show error message)
        console.error('Error fetching tickets in component:', error);
      }
    );
  }



  onPrint() {
    this.idUser = this.mainContentService.getIdUser();
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
      pdf.save(this.idUser + '.pdf');
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
