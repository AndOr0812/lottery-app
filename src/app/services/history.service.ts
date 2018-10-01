import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class HistoryService {

  constructor(private afs: AngularFirestore) { }

  getUserPurchaseHistory(email) {
    return new Promise<any>((res, rej) => {
      this.afs.collection('/users').doc(email).collection('purchases').ref.get().then(subCollection => {
        if (subCollection.docs.length > 0) {
          // Get all documents and return them
          res(subCollection.docs.map(doc => doc.data()));
        } else {
          // No purchase history
          res([]);
        }
      }).catch(err => {
        res([]);
      });
    });
  }
}
