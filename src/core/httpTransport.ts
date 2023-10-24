import constants from './constain';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

type HTTPMethod = <R=unknown>(url: string, data?: Object, headers?: Object) => Promise<R>

export class HttpTransport {
  private apiUrl: string = '';

  constructor(apiPath: string) {
    this.apiUrl = `${constants.HOST}${apiPath}`;
  }

  private queryStringify(data: object) {
    const res = Object.entries(data)
      .reduce(
        (acc, e, i) => `${acc}${i > 0 ? '&' : '?'}${e[0]}=${(e[1])}`,
        '',
      );
    return res;
  }

  get: HTTPMethod = (url, data = {}, headers = {}) => {
    url = data ? `${this.apiUrl}${url}${this.queryStringify(data)}` : `${this.apiUrl}${url}`;
    return this.request(url, METHODS.GET, data, headers);
  }

  post: HTTPMethod = (url, data = {}, headers = {}) => this.request(`${this.apiUrl}${url}`, METHODS.POST, data, headers)

  put: HTTPMethod = (url, data = {}, headers = {}) => this.request(`${this.apiUrl}${url}`, METHODS.PUT, data, headers)

  delete: HTTPMethod = (url, data = {}, headers = {}) => this.request(`${this.apiUrl}${url}`, METHODS.DELETE, data, headers)

  async request<TResponse>(url: string, method: string, data?: Object, headers?: Object): Promise<TResponse> {
    if (!method) { method = METHODS.GET; }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value as string);
        }
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';
      xhr.onload = function () {
        if (xhr.status === 200) {
          const resultData = xhr?.response ? xhr.response : null;
          resolve(resultData);
        } else reject(xhr);
      };

      xhr.onabort = function () {
        reject(xhr);
      };
      xhr.onerror = function () {
        reject(xhr);
      };
      xhr.ontimeout = reject;

      if (!data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(data));
      }
    });
  }
}
