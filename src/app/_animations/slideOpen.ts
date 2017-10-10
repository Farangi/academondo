import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const slideOpen =    
    trigger('slideOpen', [
        state('open', style({ top: '56px', left: '235px' })),
        state('closed', style({ top: '56px', left: '0px'})),
        
        transition('closed <=> open',[
          animate('.5s ease-out')
        ]),
    ]);
