import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  finalize,
  of,
  tap,
} from 'rxjs';

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {}

  // calls stopLoading only when the observable obs$ completes
  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.startLoading()),
      concatMap(() => obs$),
      finalize(() => this.stopLoading())
    );
  }

  startLoading() {
    this.loadingSubject.next(true);
  }

  stopLoading() {
    this.loadingSubject.next(true);
  }
}
