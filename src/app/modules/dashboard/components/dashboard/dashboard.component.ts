import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { DashboardService } from '../../services/dashboard.service';
import { WebSocketService } from 'src/app/modules/socket/services/web-socket.service';
import { Router } from '@angular/router';
import {Chart } from 'chart.js';

import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public dataDashboard: any;
  public Quantity: any;
  public OpenedTickets: any;
  public ClosedTickets: any;
  public QuantityInventory: any;
  public TicketsbyMonth: any;
  ticketData: { _id: string, count: number }[] = [];

  private idUser!:string;
  private token!:string;

constructor(
  private router: Router,
  private loginService: LoginService,
  private dashboardService: DashboardService,
  private webSocketService: WebSocketService,
  private mainContentService: MainContentService
){}

ngOnInit(): void {
this.quantityTickets();
this.thisOpenedTickets();
this.thisClosedTickets();
this.thisQuantityInventory();
this.thisTicketsbyMonth();
this.thisTicketsByType();



}



adminTickets(){
  this.router.navigate(['/list-tickets']);
}

quantityTickets() {
  this.dashboardService.getQuantityTickets().subscribe( data => {
      console.log(data);
      this.Quantity = data;
    },
    error => {
      console.log(error);
    }
  );
}

thisOpenedTickets(){
  this.dashboardService.getOpenedTickets().subscribe( data => {
      console.log(data);
      this.OpenedTickets = data;
    }, error =>{
      console.log(error);
    }
  );
}

thisClosedTickets(){
  this.dashboardService.getClosedTicket().subscribe( data=>{
    console.log(data);
    this.ClosedTickets = data;
  }, error =>{
    console.log(error);
  }
  );
}

thisQuantityInventory(){
  this.idUser = this.mainContentService.getIdUser();
    this.token = this.mainContentService.getToken();
  this.dashboardService.getQuantityInventory(this.idUser, this.token).subscribe( data=>{
    console.log(data);
    this.QuantityInventory = data;
  }, error =>{
    console.log(error);
  }
  );
}

thisTicketsbyMonth(){
  this.dashboardService.getTicketsPerMonth().subscribe( data =>{
    console.log(data);
    this.TicketsbyMonth = data;
    this.generateColumnChart(this.TicketsbyMonth);
  }, error =>{
    console.log(error);
    }
  );
}

thisTicketsByType(){
  this.dashboardService.getTicketsByTypes().subscribe( data =>{
    console.log(data);
    this.ticketData = data;
  }, error =>{
    console.log(error);
  }
  );
}

getProgressBarColor(index: number): string {
  const colors = ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info'];
  return colors[index % colors.length];
}

generateColumnChart(data: any[]) {
  const labels = data.map(item => item.month);
  const counts = data.map(item => item.count);

  const ctx = document.getElementById('ch1') as HTMLCanvasElement;
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: counts,
        backgroundColor: 'rgb(111, 66, 193)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

}





}
