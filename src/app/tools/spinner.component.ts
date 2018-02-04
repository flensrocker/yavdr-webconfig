import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class SpinnerData {
  private _counter = 0;
  private _loading = new BehaviorSubject<boolean>(false);

  public IncCounter(): void {
    this._counter++;
    if (this._counter === 1) {
      this._loading.next(true);
    }
  }

  public DecCounter(): void {
    if (this._counter > 0) {
      this._counter--;
      if (this._counter === 0) {
        this._loading.next(false);
      }
    }
  }

  public get IsLoading(): Observable<boolean> {
    return this._loading.asObservable();
  }
}

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  @Input() Data: SpinnerData;

  constructor() {
  }
}
