import { Observable, Subscriber } from 'rxjs';

export class FrontendEvent {
  private static instance: FrontendEvent | undefined = undefined;
  private static emitter: Subscriber<any> | null = null;
  static observer: Observable<any> | null = null;

  constructor() {
    if (!FrontendEvent.instance) {
      this.init();
      FrontendEvent.instance = this;
    }
    return FrontendEvent.instance;
  }

  private init() {
    FrontendEvent.observer = new Observable((subscriber) => {
      FrontendEvent.emitter = subscriber;
    });
  }

  static emit<T>(data: T) {
    FrontendEvent.emitter.next(data);
  }
}

new FrontendEvent();
