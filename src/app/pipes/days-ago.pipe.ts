import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysAgo'
})
export class DaysAgoPipe implements PipeTransform {

  transform(value: string) {
    let count: number;
    let text: string;
    const createdData = new Date(value);
    const todayData = new Date();
    const seconds =  Math.floor((+todayData - +createdData) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    switch (true) {
      case seconds >= intervals.year:
        count = Math.floor(seconds / intervals.year);
        text = count === 1 ? `${count} year ago` : `${count} years ago`;
        break;
      case seconds >= intervals.month:
        count = Math.floor(seconds / intervals.month);
        text = count === 1 ? `${count} month ago` : `${count} months ago`;
        break;

      case seconds >= intervals.day:
        count = Math.floor(seconds / intervals.day);
        text = count === 1 ? `${count} day ago` : `${count} days ago`;
        break;

      case seconds >= intervals.minute:
        count = Math.floor(seconds / intervals.minute);
        text = count === 1 ? `${count} minute ago` : `${count} minutes ago`;
        break;

      default:
        text = `just now`;
        break;
    }

    return text;
  }

}
