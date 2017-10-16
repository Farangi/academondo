import { animate, animation, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';

export const staggeringChips =
    trigger('staggeringChips', [        

        transition('any => any', [
            query(':enter', style({ opacity: 0}), {optional: true}),

            query(':enter', stagger('300ms', [
                animate('1s ease-in', keyframes([
                    style({opacity: 0, transform: 'translateY(-75px)', offset: 0}),
                    style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
                ]))
            ]), { optional: true }),
            query(':leave', stagger('300ms', [
                animate('1s ease-in', keyframes([
                    style({ opacity: 1, transform: 'translateY(0px)', offset: 0 }),
                    style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
                    style({ opacity: 0, transform: 'translateY(-75px)', offset: 1 })
                ]))
            ]), { optional: true }),            
        ]),
    ]);

