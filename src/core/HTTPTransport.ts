const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type Options = {
    method: string,
    timeout?: number;
    headers?: string[];
    data?: string[];
};

export class HTTPTransport {
  constructor() {}

  private queryStringify(data: object) {
    const res = Object.entries(data)
      .reduce(
        (acc, e, i) => `${acc}${i > 0 ? '&' : '?'}${e[0]}=${(e[1])}`,
        '',
      );
    return res;
  }

  get = (url: string, options: Options) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post = (url: string, options: Options) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put = (url: string, options: Options) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete = (url: string, options: Options) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url: string, options: Options = { method: METHODS.GET }, timeout: number = 50) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.timeout = timeout;

      xhr.open(method, METHODS.GET && !!data
        ? `${url}${this.queryStringify(data)}`
        : url);

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value as string);
        }
      }

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET && !data) {
        xhr.send();
      } else {
        xhr.send();
      }
    });
  };
}
