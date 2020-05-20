import { Observable, Observer, Subscription } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('next [value]:', value),
  error: error => console.warn('error [error]:', error),
  complete: () => console.info('completed')
}


const interval$ = new Observable<number>(
  subs => {
    let count = 0
    const interval: NodeJS.Timeout = setInterval(() => {
      subs.next(++count);
      console.log('count', count);
    }, 1500);

    setTimeout(() => {
      subs.complete();
    }, 3000);

    return () => {
      clearInterval(interval);
      console.log('Destroyed interval');
    }
  }
);

const subscription: Subscription = interval$.subscribe(observer);
const subscription2: Subscription = interval$.subscribe(observer);
const subscription3: Subscription = interval$.subscribe(observer);

subscription.add( subscription2 ).add( subscription3 );

setTimeout(() => {

    subscription.unsubscribe();

    console.log('Finished subscription');
}, 6000);