import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  item;
  items;
  messages;
  cv$: Observable<any>;
  constructor(private db: AngularFireDatabase) {
    this.cv$ = db.list('/profiles').valueChanges();


    this.messages = db.list('/messages');
    const message$ = this.messages.valueChanges();
    this.item = db.object('/item');
    this.items = this.db.list('items').valueChanges() //, ref => ref.limitToLast(4).orderByKey(true)
    // this.items.push({ name: 'newName' });

    message$.subscribe(console.log);
    message$.subscribe((val) => console.log('Yolo', val));
  }
  save(newName: string) {
    this.item.set({ name: newName });
  }
  update(newSize: string) {
    this.item.update({ size: newSize });
  }
  delete() {
    this.item.remove();
  }  

  ngOnInit() {
  }

  addMessage(newName: string) {
    this.messages.push({ text: newName });
  }
  updateMessage(key: string, newText: string) {
    this.messages.update(key, { text: newText });
  }
  deleteMessage(key: string) {    
    this.messages.remove(key); 
  }
  deleteEverything() {
    this.messages.remove();
  }  
}
