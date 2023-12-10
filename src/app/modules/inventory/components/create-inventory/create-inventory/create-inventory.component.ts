import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventory } from '../../../models/inventory';
import { InventoryService } from '../../../services/inventory.service';
import { MainContentService } from 'src/app/modules/home/services/main-content/main-content.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-inventory',
  templateUrl: './create-inventory.component.html',
  styleUrls: ['./create-inventory.component.scss']
})
export class CreateInventoryComponent implements OnInit {
  inventoryForm: FormGroup;
  public idUser:string = "";
  public role:string = "";
  private token!:string;
  id: string | null;

  h4title = 'Crear Nuevo Inventario';
  pTitle= 'Cada bien perteneciente al empleado debe ser ingresado al inventario.';
  pTitle2= 'Ingresar cada uno de los campos para llenar los datos del bien correctamente.';
  buttonTitle= 'Crear Inventario'

  constructor(private fb: FormBuilder, private router: Router,
    private inventoryService: InventoryService,
    private aRouter: ActivatedRoute,
    private mainContentService: MainContentService){
      this.inventoryForm = this.fb.group({
        BackUpDocumentType: [''],
        BackUpDate: [''],
        BackUpInventoryNumber: [''],
        InvoiceDescription: ['', Validators.required],
        SerialNumber: [''],
        Color: ['', Validators.required],
        Department: ['', Validators.required],
        PhoneNumber:  ['', Validators.required],
        Floor:  ['', Validators.required],
        Building:  ['', Validators.required],
        ValuationDocumentType:  [''],
        DocumentNumber:  [''],
        DocumentDate:  [''],
        UnitPrice:  [''],
        OwnerNoId:  ['', Validators.required],
        OwnerName:   ['', Validators.required],
        Status:  [''],
        Observations:  [''],
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.initDataUser();
    this.isEdit();
  }

  addInventory(){
    this.token = this.mainContentService.getToken();
    const INVENTORY: Inventory = {
      idUser : this.mainContentService.getIdUser(),
      BackUpDocumentType: this.inventoryForm.get('BackUpDocumentType')?.value,
      BackUpDate: this.inventoryForm.get('BackUpDate')?.value,
      BackUpInventoryNumber: this.inventoryForm.get('BackUpInventoryNumber')?.value,
      InvoiceDescription: this.inventoryForm.get('InvoiceDescription')?.value,
      SerialNumber: this.inventoryForm.get('SerialNumber')?.value,
      Color: this.inventoryForm.get('Color')?.value,
      Department: this.inventoryForm.get('Department')?.value,
      PhoneNumber: this.inventoryForm.get('PhoneNumber')?.value,
      Floor: this.inventoryForm.get('Floor')?.value,
      Building: this.inventoryForm.get('Building')?.value,
      ValuationDocumentType: this.inventoryForm.get('ValuationDocumentType')?.value,
      DocumentNumber: this.inventoryForm.get('DocumentNumber')?.value,
      DocumentDate: this.inventoryForm.get('DocumentDate')?.value,
      UnitPrice: this.inventoryForm.get('UnitPrice')?.value,
      OwnerNoId: this.inventoryForm.get('OwnerNoId')?.value,
      OwnerName: this.inventoryForm.get('OwnerName')?.value,
      Status: this.inventoryForm.get('Status')?.value,
      Observations: this.inventoryForm.get('Observations')?.value,
      createdAt: this.getDate(),
    }

    if(this.id !== null){
      const updatedInventory: Inventory = {
        idUser: INVENTORY.idUser,
        BackUpDocumentType: INVENTORY.BackUpDocumentType,
        BackUpDate: INVENTORY.BackUpDate,
        BackUpInventoryNumber: INVENTORY.BackUpInventoryNumber,
        InvoiceDescription: INVENTORY.InvoiceDescription,
        SerialNumber: INVENTORY.SerialNumber,
        Color: INVENTORY.Color,
        Department: INVENTORY.Department,
        PhoneNumber: INVENTORY.PhoneNumber,
        Floor: INVENTORY.Floor,
        Building: INVENTORY.Building,
        ValuationDocumentType: INVENTORY.ValuationDocumentType,
        DocumentNumber: INVENTORY.DocumentNumber,
        DocumentDate: INVENTORY.DocumentDate,
        UnitPrice: INVENTORY.UnitPrice,
        OwnerNoId: INVENTORY.OwnerNoId,
        OwnerName: INVENTORY.OwnerName,
        Status: INVENTORY.Status,
        Observations: INVENTORY.Observations
      };

      this.inventoryForm.get('BackUpDocumentType')?.setValue(INVENTORY.BackUpDocumentType);
      this.inventoryForm.get('BackUpDate')?.setValue(INVENTORY.BackUpDate);
      this.inventoryForm.get('BackUpInventoryNumber')?.setValue(INVENTORY.BackUpInventoryNumber);
      this.inventoryForm.get('InvoiceDescription')?.setValue(INVENTORY.InvoiceDescription);
      this.inventoryForm.get('SerialNumber')?.setValue(INVENTORY.SerialNumber);
      this.inventoryForm.get('Color')?.setValue(INVENTORY.Color);
      this.inventoryForm.get('Department')?.setValue(INVENTORY.Department);
      this.inventoryForm.get('PhoneNumber')?.setValue(INVENTORY.PhoneNumber);
      this.inventoryForm.get('Floor')?.setValue(INVENTORY.Floor);
      this.inventoryForm.get('Building')?.setValue(INVENTORY.Building);
      this.inventoryForm.get('ValuationDocumentType')?.setValue(INVENTORY.ValuationDocumentType);
      this.inventoryForm.get('DocumentNumber')?.setValue(INVENTORY.DocumentNumber);
      this.inventoryForm.get('DocumentDate')?.setValue(INVENTORY.DocumentDate);
      this.inventoryForm.get('UnitPrice')?.setValue(INVENTORY.UnitPrice);
      this.inventoryForm.get('OwnerNoId')?.setValue(INVENTORY.OwnerNoId);
      this.inventoryForm.get('OwnerName')?.setValue(INVENTORY.OwnerName);
      this.inventoryForm.get('Status')?.setValue(INVENTORY.Status);
      this.inventoryForm.get('Observations')?.setValue(INVENTORY.Observations);

      this.inventoryService.editInventory(this.id, updatedInventory).subscribe(res => {
        this.router.navigate(['view-inventory']);
      });
  }
  else{
    this.inventoryService.createInventory(INVENTORY, this.token).subscribe(res =>{
      console.log(INVENTORY);
      this.router.navigate(['view-inventory']);
    });
  }
}

  private getDate():string{
    let date: Date = new Date();
    return date.toDateString();
  }

  async initDataUser(){
    await this.loadUserData();
    await this.validateLoginData();
  }

  async loadUserData(){
    if(this.idUser == "" || this.role == "" || this.token == ""){
      this.idUser = await this.mainContentService.getIdUser();
      this.role = await this.mainContentService.getRoleUser();
      this.token = await this.mainContentService.getToken();
    }
  }

  validateLoginData(){
    if(this.idUser == "" || this.role == "" || this.token == ""){
      this.router.navigate(['auth']);
    }
  }

  isEdit(){
    if(this.id !== null){
      this.h4title = 'Actualizar Bienes de Inventario';
      this.pTitle = 'Cada empleado puede actualizar la información de los Bienes de Inventario.'
      this.pTitle2 = 'Se pueden actualizar todos los campos, asegúrese de llenarlos correctamente.'
      this.buttonTitle= 'Actualizar Bien';
      this.inventoryService.obtainInventory(this.id).subscribe(data =>{
        this.inventoryForm.setValue({
          BackUpDocumentType: data.BackUpDocumentType,
          BackUpDate: data.BackUpDate,
          BackUpInventoryNumber: data.BackUpInventoryNumber,
          InvoiceDescription: data.InvoiceDescription,
          SerialNumber: data.SerialNumber,
          Color: data.Color,
          Department: data.Department,
          PhoneNumber: data.PhoneNumber,
          Floor: data.Floor,
          Building: data.Building,
          ValuationDocumentType: data.ValuationDocumentType,
          DocumentNumber: data.DocumentNumber,
          DocumentDate: data.DocumentDate,
          UnitPrice: data.UnitPrice,
          OwnerNoId: data.OwnerNoId,
          OwnerName: data.OwnerName,
          Status: data.Status,
          Observations: data.Observations
        })
      })
    }
  }

}
