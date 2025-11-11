import { inject, Injectable, NgZone } from '@angular/core';
import { BACKEND_API_ALTERED } from '../../../../constants/backend-api-road';
import { Observer, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlteredApiRepository {

  public http: HttpClient = inject(HttpClient);
  public zone: NgZone = inject(NgZone);

  public refreshCardDatabase(): Observable<string> {
    return new Observable<string>((observer: Observer<string>) => {
      const eventSource: EventSource = new EventSource(`${BACKEND_API_ALTERED.ROOT}`);

      eventSource.onmessage = (event: MessageEvent<string>) => {
        this.zone.run(() => observer.next(event.data));
      };

      eventSource.onerror = (error: Event) => {
        this.zone.run(() => observer.error(error));
        eventSource.close();
      }

      return () => eventSource.close();

    });
  }

}