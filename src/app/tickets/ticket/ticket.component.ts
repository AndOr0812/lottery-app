import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html'
})
export class TicketComponent implements OnChanges {
  @Input() ticket: any;
  @Input() range;
  @Input() megaRange;
  @Output() change: EventEmitter<any> = new EventEmitter();
  rangeArray: Array<any>;
  megaRangeArray: Array<any>;
  selectedNumbers: number = 0;
  selectedMega: number = 0;
  complete: boolean = false;

  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    let ticket: SimpleChange = change.ticket;
    if (ticket.firstChange) {
      this.rangeArray = this.createNumbersArray(this.range);
      this.megaRangeArray = this.createNumbersArray(this.megaRange);
    }
    if (ticket.currentValue) {
      this.selectedNumbers = 0;
      this.selectedMega = 0;
      this.rangeArray.forEach((number: any) => {
        if (ticket.currentValue.numbers.indexOf(number.value) === -1) {
          number.selected = false;
        } else {
          number.selected = true;
          this.selectedNumbers++;
        }
      });
      this.megaRangeArray.forEach((number: any) => {
        number.selected = false;
      });
      if (ticket.currentValue.mega) {
        this.megaRangeArray[ticket.currentValue.mega - 1].selected = true;
        this.selectedMega++;
      }
      if (this.selectedNumbers === 5 && this.selectedMega === 1) {
        this.complete = true;
      } else {
        this.complete = false;
      }
    } else {
      this.selectedNumbers = 0;
      this.selectedMega = 0;
      this.ticket = {
        numbers: [],
        mega: null
      };
    }
  }

  createNumbersArray(range) {
    const newArray = [];
    for (let i = 1; i < range + 1; i++) {
      newArray.push({
        value: i,
        selected: false
      });
    }
    return newArray;
  }

  quickPick() {
    this.clear();
    while (this.selectedNumbers < 5) {
      this.selectNumber(this.rangeArray[Math.floor(Math.random() * this.rangeArray.length)]);
    }
    this.selectMega(this.megaRangeArray[Math.floor(Math.random() * this.megaRangeArray.length)]);
  }

  clear() {
    this.selectedNumbers = 0;
    this.selectedMega = 0;
    this.rangeArray.forEach((number: any) => {
      number.selected = false;
    });
    this.megaRangeArray.forEach((number: any) => {
      number.selected = false;
    });
    this.change.emit({
      numbers: [null, null, null, null, null],
      mega: null
    });
    this.complete = false;
  }

  selectNumber(number) {
    if (number.selected) {
      number.selected = false;
      this.selectedNumbers--;
    } else {
      if (this.selectedNumbers < 5) {
        this.selectedNumbers++;
        number.selected = true;
      }
    }
    this.checkIfTicketComplete();
  }

  selectMega(number) {
    if (number.selected) {
      number.selected = false;
      this.selectedMega--;
    } else {
      if (this.selectedMega < 1) {
        this.selectedMega++;
        number.selected = true;
      }
    }
    this.checkIfTicketComplete();
  }

  checkIfTicketComplete() {
    this.ticket.numbers = [];
    this.rangeArray.forEach((number: any) => {
      if (number.selected) {
        this.ticket.numbers.push(number.value);
      }
    });
    for (let i = 0; i < 5; i++) {
      this.ticket.numbers[i] = this.ticket.numbers[i] || null;
    }
    this.ticket.mega = null;
    this.megaRangeArray.forEach((number: any) => {
      if (number.selected) {
        this.ticket.mega = number.value;
      }
    });
    if (this.selectedNumbers === 5 && this.selectedMega === 1) {
      this.ticket.complete = true;
      this.complete = true;
    } else {
      this.ticket.complete = false;
      this.complete = false;
    }
    this.change.emit(this.ticket);
  }
}
