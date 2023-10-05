import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:any[],searchval:string): any[] {
    return products.filter((element)=>{
return element.title.toLowerCase().includes(searchval.toLocaleLowerCase())
    });
  }

}
