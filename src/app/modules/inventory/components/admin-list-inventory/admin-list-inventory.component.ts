import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { Inventory } from '../../models/inventory';

@Component({
  selector: 'app-admin-list-inventory',
  templateUrl: './admin-list-inventory.component.html',
  styleUrls: ['./admin-list-inventory.component.scss']
})
export class AdminListInventoryComponent implements OnInit{

  listInventory: Inventory[]= [];
  private idUser!:string;
  private token!:string;
  public role:string = "";
  public fileName= "Samplesheet.xlsx"
  searchText!: '';
  selectedDepartment!: '';
  departmentInventory: string[] = ['Obras Públicas', 'Catastro', 'Tributación', 'Recursos Humanos',
                                   'UMA', 'Turismo', 'Contabilidad', 'Tesoreria', 'Contabilidad',
                                   'Gobernabilidad', 'Relaciones Públicas', 'Auditoría', 'Desarrollo Agrícola',
                                   'Informática', 'Alcaldía', 'Compras', 'Secretaría', 'Legal', 'Regidores',
                                   'Gerencia Administrativa'];


  constructor(private router: Router,
    private inventoryService: InventoryService,
    private loginService: LoginService,
    private mainContentService: MainContentService){}

  ngOnInit(): void {
    this.initDataUser();
    this.loadAdminInventory();
  }

  loadAdminInventory(){

    this.inventoryService.loadAdminInventory().subscribe(res => {
     if(res.length>0){
      this.listInventory = res;
     }
    }

    )
  }


    async initDataUser(){
      await this.loadUserData();
      await this.validateLoginData();
    }

    async loadUserData(){
      if(this.idUser == "" || this.role == ""){
        this.idUser = await this.mainContentService.getIdUser();
        this.role = await this.mainContentService.getRoleUser();
      }
    }


    validateLoginData(){
      if(this.idUser == "" || this.role == "" ){
        this.router.navigate(['auth']);
      }
    }

    exportExcel(): void {
      const element = document.getElementById('table-excel');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { origin: 'A16' });

      const headerTitle = 'DIRECCION NACIONAL DE BIENES DEL ESTADO';
      XLSX.utils.sheet_add_aoa(ws, [[headerTitle]], { origin: 'E7'});
      const subtitle = 'Formato para el Ingreso de los Bienes al Nuevo Sistema de Bienes Nacionales';
      XLSX.utils.sheet_add_aoa(ws, [[subtitle]], { origin: 'D10' });
      const thirdTitle = 'MOBILIARIO Y EQUIPO';
      XLSX.utils.sheet_add_aoa(ws, [[thirdTitle]], { origin: 'F12' });
      const fourthTitle = 'Institucion: ';
      XLSX.utils.sheet_add_aoa(ws, [[fourthTitle]], { origin: 'A13' });
      const fifthTitle = 'Gerencia Administrativa: ';
      XLSX.utils.sheet_add_aoa(ws, [[fifthTitle]], { origin: 'A14' });



      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, this.fileName);
    }

    filterByDepartment() {
      if (this.selectedDepartment === '') {
        this.searchText = '';
      } else {
        this.searchText = this.selectedDepartment;
      }
    }

}
