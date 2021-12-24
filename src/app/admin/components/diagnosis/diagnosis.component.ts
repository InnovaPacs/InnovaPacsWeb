import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Diagnosis } from 'src/app/core/model/diagnosis';
import { DiagnosisService } from 'src/app/core/service/diagnosis.service';
import { Util } from 'src/app/core/util/util';
import { faTasks, faEye, faEyeSlash,faTrash } from '@fortawesome/free-solid-svg-icons'; 
import Swal from 'sweetalert2';
import { InnovaFileService } from 'src/app/core/service/innova-file.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.sass']
})
export class DiagnosisComponent implements OnInit {
  public diagnostics: Diagnosis[] = [];
  public faTasks = faTasks;
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  public faTrash = faTrash;

  public alertShow = false;
  public alertMessage = 'No hay interpretaciones relacionados con el estudio seleccionado.';
  public alertType = 'warning';
  public studyPk: number;

  constructor(private activatedRoute: ActivatedRoute, 
    public util: Util, public diagnosisService: DiagnosisService,
    private innovaFileService: InnovaFileService,
    private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  async load() {
    this.util.loading();
    this.activatedRoute.params.subscribe( async params => {
      this.studyPk = params.studyPk;
      
      if (this.studyPk) {

        try {
          
          await this.loadData();

          this.util.cancelLoading();
        } catch (error) {
          this.util.handleError(error);
        } 
      }
    });
  }

  private async loadData(){
    this.diagnostics = await this.diagnosisService.findAllByStudyId(this.studyPk)
            .toPromise() as Diagnosis[];
          this.alertShow = this.diagnostics.length === 0;
  }

  goToContractPdf(diagnosis: Diagnosis) {
    this.innovaFileService.getFileByteArray(diagnosis.fileId).subscribe(
      (response: any) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const linkPDF = URL.createObjectURL(file);
        window.open(linkPDF);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public async delete(id: number){
    await this.diagnosisService.deleteById(id).toPromise();
    this.util.successMessage('La acción se realizo correctamente');
    await this.loadData();
  }

  public confinmDelete(id: number){
    Swal.fire({
      title: '¿Estas seguro de eliminar interpretación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimiar!',
      cancelButtonText: 'Cancelar',
    }).then( async (result) => {
      if (result.isConfirmed) {
        await this.delete(id);
      }
    })
  }
}
