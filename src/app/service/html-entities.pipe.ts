import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'decodeHtml' })
export class DecodeHtmlPipe implements PipeTransform {

  transform(value: string): string {
    const text = document.createElement('textarea');
    text.innerHTML = value;
    return text.value;
  }
}
