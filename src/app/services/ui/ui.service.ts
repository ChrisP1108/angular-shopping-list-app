import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { Product } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private editingId: number = -1;
  private subject = new Subject<any>();

  constructor() { }

  // Edit Toggler So That Two Items Cannot Have The Editing Text Input On Simultaneously

  setEditId(id: number): void {
    this.editingId = id;
    this.subject.next(this.editingId);
  }

  editID(): Observable<any> {
    return this.subject.asObservable();
  }
}
