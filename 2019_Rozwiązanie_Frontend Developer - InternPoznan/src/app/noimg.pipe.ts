import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimg'
})
export class NoimgPipe implements PipeTransform {
  transform(images: any[]): string {
    if (!images || images.length < 1) {
      return 'assets/img/noimage.png';
    } else {
      return images[1].url;
    }
  }
}
