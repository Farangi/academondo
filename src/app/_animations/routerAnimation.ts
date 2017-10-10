import { routerTransition } from 'router.animations';
import { trigger, state, animate, transition, style, query } from '@angular/animations';

export const routerAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('routerAnimation', [

        transition('* <=> *', [
            // Initial state of new route
            query(':enter',
                style({
                    position: 'fixed',
                    width: '100%',
                    opacity: 1,
                    transform: 'translateX(-150%)'
                }),
                { optional: true }),
            // move page off screen right on leave
            query(':leave',
                animate('500ms ease-out',
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
                animate('500ms ease-in',
                    style({
                        opacity: 1,
                        transform: 'translateX(0%)'
                    })
                ),
                { optional: true }),
        ])
    ])