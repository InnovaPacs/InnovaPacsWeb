import { Component, OnInit } from '@angular/core';
import { Institution } from 'src/app/core/model/institution';
import { InstitutionService } from 'src/app/core/service/institution.service';
import { Util } from 'src/app/core/util/util';
import { faChartBar, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.sass']
})
export class InstitutionComponent implements OnInit {
  public institutions: Institution[] = [];
  public institutionsAux: Institution[] = [];
  public searchInput = new FormControl('');
  public faChartBar = faChartBar;
  public faTasks = faTasks;
  public alertShow = true;
  public alertMessage = 'No hay instituciones relacionados con la busqueda';
  public alertType = 'warning';
  
  constructor(private institutionService: InstitutionService,
    public util: Util) { }

  ngOnInit(): void {
    this.load();
  }

  public load() {
    this.util.loading();
    this.institutionService.findAll().subscribe(response => {
      this.institutions = response as Institution[];
      this.institutionsAux = response as Institution[];
      this.alertShow = this.institutionsAux.length === 0;
      this.util.cancelLoading();
    }, (error) => this.util.handleError(error));
  }

  /**
  * Search in the array
  */
  public search(){
    this.institutionsAux = this.util.filterArrWithString(this.institutions, this.searchInput.value);
    this.alertShow = this.institutionsAux.length === 0;
  }
}
