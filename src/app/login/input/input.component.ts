
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {
  @Input() placeholder: string;
  @Input() dirty: boolean = false;
  @Input() email: boolean = false;
  @Input() hiddenType: boolean = false;
  @Input() minlength: number;
  @Input() maxlength: number = 50;
  @Output() value: EventEmitter<string> = new EventEmitter();
  @Output() enter: EventEmitter<boolean> = new EventEmitter();
  // ngModel for Input
  input;
  // variables
  focused;
  type;
  emailValid;
  emailRegex;
  disabled: boolean = false;

  constructor() {}

  ngOnInit() {
    // only create the email regex if this is an email input
    if (this.email) {
      /* tslint:disable */
      this.emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      /* tslint:enable */
    }
    // set the input type
    this.getType();
  }

  getType() {
    if (this.hiddenType) {
      this.type = 'password';
    } else {
      this.type = 'text';
    }
  }

  sendValue(value) {
    let valid = true;
    // if not optional check against possible validators
    if (value) {
      // email validation
      if (this.email && this.emailRegex) {
        // check matches email valid regex
        this.emailValid = this.emailRegex.test(value);
        if (!this.emailValid) {
          valid = false;
        }
      }
      // minlength validation
      if (this.minlength && value.length < this.minlength) {
        valid = false;
      }
      // maxlength validation
      if (this.maxlength && value.length > this.maxlength) {
        valid = false;
      }
    }
    // Complete the send by emitting the proper value to the parent component
    if (valid) {
      this.value.emit(value);
    } else {
      this.value.emit(null);
    }
  }

  sendKeyup() {
    this.enter.emit(true);
  }
}
