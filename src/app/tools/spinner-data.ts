import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { asap } from 'rxjs/scheduler/asap';
import 'rxjs/add/operator/observeOn';

export class SpinnerData {
  private _counter = 0;
  private _loading = new BehaviorSubject<boolean>(false);
  private _isLoading: Observable<boolean>;

  constructor() {
    this._isLoading = this._loading.observeOn(asap, 1);
  }

  public Inc(count: number = 1): void {
    count = Math.floor(count);
    if (count < 1) {
      console.error(`spinner: invalid count ${count}`);
      return;
    }
    const doLoading: boolean = (this._counter === 0);
    this._counter += count;
    if (doLoading) {
      this._loading.next(true);
    }
  }

  public Dec(): void {
    if (this._counter > 0) {
      this._counter--;
      if (this._counter === 0) {
        this._loading.next(false);
      }
    }
  }

  public get IsLoading(): Observable<boolean> {
    return this._isLoading;
  }

  public Destroy(): void {
    this._loading.complete();
  }
}
