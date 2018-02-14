import { Component } from '@angular/core';
import { AuthService } from './tools';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yaVDR WebConfig';

  constructor(private _authService: AuthService) {
    this._authService.validate();
  }
}
