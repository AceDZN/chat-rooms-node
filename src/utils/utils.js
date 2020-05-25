import { ajax } from 'rxjs/ajax'

const defaultHeaders = {
  contentType: {
    applicationJson: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
}

export const getJSON = (url, headers = {}) => {
  return ajax.getJSON(url, {
    ...headers
  })
}

export const postJSON = (url, body, headers = {}) => {
  return ajax.post(url, JSON.stringify(body), {
    ...defaultHeaders.contentType.applicationJson,
    ...headers
  })
}

export const removeJSON = (url, headers = {}) => {
  return ajax.delete(url, {
    ...headers
  })
}
