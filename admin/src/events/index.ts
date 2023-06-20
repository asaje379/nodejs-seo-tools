export class EventListener {
  eventSource: EventSource | undefined;
  private static instance: EventListener | undefined = undefined;

  constructor(url: string) {
    if (!EventListener.instance) {
      this.eventSource = new EventSource(url);
      EventListener.instance = this;
    }
    return EventListener.instance;
  }
}

export function addEventSourceListener<T>(
  event: string,
  cb: (data: T) => void | Promise<void>,
) {
  const eventListener = new EventListener(
    import.meta.env.VITE_APP_API_BASE_URL + '/events',
  );
  eventListener.eventSource?.addEventListener('message', (e) => {
    const ev = JSON.parse(e.data);
    if (ev.event === event) cb(ev.data);
  });
}
