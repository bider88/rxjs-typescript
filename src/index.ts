import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('next [value]:', value),
  error: error => console.log('error [error]:', error),
  complete: () => console.log('complete []:')
}