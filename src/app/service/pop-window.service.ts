import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopWindowService {
  visible:WritableSignal<boolean> = signal(false);
  affer:WritableSignal<boolean> = signal(false);
  message:WritableSignal<string> = signal("created");
  constructor() { }

}
