const dataUrl = process.env.NODE_ENV === 'production' ? '/local/templates/milis/data' : 'https://milismebel.ru/local/templates/milis/data'

const api = {
  fetchData(url, options) {
    return fetch(url, options).then(response => response.json())
  },

  getBase() {
    return this.fetchData(`${dataUrl}/other.php`)
  },

  getMainKitchens() {
    return this.fetchData(`${dataUrl}/main.php`)
  },

  getCatalogKitchens(params) {
    let searchParams = []

    for (const key in params) {
      if (params[key]) {
        searchParams.push(`${key}=${params[key]}`)
      }
    }

    searchParams = searchParams.join('&')

    return this.fetchData(`${dataUrl}/kitchens.php?${searchParams}`)
  },

  getKitchenDetails(id) {
    return this.fetchData(`${dataUrl}/kitchens.php?url=${id}`)
  },

  getTechnics(params) {
    let searchParams = []

    for (const key in params) {
      if (params[key]) {
        searchParams.push(`${key}=${params[key]}`)
      }
    }

    searchParams = searchParams.join('&')

    return this.fetchData(`${dataUrl}/technics.php?${searchParams}`)
  },

  getReviews(page) {
    let searchParam = page ? `page=${page}` : ``
    return this.fetchData(`${dataUrl}/reviews.php?${searchParam}`)
  },

  sendLike(data) {
    return this.fetchData(`${dataUrl}/likes.php`, {method: 'POST', headers: {'content-type': 'application/json'}, body: data})
  },

  sendForm(data) {
    return this.fetchData(`/send.php`, {method: 'POST', body: data})
  }
}

export default api
