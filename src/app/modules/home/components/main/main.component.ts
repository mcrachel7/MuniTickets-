import { Component, OnInit } from '@angular/core';
import { MainContentService } from '../../services/main-content/main-content.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private idUser: string = "";
  public role: string = "";
  private token: string = "";

  public dataDashboard: any;

  public chartData: ChartDataset[] = [];
  public chartLabels: string[] = [];
  public chartOptions: ChartOptions = {};

  constructor(
    private mainContentService: MainContentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initDataUser();
  }

  async initDataUser() {
    await this.loadUserData();
    await this.validateLoginData();
  }

  async loadUserData() {
    if (this.idUser == "" || this.role == "" || this.token == "") {
      this.idUser = await this.mainContentService.getIdUser();
      this.role = await this.mainContentService.getRoleUser();
      this.token = await this.mainContentService.getToken();
    }
  }

  createTicket() {
    this.router.navigate(['/create-ticket']);
  }
  viewHistory() {
    this.router.navigate(['/view-ticket']);
  }
  adminTickets() {
    this.router.navigate(['/list-tickets']);
  }
  home() {
    this.router.navigate(['home']);
  }
  logOut() {
    this.idUser = "";
    this.role = "";
    this.token = "";
    this.mainContentService.logOut();
    this.router.navigate(['auth']);
  }

  validateLoginData() {
    if (this.idUser == "" || this.role == "" || this.token == "") {
      this.router.navigate(['auth']);
    }
  }

  redirectTicketsView() {
    this.router.navigate(['list-tickets']);
  }





}
