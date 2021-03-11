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

  sendForm(data, type) {

    try {
      const comagicData = window.Comagic.getCredentials()

      for (let item in comagicData) {
        data.append(item, comagicData[item])
      }
    } catch {
      //
    }

    return fetch('/send.php', {method: 'POST', body: data})
      .then(response => {

        if (!response.ok) {
          throw new Error()
        }

        return response.json()
      })
      .then(response => {

        if (response.status !== 'ok') {
          throw new Error()
        }        
        
        window.fbq && window.fbq('track', 'Lead')
        window.VK && window.VK.Retargeting.Event('lead')
        window.gtag && window.gtag('event', type, {event_category: 'Forms'})
        window.ym && window.ym(73257226, 'reachGoal', type)
        window.ym && window.ym(73257226, 'reachGoal', 'lead')
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({'event': 'formSubmit'})
        window.dataLayer.push({'event': type})
      })
  }
}

export default api
