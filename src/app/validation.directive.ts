
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[decimalValidation]'
})


export class DecimalValidation {
   
    // Allow decimal numbers. The \. is only allowed once to occur
    private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);

    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = [ 'Backspace', 'Delete', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown' ];

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {
    
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        
    let current: string = this.el.nativeElement.value;
  
    if(current=='0' && event.key=='0'){
   
      event.preventDefault();
    }
    
    if ((current.indexOf('.') != -1) &&
         (current.substring(current.indexOf('.')).length > 2) &&
         (event.which != 0 && event.which != 8)) 
          {
            event.preventDefault();
          }
    
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
}
