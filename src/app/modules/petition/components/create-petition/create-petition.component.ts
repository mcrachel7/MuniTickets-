import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-create-petition',
  templateUrl: './create-petition.component.html',
  styleUrls: ['./create-petition.component.scss']
})
export class CreatePetitionComponent implements OnInit{

  petitionForm: FormGroup;
  public imageUrl = '../../../../../assets/Encabezado.png';


  constructor( private fb: FormBuilder){
    this.petitionForm = this.fb.group({
      headOfDepartment: ['', Validators.required],
      headOfDepartmentPrefix: [''],
      department: ['', Validators.required],
      type: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  ngOnInit(): void {}

  onSubmit() {

    const formData = this.petitionForm.value;
    const pdf = new jsPDF('portrait', 'px', 'letter');
    const marginLeft = 30; // 2 cm


    const startX = marginLeft;


    const img = new Image();
    img.onload = () => {
      const logoWidth = 410;
      const imageXPosition = 20;
      const logoHeight = (img.height * logoWidth) / img.width;

      pdf.addImage(img, 'PNG', imageXPosition, 20, logoWidth, logoHeight);

      pdf.setFont('Times New Roman', 'bold');
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      const startTemplate = `
      Tela, Atlántida
      ${formData.date}

      ${formData.headOfDepartmentPrefix} ${formData.headOfDepartment}
      Jefe ${formData.department}
      `;
      pdf.text(startTemplate, startX, 100, { align: 'left' });


      pdf.setFont('Times New Roman', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      const pdfTemplate = `
        Por medio de la presente nota, el departamento de Informática hace constar que se hizo la
        respectiva revisión de la ${formData.type.toLowerCase()} marca ${formData.brand}, modelo ${formData.model}, ubicada en el
        departamento de ${formData.department} y se determinó que esta misma está llegando al final
        de su vida útil, ya que presenta varias fallas y se necesita la compra de una nueva
        para poder reemplazar la misma ${formData.type.toLowerCase()}, para poder realizar todos los trabajos que
        son de vital importancia para mismo departamento.

        Sin otro en particular,
      `;

      pdf.text(pdfTemplate, startX, 220, { align: 'left' });

      const signature = `
        _______________________________
        Lic. Savier Velásquez
        Jefe de Informática
      `;
      pdf.setFont('Times New Roman', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text(signature, pdf.internal.pageSize.width / 2, 400, { align: 'center' });

      pdf.setFont('Times New Roman', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(0, 0, 0);
      const endTemplate = `
        CC. ${formData.department.toUpperCase()}
        CC. ARCHIVO
      `;

      pdf.text(endTemplate, startX, 530, { align: 'left' });

      pdf.save('dictamen.pdf');
    };

    img.src = this.imageUrl;
  }


}
