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
    promoDate: ['22 марта', '28 марта'],
    
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
    promoData(state) {
      const start = state.promoDate[0].split(' ')
      const end = state.promoDate[1].split(' ')
      const sameMonth = start[1] === end[1]

      return { sameMonth, lines: sameMonth ? [start[0] + ' - ' + end[0], end[1]] : ['c ' + start.join(' '), 'по ' + end.join(' ')] }
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
      // state.promoDate = base.main_info[0].stock
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

          if (city) {
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
        .then(response => commit('setKitchenDetails', response))
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
