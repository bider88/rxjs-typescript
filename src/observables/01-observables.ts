import { Observable, Observer } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('next [value]:', value),
  error: error => console.log('error [error]:', error),
  complete: () => console.log('complete []:')
}

// const obs$ = Observable.create();
const obs$ = new Observable<string>(subs => {
  subs.next('hola');
  subs.next('Mundo');
  subs.next('hola');
  subs.next('Mundo');
  subs.complete();
  subs.next('hola');
  subs.next('Mundo');
});

obs$.subscribe(observer);
// obs$.subscribe(
//   console.log,
//   console.warn,
//   () => console.info('complete')
// );