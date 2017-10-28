import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

declare const tinymce: any;

@Component({
  selector: 'app-simple-tiny-mce',
  // templateUrl: './simple-tiny-mce.component.html',
  template: `<textarea id="{{elementId}}"></textarea>`,
  styleUrls: ['./simple-tiny-mce.component.css']
})
export class SimpleTinyMCEComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnInit() {
  }  

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}