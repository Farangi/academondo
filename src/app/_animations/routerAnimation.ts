import { routerTransition } from 'router.animations';
import { trigger, state, animate, transition, style, query, stagger } from '@angular/animations';

export const routerAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('routerAnimation', [

        transition('* <=> *', [
            // Initial state of new route
            query(':enter',
                style({
                    position: 'fixed',
                    width: '100%',                    
                    opacity: 0,
                    transform: 'translateX(-100%)'                    
                }),
            { optional: true }),
            // move page off screen right on leave
            query(':leave',
                animate('900ms ease',
                    style({
                        position: 'fixed',
                        width: '100%',
                        opacity: 0,
                        transform: 'translateX(100%)'
                    })
                ),
            { optional: true }),
            // move page in screen from left to right
            query(':enter',
                animate('500ms ease',
                    style({
                        opacity: 1,
                        transform: 'translateX(0%)'
                    })
                ),
            { optional: true }),
        ])
    ])