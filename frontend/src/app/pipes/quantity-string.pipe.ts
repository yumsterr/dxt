import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'quantityString'
})
export class QuantityStringPipe implements PipeTransform {

    transform(value: string, number: number): any {
        return value + ((number === 1) ? '' : 's');
    }

}
