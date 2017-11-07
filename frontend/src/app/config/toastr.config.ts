import { ToastOptions } from 'ng2-toastr';

export class ToastrConfig extends ToastOptions {
    animate = 'fade';
    positionClass = 'toast-bottom-left';
}
