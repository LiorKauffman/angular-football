import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ConnectorService {
    public mySubj :Subject<string>= new BehaviorSubject<string>(null);
  constructor() {}
}
