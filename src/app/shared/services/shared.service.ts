import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private isMenuVisibleSubject = new BehaviorSubject<boolean>(false);
  isMenuVisible$ = this.isMenuVisibleSubject.asObservable();


  constructor() { }

  toggleMenuVisibility() {
    this.isMenuVisibleSubject.next(!this.isMenuVisibleSubject.value);
  }
}
