import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalityReportDto } from '../core/model/globalReportDto';
import { Institution } from '../core/model/institution';
import { InstitutionReportDto } from '../core/model/institutionReportDto';
import { InstitutionService } from '../core/service/institution.service';
import { Util } from '../core/util/util';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {
  public linkPDF: any;
  public institutionCardDto: InstitutionReportDto = new InstitutionReportDto();
  public modalityReportDto: ModalityReportDto[] = [];
  public institutionReportDto: InstitutionReportDto[] = [];
  public institution: Institution;
  public lstModality: any[] = [];
  public modalityData: any = [];
  public institutionData: any = [];

  view: any[] = [600, 250];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Modalidad';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';
  showDataLabel = true;
  

  colorScheme = {
    domain: ['#0000FF', '#FF0066', '#9900FF', '#AAAAAA']
  };

  constructor(private institutionService: InstitutionService,
    public util: Util,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) {
            
  }

  ngOnInit(): void {
    this.load();
  }

  onSelect(event) {

  }

  public load() {
    this.activatedRoute.params.subscribe( async params => {
      const institutionId = params.institutionId;
      if (institutionId) {
        this.getModalityData(institutionId);
        this.getInstitutionData(institutionId);
        this.getInstitution(institutionId);
        this.generateReport(institutionId);
      }
    });
  }

  private getInstitution(institutionId: number){
    this.institutionService.getById(institutionId).subscribe(response => {
      this.institution = response as Institution;
      this.util.cancelLoading();
    }, (error) => this.util.handleError(error));
  }
  /**
   * Get data of modalities by institutions
   */
  private getModalityData(institutionId: number){
    this.util.loading();
    this.institutionService.modalityReport(institutionId).subscribe(response => {
      this.configureModalityReport(response as ModalityReportDto[]);
      this.util.cancelLoading();
    }, (error) => this.util.handleError(error));
  }

  /**
  * Get data of modalities by institutions
  */
  private getInstitutionData(institutionId: number){
    this.util.loading();
    this.institutionService.institutionReport(institutionId).subscribe(response => {
      this.configureInstitutionReport(response as InstitutionReportDto[]);
      this.util.cancelLoading();
    }, (error) => this.util.handleError(error));
  }

  /**
   * Generate modality report
   * @param modalityReportDto 
   */
  private configureModalityReport(modalityReportDto: ModalityReportDto[]){
    this.modalityReportDto = modalityReportDto; 
    const modalities: any = [];
    this.modalityReportDto.map( modality => {
      modalities.push(
        {
          "name": this.util.getModlity(modality.modality),
          "series": [
            {
                "name": "Estudios",
                "value": modality.numberStuty
            },
            {
                "name": "Pacientes",
                "value": modality.numberPatients
            },
            {
                "name": "Imágenes",
                "value": modality.numberInstances
            }
          ]
        }
      );
    });
    Object.assign(this, { modalityData : modalities });
  }

  /**
  * Generate intitution report
  * @param modalityReportDto 
  */
  private configureInstitutionReport(modalityReportDto: InstitutionReportDto[]){
    this.institutionReportDto = modalityReportDto; 
    const institutions: any = [];
    this.institutionCardDto.numberInstances = 0;
    this.institutionCardDto.numberStuty = 0;
    this.institutionCardDto.numberPatients = 0;

    this.institutionReportDto.map( institution => {
      this.institutionCardDto.numberInstances = this.institutionCardDto.numberInstances + institution.numberInstances;
      this.institutionCardDto.numberStuty = this.institutionCardDto.numberStuty + institution.numberStuty;
      this.institutionCardDto.numberPatients = this.institutionCardDto.numberPatients + institution.numberPatients;
      
      institutions.push(
        {
          "name": "Estudios",
          "value": institution.numberStuty
        },
        {
            "name": "Pacientes",
            "value": institution.numberPatients
        },
        {
            "name": "Imágenes",
            "value": institution.numberInstances
        }
      );
      
    })
    Object.assign(this, { institutionData : institutions });
  }

  /**
   * 
   */
  public generateReport(intitutionId: number){
    this.institutionService.generateReport(intitutionId).subscribe(
      (response: any) => {
        let file = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        this.linkPDF = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
