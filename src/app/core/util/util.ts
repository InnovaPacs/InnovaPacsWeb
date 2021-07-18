import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import swal from 'sweetalert2';
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class Util {

  constructor(private router: Router, private authService: AuthService){
  }

  /**
   * Get badge according modality
   * @param modality
   */
  public badge(modality: string): string{
    if(modality === 'CR'){
      return 'badge badge-success';
    }else if(modality === 'CT'){
      return 'badge badge-warning';
    }else if(modality === 'US'){
      return 'badge badge-secondary';
    }else if(modality === 'MR'){
      return 'badge badge-info';
    }else if(modality === 'DX'){
      return 'badge badge-dark';
    }else if (modality === 'XA'){
      return 'badge badge-primary'
    }
  }

  /**
   * Filter only text values.
   * @param array Array in which search the text.
   * @param filter Text to search
   * @returns 
   */
  public filterArrWithString(array: any[], filter: string) {
    let keys = Object.keys(array[0]);

    if (keys.length > 0) {
      const arr = array.filter((item) => {
        return keys.some((key) => {
          if (item[key] == '' || item[key] === undefined || item[key] === null || item[key] === false) {
            return false;
          }
          
          return item[key].toString().toLowerCase().trim().includes(filter.toString().toLowerCase().trim());
        });
      });
      return arr;
    }
  }

  handleError(error){
    swal.fire('Oops...', error.message, 'error');
    if(error.status === 401){
      this.authService.closeSession();
      this.router.navigate(['/']);
    }
  }

  errorMessage(message){
    swal.fire('Oops...', message, 'error');
  }

  successMessage(message){
    swal.fire('¡Operación exitosa!', message, 'success');
  }

  loading(){
    swal.showLoading();
  }

  cancelLoading(){
    swal.close();
  }
}