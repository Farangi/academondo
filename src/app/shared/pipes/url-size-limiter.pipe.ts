import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlSizeLimiter'
})
export class UrlSizeLimiterPipe implements PipeTransform {

  transform(value: string, args?: number): string {
    if(value && args){
      return value.substring(0,args)+'...';  
    }
    return null;
  }

}
