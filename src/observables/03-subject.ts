import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('next [value]:', value),
  error: error => console.warn('error [error]:', error),
  complete: () => console.info('completed')
}

const interval$ = new Observable<number>(subs => {

  const interval = setInterval(() => {
    subs.next( Math.random() );
  }, 1000);

  return () => {
    clearInterval( interval );
    console.log('destroyed interval');
  }

});

/*
 * 1. Multiple cast
 * 2. It is can work like an Observer too
 * 3. Next, error and complete
 * 
*/
const subject$ = new Subject();

const subscription = interval$.subscribe( subject$ );

// const subs1 = interval$.subscribe( number => console.log('subs1', number) );
// const subs2 = interval$.subscribe( number => console.log('subs2', number) );

const subs1 = subject$.subscribe( observer );
const subs2 = subject$.subscribe( observer );

setTimeout(() => {

  subject$.next(10);
  subject$.complete();

  subscription.unsubscribe();

}, 3500);