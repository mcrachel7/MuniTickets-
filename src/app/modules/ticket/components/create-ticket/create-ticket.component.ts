import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from '../../models/ticket';
import { WebSocketService } from 'src/app/modules/socket/services/web-socket.service';
import { ActivatedRoute,Router } from '@angular/router';

import { TicketService } from '../../services/ticket.service';
import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit{
ticketForm: FormGroup;
id: string | null;
h4title = 'Crear Nuevo Ticket';
pTitle= 'Cada empleado debe crear un ticket cuando necesite asistencia de soporte técnico.';
pTitle2= 'Ingresar cada uno de los campos para llenar los datos correctamente.';
buttonTitle= 'Crear Ticket'

private token!:string;
  constructor(private fb: FormBuilder, private router: Router,
              private ticketService: TicketService,
              private webSocketService: WebSocketService,
              private mainContentService: MainContentService,
              private aRouter: ActivatedRoute){
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
      FullName: ['', Validators.required],
      department: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.isEdit();
  }

  redireccionar() {
    this.router.navigate(['/home']);
  }



  addTicket(){
    this.token = this.mainContentService.getToken();
    const title = this.ticketForm.get('title')?.value;

    const TICKET: Ticket = {
      idUser : this.mainContentService.getIdUser(),
      title: title,
      description: this.ticketForm.get('description')?.value,
      status: this.ticketForm.get('status')?.value,
      type: this.ticketForm.get('type')?.value,
      FullName: this.ticketForm.get('FullName')?.value,
      department: this.ticketForm.get('department')?.value,
      createdAt: this.getDate()
    }

    if(this.id !== null){
      const updatedStatus: Ticket = {
        idUser: TICKET.idUser,
        title: TICKET.title,
        description: TICKET.description,
        status: TICKET.status,
        type: TICKET.type,
        FullName: TICKET.FullName,
        department: TICKET.department
      };

      this.ticketForm.get('status')?.setValue(TICKET.status);

      // Disable all form controls except 'status'
      Object.keys(this.ticketForm.controls).forEach(key => {
        if (key !== 'status') {
          this.ticketForm.get(key)?.disable();
        }
      });

      this.ticketService.editTicket(this.id, updatedStatus).subscribe(res => {
        this.router.navigate(['view-ticket']);
      });

    } else {
      this.ticketService.createTicket(TICKET, this.token).subscribe(res =>{
        console.log(TICKET);
        this.router.navigate(['view-ticket']);

        this.webSocketService.sendNewTicketNotification(title);
      });
    }
  }

  private getDate():string{
    let date: Date = new Date();
    return date.toDateString();
  }

  isEdit(){
    if(this.id !== null){
      this.h4title = 'Actualizar Estado de Ticket';
      this.pTitle = 'Cada empleado debe actualizar el estado del Ticket cuando el equipo de soporte técnico termine de brindar asistencia.'
      this.pTitle2 = 'Solamente se puede actualizar el campo de Estado, si escribe algo en los otros campos, los cambios, no serán guardados.'
      this.buttonTitle= 'Actualizar Estado';
      this.ticketService.obtainTicket(this.id).subscribe(data =>{
        this.ticketForm.setValue({
          title: data.title,
      description: data.description,
      status: data.status,
      type: data.type,
      FullName: data.FullName,
      department: data.department,
        })
      })
    }
  }



}

