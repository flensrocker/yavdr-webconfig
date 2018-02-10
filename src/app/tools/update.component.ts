import { Component } from '@angular/core';
import { UpdateService } from './update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  constructor(
    public updateService: UpdateService,
  ) {
  }
}
