import constants from './constain';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

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

  get<TResponse>(url: string, data?: Object, headers?: Object) : Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, METHODS.GET, data, headers);
  }

  post<TResponse>(url: string, data?: Object, headers?: Object): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, METHODS.POST, data, headers);
  }

  put<TResponse>(url: string, data?: Object, headers?: Object): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, METHODS.PUT, data, headers);
  }

  async request<TResponse>(url: string, method:string, data?: Object, headers?: Object): Promise<TResponse> {
    if (!method) { method = METHODS.GET; }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // xhr.timeout = timeout;

      xhr.open(method, method === METHODS.GET && !!data
        ? `${url}${this.queryStringify(data)}`
        : url);

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

      if (method === METHODS.GET || !data) {
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
