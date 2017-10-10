import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const myAwesomeAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('myAwesomeAnimation', [

        state('small', style({
            transform: 'scale(1)',
        })),
        state('large', style({
            transform: 'scale(1.2)',
        })),
        // route 'enter' transition
        transition('small <=> large', animate('.3s ease-in-out')),
    ]);
