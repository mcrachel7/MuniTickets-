export class  Inventory {
  _id?: number;
  idUser:string;
  BackUpDocumentType?: string;
  BackUpDate?: string;
  BackUpInventoryNumber?: string;
  InvoiceDescription: string;
  SerialNumber: string;
  Color: string;
  Department: string;
  PhoneNumber?: string;
  Floor: string;
  Building: string;
  ValuationDocumentType?: string;
  DocumentNumber?: string;
  DocumentDate?: string;
  UnitPrice?: string;
  OwnerNoId: string;
  OwnerName: string;
  Status: string;
  Observations?: string;
  createdAt?:string;

  constructor(_id:number, idUser: string, BackUpDocumentType: string, BackUpDate: string, BackUpInventoryNumber: string,
    InvoiceDescription: string, SerialNumber: string, Color: string, Department: string, PhoneNumber: string, Floor: string,
    Building: string, ValuationDocumentType: string, DocumentNumber: string, DocumentDate: string, UnitPrice: string, OwnerNoId: string,
    OwnerName: string, Status: string, Observations: string, createdAt:string ){
      this._id = _id;
      this.idUser = idUser;
      this.BackUpDocumentType = BackUpDocumentType;
      this.BackUpDate= BackUpDate;
      this.BackUpInventoryNumber= BackUpInventoryNumber;
      this.InvoiceDescription = InvoiceDescription;
      this.SerialNumber = SerialNumber;
      this.Color = Color;
      this.Department = Department;
      this.PhoneNumber = PhoneNumber;
      this.Floor = Floor;
      this.Building = Building;
      this.ValuationDocumentType = ValuationDocumentType;
      this.DocumentNumber = DocumentNumber;
      this.DocumentDate = DocumentDate;
      this.UnitPrice = UnitPrice;
      this.OwnerNoId = OwnerNoId;
      this.OwnerName = OwnerName;
      this.Status = Status;
      this.Observations = Observations;
      this.createdAt = createdAt;
      }
}
