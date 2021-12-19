import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Diagnosis } from 'src/app/core/model/diagnosis';
import { DiagnosisService } from 'src/app/core/service/diagnosis.service';
import { Util } from 'src/app/core/util/util';
import { faTasks, faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import { InnovaFile } from 'src/app/core/model/innovaFile';
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

  public alertShow = false;
  public alertMessage = 'No hay diagnósticos relacionados con el estidio seleccionado.';
  public alertType = 'warning';
  public studyPk: number;

  constructor(private activatedRoute: ActivatedRoute, 
    public util: Util, public diagnosisService: DiagnosisService,
    private innovaFileService: InnovaFileService) { }

  ngOnInit(): void {
    this.load();
  }

  async load() {
    this.util.loading();
    this.activatedRoute.params.subscribe( async params => {
      this.studyPk = params.studyPk;
      
      if (this.studyPk) {

        try {
          
          this.diagnostics = await this.diagnosisService.findAllByStudyId(this.studyPk)
            .toPromise() as Diagnosis[];
          this.alertShow = this.diagnostics.length === 0;

          this.util.cancelLoading();
        } catch (error) {
          this.util.handleError(error);
        } 
      }
    });
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
}
