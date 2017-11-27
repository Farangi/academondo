import { AuthenticationService } from './../shared/authentication.service';
import { LabService } from './lab.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-lab',
  templateUrl: './view-lab.component.html',
  styleUrls: ['./view-lab.component.css']
})
export class ViewLabComponent implements OnInit {
  objectKeys(items) {
    if (items) {
      return Object.keys(items);
    }
  }  

  @Input() lab: any;
  @Input() view: boolean;

  haveApplied: boolean;
  isMember: boolean;
  isOwner: boolean;

  readonlyConfig = {
    language: 'us',
    // uiColor: '#F7B42C',
    // height: 150,
    // width: 100,
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

  constructor(private labService: LabService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isApplicant(this.lab);
    this.isMemberOf(this.lab);
    this.isOwnLab(this.lab);
  }

  apply(key) {    
    this.labService.apply(key);
  }

  unApply(key) {
    this.labService.removeApplicant(key);
  }

  leave(key) {
    this.labService.leave(key);
  }

  isApplicant(lab) {
    this.labService.isApplicant(lab.$key)    
    .subscribe(value => {
      this.haveApplied = value;
    })
  }

  isMemberOf(lab) {
    this.labService.isMember(lab.$key)
      .subscribe(value => {        
        this.isMember = value;
      })
  }

  isOwnLab(lab) {
    this.isOwner =  this.labService.isOwnLab(lab);
  }
  



}
