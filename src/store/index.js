import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    windowWidth: null,
    mobile: null,
    modal: null,
    modalData: null,
    appLoading: false,

    kitchenCategories: null,
    kitchenStyles: null,
    activeKitchenStyle: null,
    technicsCategories: null,
    cities: null,
    cityDetection: false,
    activeCityCode: null,
    promoDate: null,
    
    mainKitchens: null,
    catalogKitchens: null,
    catalogPages: null,
    kitchenDetails: null,
    similarKitchens: null,
    technics: null,
    technicsInfo: null,
    technicsPages: null,
    reviews: null,
    reviewsPages: null,
    initialReview: null,
    initialDetailSlide: null
  },

  getters: {
    activeCity(state) {
      return state.cities && state.cities.find(item => item.code === state.activeCityCode)
    },
    reviewsPictures(state) {
      return state.reviews && state.reviews.reduce((allPictures, item) => allPictures.concat(item.pictures), [])
    },
    initialReviewIndex(state, getters) {
      return getters.reviewsPictures && getters.reviewsPictures.findIndex(item => item.id === state.initialReview)
    },
    promoText(state) {
      if (!state.promoDate) {
        return
      }

      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
      const startSplit = state.promoDate[0].split('.')
      const endSplit = state.promoDate[1].split('.')
      const sameMonth = startSplit[1] === endSplit[1]
      const start = startSplit[0] + (sameMonth ? '' : '\xa0' + months[+startSplit[1] - 1])
      const end = endSplit[0] + '\xa0' + months[+endSplit[1] - 1]

      return [start, end]
    }
  },

  mutations: {
    storeScreen(state, {width, mobile}) {
      state.windowWidth = width
      state.mobile = mobile
    },
    setModal(state, modal) {
      state.modal = modal
    },
    setModalData(state, data) {
      state.modalData = data
    },
    setAppLoading(state, isLoading) {
      state.appLoading = isLoading
    },

    setBase(state, base) {
      state.kitchenCategories = base.categories
      state.kitchenStyles = base.styles
      state.technicsCategories = base.categories_tehnics
      state.cities = base.cities
      state.activeCityCode = base.detected_city
      state.promoDate = base.stocks_test
    },
    setCityDetection(state, detection) {
      state.cityDetection = detection
    },
    setActiveCityCode(state, code) {
      state.activeCityCode = code
    },
    setActiveKitchenStyle(state, style) {
      state.activeKitchenStyle = style
    },

    setMainKitchens(state, kitchens) {
      state.mainKitchens = kitchens
    },
    setCatalogKitchens(state, response) {
      state.catalogKitchens = response.more ? [...state.catalogKitchens, ...response.goods] : response.goods
      state.catalogPages = response.pages
    },
    setKitchenDetails(state, details) {
      state.kitchenDetails = details
    },
    setTechnics(state, response) {
      state.technics = response.goods
      state.technicsInfo = response.category
      state.technicsPages = response.pages
    },
    setReviews(state, response) {
      state.reviews = response.reviews
      state.reviewsPages = response.pages
    },
    setInitialReview(state, id) {
      state.initialReview = id
    },
    setInitialDetailSlide(state, index) {
      state.initialDetailSlide = index
    }
  },

  actions: {
    loadBase({ commit }) {
      api.getBase()
        .then(response => {
          commit('setBase', response)
          
          function getCookie(name) {
            let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"))
            return matches ? decodeURIComponent(matches[1]) : undefined
          }

          const city = getCookie('city')

          if (city && response.cities.find(i => i.code === city)) {
            commit('setActiveCityCode', city)
          } else {
            commit('setCityDetection', true)
          }
        })
    },
    
    loadMainKitchens({ commit }) {
      api.getMainKitchens()
        .then(response => commit('setMainKitchens', response))
    },

    loadCatalogKitchens({ commit }, params) {
      api.getCatalogKitchens(params)
        .then(response => commit('setCatalogKitchens', response))
    },

    loadMoreKitchens({ commit }, params) {
      return new Promise(resolve => {
        api.getCatalogKitchens(params)
          .then(response => {
            commit('setCatalogKitchens', {...response, more: true})
            resolve()
          })
      })
    },

    loadKitchenDetails({ state, commit }, url) {
      if (state.kitchenDetails !== null) {
        commit('setKitchenDetails', null)
      }
      api.getKitchenDetails(url)
        .then(response => {
          commit('setKitchenDetails', response)

          const _tmr = window._tmr || (window._tmr = [])

          _tmr.push({
            type: 'itemView',
            productid: response.info.id.toString(),
            pagetype: 'product',
            list: '2',
            totalvalue: response.info.price
          })

          api.ecommerce('detail', response.info.id, response.info.name)
        })
    },

    loadTechnics({ commit }, params) {
      api.getTechnics(params)
        .then(response => commit('setTechnics', response))
    },

    loadReviews({ commit }, page) {
      api.getReviews(page)
        .then(response => commit('setReviews', response))
    }
  }
})

export default store
