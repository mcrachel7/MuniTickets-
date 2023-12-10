export class FAQs {
  _id?: number;
  title: string;
  description: string;
  type: string;
  image: string;
  createdAt?:string;

  constructor(_id:number, titulo: string, descripcion: string, tipo: string, imagen: string , createdAt:string ){
      this._id = _id;
      this.title = titulo;
      this.description = descripcion;
      this.type = tipo;
      this.image = imagen;
      this.createdAt = createdAt;
      }
}
