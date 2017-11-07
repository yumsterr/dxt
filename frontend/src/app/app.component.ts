import {Component, ViewEncapsulation, ViewContainerRef} from '@angular/core';
import {ToastrService} from './services/toastr.service';
import {SocketService} from './services/socket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss', '../globalStyles/materialTheme.scss', '../globalStyles/materialComponents.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'Dixit';

    constructor(public vcr: ViewContainerRef,
                public toastrService: ToastrService,
                public socketService: SocketService) {
        toastrService.setVCR(vcr);
    }
}
