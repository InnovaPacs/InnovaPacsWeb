import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aet } from 'src/app/core/model/aet';
import { Dcm4cheeService } from 'src/app/core/service/dcm4chee.service';
import { faShareSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Util } from 'src/app/core/util/util';

@Component({
  selector: 'app-share-study',
  templateUrl: './share-study.component.html',
  styleUrls: ['./share-study.component.sass']
})
export class ShareStudyComponent implements OnInit {
  public faShareSquare = faShareSquare;
  public faTimes = faTimes;

  @ViewChild('btnCloseModal')
  private btnCloseModal: ElementRef;
  @Input() 
  private uuid: string;
  public aets: Aet[] = [];
  public exportForm: FormGroup;
  public submitted = false;

  constructor(private dcm4cheeService: Dcm4cheeService,
    private formBuilder: FormBuilder, private util: Util) { }

  ngOnInit() {
    this.initList();
    this.initForm();
  }

  private async initList (){
    this.aets = await this.dcm4cheeService.findAllAet().toPromise() as Aet[]; 
  }

  private initForm() {
    this.exportForm = this.formBuilder.group({
      aet: [null, [ Validators.required ]]
    });
  }

  public async onSubmit(){
    this.submitted = true;

    if (this.exportForm.invalid) {
      return;
    }

    this.util.loading();
    const config = this.exportForm.value;
    await this.dcm4cheeService.export(this.uuid, config['aet']).toPromise();
    this.btnCloseModal.nativeElement.click();
    this.util.successMessage('¡El estudio se exporto correctamente!');
  }

  get f() { return this.exportForm.controls; }
}
