import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    articles;
    text
    readonlyConfig = {
      language: 'us',
      // uiColor: '#F7B42C',
      height: 300,
      toolbarCanCollapse: true,
      toolbarStartupExpanded: false,
      extraPlugins: 'autogrow',
      autoGrow_onStartup: true,
      autoGrow_bottomSpace: 1,
      resize_enabled: false,
      removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,Indent,Outdent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Anchor,Unlink,Link,Image,Flash,Table,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About',
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
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
    }

    constructor() { }

    handleArticlesUpdated(articles) {
        this.articles = articles;
    }

    ngOnInit() {
    }

    scrollHandler(e) {
      if (e === 'bottom') {
        // show next X elements
        console.log(e)
      }
      if (e === 'top') {
        // show previous X elements
        console.log(e);
      }
    }

    handleTextUpdated(text) {
      this.text = text
    }
}