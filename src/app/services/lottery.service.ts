import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Subject } from 'rxjs';

@Injectable()
export class LotteryService {
  lotteries;
  lotteriesChange: Subject<any> = new Subject<any>();
  tickets;

  constructor(private afs: AngularFirestore) { }

  getLotteries() {
    const todoCollectionRef: AngularFirestoreCollection = this.afs.collection('lotteries');
    todoCollectionRef.valueChanges().subscribe((res) => {
      this.lotteries = res;
      this.lotteriesChange.next(this.lotteries);
    });
  }
}
