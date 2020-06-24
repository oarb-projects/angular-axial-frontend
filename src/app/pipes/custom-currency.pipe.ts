import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) { }
  transform(dinero: number, currencyCode?: string, display?: string | boolean, digitsInfo?: string, locale?: string): string {
    if(!dinero) return this.currencyPipe.transform(0, currencyCode, display, locale).split('0.00')[0];
    return this.currencyPipe.transform(dinero, currencyCode, display, digitsInfo, locale);
  }

}
