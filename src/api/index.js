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

  getMainPage() {
    return this.fetchData(`${dataUrl}/test.php`)
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
    return this.fetchData(`${dataUrl}/likes.php`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: data })
  },

  sendForm(data, type) {

    // Comagic
    try {
      const comagicData = window.Comagic.getCredentials()

      for (let item in comagicData) {
        data.append(item, comagicData[item])
      }
    } catch(e) {
      console.error(e)
    }
    //

    // Метрика ClientID
    const clientID = window.yaCounter73257226?.getClientID()

    if (clientID) {
      data.append('clientID', clientID)
    }
    //

    const url = type === 'payment' ? '/include/youkassa/payment.php' : '/send.php'

    return fetch(url, { method: 'POST', body: data })
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

        if (response.confirmation_url) {
          window.VK && window.VK.Retargeting.Event('lead')
          window.ym && window.ym(73257226, 'reachGoal', 'payment')
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({ 'event': 'payment' })
          window.location.href = response.confirmation_url
          return
        }

        window.fbq && window.fbq('track', 'Lead')
        window.VK && window.VK.Retargeting.Event('lead')
        window.gtag && window.gtag('event', type, { event_category: 'Forms' })
        window.ym && window.ym(73257226, 'reachGoal', type)
        window.ym && window.ym(73257226, 'reachGoal', 'lead')
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ 'event': 'formSubmit' })
        window.dataLayer.push({ 'event': type })

        if (type === 'size' && data.get('item_id') !== '') {
          const _tmr = window._tmr || (window._tmr = [])

          _tmr.push({
            type: 'itemView',
            productid: data.get('item_id'),
            pagetype: 'cart',
            list: '2',
            totalvalue: data.get('price')
          })
        }
      })
  },

  ecommerce(actionType, id, name, category) {
    window.dataLayer = window.dataLayer || []

    const entry = {
      ecommerce: {
        currencyCode: 'RUB',
        [actionType]: {
          products: [
            {
              id: id,
              name: name,
              category: category,
              quantity: 1
            }
          ]
        }
      }
    }

    if (actionType === 'purchase') {
      entry.ecommerce[actionType].actionField = {
        id: id
      }
    }

    window.dataLayer.push(entry)
  },

  checkDuplicateTel(value) {
    const numStr = value.replace(/\D/g, '').slice(1)
    const numSet = new Set(numStr)
    return numSet.size <= 1
  }
}

export default api
