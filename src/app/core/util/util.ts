import { Injectable } from "@angular/core";
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class Util {
 
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
    swal.close();
    swal.fire('Oops...', error.message, 'error');
  }

  successMessage(message){
    swal.close();
    swal.fire('¡Operación exitosa!', message, 'success');
  }

  loading(){
    swal.close();
    swal.showLoading();
  }

  cancelLoading(){
    swal.close();
  }
}