import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css']
})
export class CKEditorComponent implements OnInit {

  @Input() content: string;
  @Output() output: string;
  ckeditorContent: any;

  ckeditorConfig =  {
    language: 'us',
    // uiColor: '#F7B42C',
    height: 300,
    toolbarCanCollapse: true,
    removeButtons: 'Source,NewPage,Preview,Print,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Language,BidiRtl,BidiLtr,Image,Flash,Table,Smiley,PageBreak,Iframe,SpecialChar,ShowBlocks,About,Save,Templates,Anchor,Link,Unlink,CreateDiv,Blockquote,Maximize,Find,Replace,SelectAll,Scayt,CopyFormatting,RemoveFormat,BGColor,TextColor',
    toolbarGroups:[
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
      { name: 'forms', groups: ['forms'] },
      '/',
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      '/',
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
      { name: 'links', groups: ['links'] },
      { name: 'insert', groups: ['insert'] },
      '/',
      { name: 'styles', groups: ['styles'] },
      { name: 'colors', groups: ['colors'] },
      { name: 'tools', groups: ['tools'] },
      { name: 'others', groups: ['others'] },
      { name: 'about', groups: ['about'] }
    ]
  };

  constructor() { }

  ngOnInit() {
    this.ckeditorContent = this.content

  }

  onChange(e) {
    this.output = e
  }

}
