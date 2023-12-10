import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { LoginService } from 'src/app/modules/auth/services/login/login.service';
import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';


import { Inventory } from '../../../models/inventory';


@Component({
  selector: 'app-list-inventory',
  templateUrl: './list-inventory.component.html',
  styleUrls: ['./list-inventory.component.scss']
})
export class ListInventoryComponent implements OnInit{

  listInventory: Inventory[]= [];
  private idUser!:string;
  private token!:string;
  public role:string = "";
  public fileName= "Samplesheet.xlsx"
  searchText!: '';


  constructor(private router: Router,
    private inventoryService: InventoryService,
    private loginService: LoginService,
    private mainContentService: MainContentService){}

  ngOnInit(): void {
    this.initDataUser();
    this.ViewInventory();
  }

  ViewInventory(){
    this.idUser = this.mainContentService.getIdUser();
    this.token = this.mainContentService.getToken();
    this.inventoryService.viewInventory(this.idUser, this.token).subscribe(
      (inventory) => {
     if(inventory.length>0){
      this.listInventory = inventory;
     }
    },
    (error) => {
      console.error('Error fetching Inventory in component:', error);
    });
    }

    deletedInventory(id: any) {
      this.inventoryService.deleteInventory(id).subscribe(
        () => {
          // Remove the deleted item from the listInventory
          this.listInventory = this.listInventory.filter(item => item._id !== id);
        },
        (error) => {
          console.log(error);
        }
      );
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



      // Define header title
      const headerTitle = 'DIRECCION NACIONAL DE BIENES DEL ESTADO';
      XLSX.utils.sheet_add_aoa(ws, [[headerTitle]], { origin: { r: 6, c: 4 } });
      const subtitle = 'Formato para el Ingreso de los Bienes al Nuevo Sistema de Bienes Nacionales';
      XLSX.utils.sheet_add_aoa(ws, [[subtitle]], { origin: { r: 9, c: 3 } });
      const thirdTitle = 'MOBILIARIO Y EQUIPO';
      XLSX.utils.sheet_add_aoa(ws, [[thirdTitle]], { origin: { r: 11, c: 5 } });
      const fourthTitle = 'Institucion: ';
      XLSX.utils.sheet_add_aoa(ws, [[fourthTitle]], { origin: { r: 12, c: 0 } });
      const fifthTitle = 'Gerencia Administrativa: ';
      XLSX.utils.sheet_add_aoa(ws, [[fifthTitle]], { origin: { r: 13, c: 0 } });

      // Define table header title
      const firstTableHeader = 'Documento de Respaldo';
      XLSX.utils.sheet_add_aoa(ws, [[firstTableHeader]], { origin: { r: 14, c: 0 } });
      const secondTableHeader = 'Datos del Bien';
      XLSX.utils.sheet_add_aoa(ws, [[secondTableHeader]], { origin: { r: 14, c: 3 } });
      const thirdTableHeader = 'Especif. Del bien';
      XLSX.utils.sheet_add_aoa(ws, [[thirdTableHeader]], { origin: { r: 14, c: 4 } });
      const fourthTableHeader = 'Ubicación del Bien';
      XLSX.utils.sheet_add_aoa(ws, [[fourthTableHeader]], { origin: { r: 14, c: 6 } });
      const fifthTableHeader = 'Valuación';
      XLSX.utils.sheet_add_aoa(ws, [[fifthTableHeader]], { origin: { r: 14, c: 10 } });
      const sixthTableHeader = 'Responsable del bien';
      XLSX.utils.sheet_add_aoa(ws, [[sixthTableHeader]], { origin: { r: 14, c: 14 } });
      const seventhTableHeader = 'Observaciones';
      XLSX.utils.sheet_add_aoa(ws, [[seventhTableHeader]], { origin: { r: 14, c: 16 } });


      // Define merge ranges
      ws['!merges'] = [
        { s: { r: 6, c: 4 }, e: { r: 6, c: 7 } }, // Merge header cells
        { s: { r: 9, c: 3 }, e: { r: 9, c: 8 } }, // Merge subtitle cells
        { s: { r: 11, c: 5 }, e: { r: 11, c: 6 } }, // Merge thirdTitle cells
        { s: { r: 12, c: 0 }, e: { r: 12, c: 1 } }, // Merge fourthTitle cells
        { s: { r: 13, c: 0 }, e: { r: 13, c: 2 } }, // Merge fifthTitle cells
        { s: { r: 14, c: 0 }, e: { r: 14, c: 2 } }, // Merge firstTableHeader cells
        { s: { r: 14, c: 3 }, e: { r: 14, c: 3 } }, // Merge secondTableHeader cells
        { s: { r: 14, c: 4 }, e: { r: 14, c: 5 } }, // Merge thirdTableHeader cells
        { s: { r: 14, c: 6 }, e: { r: 14, c: 9 } }, // Merge fourthTableHeader cells
        { s: { r: 14, c: 10 }, e: { r: 14, c: 13 } }, // Merge fifthTableHeader cells
        { s: { r: 14, c: 14 }, e: { r: 14, c: 15 } }, // Merge sixthTableHeader cells
        { s: { r: 14, c: 16 }, e: { r: 14, c: 17 } }, // Merge seventhTableHeader cells
      ];



      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, this.fileName);
    }





}
