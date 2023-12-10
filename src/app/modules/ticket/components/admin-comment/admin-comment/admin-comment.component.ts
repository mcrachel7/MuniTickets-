import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Ticket } from '../../../models/ticket';
import { TicketService } from '../../../services/ticket.service';
import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';
import { WebSocketService } from 'src/app/modules/socket/services/web-socket.service';

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrls: ['./admin-comment.component.scss']
})
export class AdminCommentComponent implements OnInit{
  ticketForm: FormGroup;
id: string | null;
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
        department: ['', Validators.required],
        adminComment: [null]
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.isEdit();
  }

  onSubmit(){
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
      adminComment: this.ticketForm.get('adminComment')?.value,
      createdAt: this.getDate()
    }
    if(this.id !== null){
      const UpdateTicketByAdmin: Ticket = {
        idUser: TICKET.idUser,
        title: TICKET.title,
        description: TICKET.description,
        status: TICKET.status,
        type: TICKET.type,
        FullName: TICKET.FullName,
        department: TICKET.department,
        adminComment: TICKET.adminComment || ''
      };

      this.ticketForm.get('adminComment')?.setValue(UpdateTicketByAdmin.adminComment);
      this.ticketForm.get('status')?.setValue(UpdateTicketByAdmin.status);
      // Disable all form controls except 'adminComment'
      Object.keys(this.ticketForm.controls).forEach(key => {
        if (key !== 'adminComment' && key !== 'status') {
          this.ticketForm.get(key)?.disable();
        }
      });

      this.ticketService.updateTicketAdmin(this.id, UpdateTicketByAdmin).subscribe(res => {
        this.router.navigate(['list-tickets']);
        this.webSocketService.sendChangedStatusNotification(title);
      });

    }
  }

  isEdit(){
    if(this.id !== null){
      this.ticketService.obtainTicket(this.id).subscribe(data =>{
        this.ticketForm.setValue({
          title: data.title,
      description: data.description,
      status: data.status,
      type: data.type,
      FullName: data.FullName,
      department: data.department,
      adminComment: data.adminComment || null
        })
      })
    }
  }

  private getDate():string{
    let date: Date = new Date();
    return date.toDateString();
  }

}
