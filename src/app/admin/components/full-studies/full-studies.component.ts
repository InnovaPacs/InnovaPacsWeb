import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FullStudy } from 'src/app/core/model/fullStudy';
import { StudyService } from 'src/app/core/service/study.service';
import { Util } from 'src/app/core/util/util';

@Component({
  selector: 'app-full-studies',
  templateUrl: './full-studies.component.html',
  styleUrls: ['./full-studies.component.sass']
})
export class FullStudiesComponent implements OnInit {
  private studies: FullStudy[] = [];
  public studiesAux: FullStudy[] = [];
  public searchInput = new FormControl('');

  constructor(private studyService: StudyService,
    public util: Util) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.util.loading();
    this.studyService.findFullStudies().subscribe(response => {
      this.studies = response;
      this.studiesAux = [... this.studies] ;
      this.util.cancelLoading();

    }, (error) => this.util.handleError(error));
  }

  public viewStudy(studyIuid: string){
    if(studyIuid){
      window.open(`http://localhost/viewer.html?studyUID=${studyIuid}`, '_blank');
    }
  }

  /**
  * Search in the array
  */
  public search(){
    this.studiesAux = this.util.filterArrWithString(this.studies, this.searchInput.value);
  }
}
