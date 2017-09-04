import { Component, OnInit, ElementRef, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FieldOfInterest } from '../shared/models';


export const AUTOCOMPLETE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteComponent),
    multi: true
};


@Component({
    selector: 'app-autocomplete',
    // host: {
    //       '(document:click)': 'handleClick($event)',
    // },
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.css'],
    providers: [AUTOCOMPLETE_VALUE_ACCESSOR]
})
export class AutocompleteComponent implements ControlValueAccessor {
    protected onModelChange: Function = (_: any) => { };
    protected onModelTouched: Function = () => { };

    //From ControlValueAccessor interface
    writeValue(value: any): void {
        if (value !== undefined) {
            this.filteredList = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onModelChange = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onModelTouched = fn;
    }


    public query = '';

    @Input()
    public options: FieldOfInterest[];
    public filteredList = [];
    public elementRef;
    private selectedIdx: number;
    @Output('elem-selected')
    public selectedFieldOfInterest = new EventEmitter<string[]>();

    public selected = [];

    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
        this.selectedIdx = -1;
        //, @Optional() ngControl: NgControl
        //  if (ngControl) {
        //     ngControl.valueAccessor = this;
        // }
    }

    filter() {
        if (this.query !== "") {
            const options = this.options.map(foi => {
                return foi.name;
            });
            this.filteredList = options.filter(function (el) {
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    public select(item) {
        console.log('select!', item);
        this.selected.push(item);
        this.query = '';
        this.filteredList = [];
        this.selectedFieldOfInterest.emit(item);
    }

    remove(item) {
        this.selected.splice(this.selected.indexOf(item), 1);
    }

    handleBlur() {
        if (this.selectedIdx > -1) {
            this.query = this.filteredList[this.selectedIdx];
        }
        this.filteredList = [];
        this.selectedIdx = -1;
    }

    // handleClick(event) {
    //     var clickedComponent = event.target;
    //     var inside = false;
    //     do {
    //         if (clickedComponent === this.elementRef.nativeElement) {
    //             inside = true;
    //         }
    //         clickedComponent = clickedComponent.parentNode;
    //     } while (clickedComponent);
    //     if (!inside) {
    //         this.filteredList = [];
    //     }
    //     this.selectedIdx = -1;
    // }
}