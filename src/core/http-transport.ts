import { queryStringify } from '../utils'

const Methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

type Options = {
  headers?: Record<string, string>
  method?: string
  timeout?: number
  data?: Record<string, unknown>
}

export default class HTTPTransport {
  baseURL?: string

  constructor(baseURL?: string) {
    this.baseURL = process.env.API_URL || baseURL
  }

  get = (url: string, options: Options = {}) => {
    return this.request(url, { ...options, method: Methods.GET })
  }

  post = (url: string, options: Options = {}) => {
    return this.request(url, { ...options, method: Methods.POST })
  }

  put = (url: string, options: Options = {}) => {
    return this.request(url, { ...options, method: Methods.PUT })
  }

  delete = (url: string, options: Options = {}) => {
    return this.request(url, { ...options, method: Methods.DELETE })
  }

  request = (path: string, options: Options = {}): Promise<XMLHttpRequest> => {
    const DEFAULT_TIMEOUT = 5000
    const { headers = {}, method, data } = options
    const url = this.baseURL + path

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject(new Error('no method'))
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === Methods.GET

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url)

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject

      xhr.timeout = options.timeout || DEFAULT_TIMEOUT
      xhr.ontimeout = reject

      xhr.withCredentials = true
      xhr.responseType = 'json'

      if (isGet || !data) {
        xhr.send()
      } else {
        if (data instanceof FormData) {
          xhr.send(data)
          return
        }
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        xhr.send(blob)
      }
    })
  }
}
