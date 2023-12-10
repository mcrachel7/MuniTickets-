export class Ticket {
    _id?: number;
    idUser:string;
    title: string;
    description: string;
    status: string;
    type: string;
    FullName: string;
    department: string;
    adminComment?: string;
    createdAt?:string;

    constructor(_id:number, idUser: string, titulo: string, descripcion: string, estado: string, tipo: string,
      nombre: string, departamento: string, comentarioAdmin:string, createdAt:string ){
        this._id = _id;
        this.idUser = idUser;
      this.title = titulo;
        this.description = descripcion;
        this.status = estado;
        this.type = tipo;
        this.FullName = nombre;
        this.department = departamento;
        this.adminComment = comentarioAdmin;
        this.createdAt = createdAt;
        }
}
