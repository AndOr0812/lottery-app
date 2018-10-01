import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BroadcasterService } from '../services/broadcaster.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  @Input() active = false;
  @Input() doneButton: boolean = false;
  @Output() closed: EventEmitter<boolean> = new EventEmitter();

  constructor(private broadcast: BroadcasterService) {}

  ngOnInit() {
    // subscribe to 'closeModal' events
    this.broadcast.on('closeModal').subscribe(() => {
      this.close();
    });
  }

  close() {
    this.active = false;
    this.closed.emit(false);
  }
}
