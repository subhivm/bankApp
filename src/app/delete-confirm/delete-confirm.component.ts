import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})


export class DeleteConfirmComponent implements OnInit {
  acno:any
   @Input() item:string|undefined//to hold the variables of parent in child,
                                      // we use input decorators
  @Output() onCancel=new EventEmitter()
   @Output() onDelete= new EventEmitter()                        
 constructor() { }

  ngOnInit(): void {
  }
//cancel
  cancel(){
  this.onCancel.emit()
}

//delete
delete(){
  this.onDelete.emit(this.item)

}
}
