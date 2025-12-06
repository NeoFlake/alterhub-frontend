import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readableDate',
})
export class ReadableDatePipe implements PipeTransform {
  transform(date: string | Date | null | undefined): string {
    if (!date) return '';

    // Permet de transformer la date passé en format string en format Date pure
    let dateFormatted: Date;
    if (typeof date === 'string') {
      dateFormatted = new Date(date.replace(/\//g, '-'));
    } else {
      dateFormatted = date;
    }

    const dateOnString = dateFormatted.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });

    const tokens = dateOnString.split(' ');

    const capitalized = tokens.map((token) => {
      const lower = token.toLowerCase();
      if(/^[a-z]/.test(token)){
        return token[0].toUpperCase() + token.slice(1);
      }
      return token;
    });

    return capitalized.join(' ');
  }
}
