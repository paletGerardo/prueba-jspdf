import {Component} from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'modulo-cv';

  async download(): Promise<any> {
    const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    const imgWidth = 208;
    const position = 0;

    const page1 = document.querySelector('#page-1');
    const page2 = document.querySelector('#page-2');
    const [imgPage1, imgPage2] = await Promise.all([
      html2canvas(document.getElementById('page-1'), {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY
      }), html2canvas(document.getElementById('page-2'), {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY
      })
      ]);
    // Process first image
    let imgHeight = imgPage1.height * imgWidth / imgPage1.width;
    let contentDataURL = imgPage1.toDataURL('image/png');
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    pdf.addPage();
    // Process second image
    imgHeight = imgPage2.height * imgWidth / imgPage2.width;
    contentDataURL = imgPage2.toDataURL('image/png');
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

    pdf.save('dashboard.pdf'); // Generated PDF
  }

  async exportPDF(): Promise<any> {
    const pdf = new jsPDF('p', 'mm', 'A4');
    const canvas = await html2canvas(document.getElementById('cv'), {
      useCORS: true,
      allowTaint: true,
      scale: 2,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = ((canvas.height * pdfWidth) / canvas.width);
    pdf.addImage(canvas, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('cv.pdf');
  }
}

