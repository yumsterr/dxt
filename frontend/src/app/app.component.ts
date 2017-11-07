import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ToastrService } from './services/toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../globalStyles/materialTheme.scss', '../globalStyles/materialComponents.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Dixit';

  constructor(public vcr: ViewContainerRef,
    public toastrService: ToastrService) {
      toastrService.setVCR(vcr);
  }
}
