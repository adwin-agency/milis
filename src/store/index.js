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
    initialReview: null
  },

  getters: {
    reviewsPictures(state) {
      return state.reviews && state.reviews.reduce((allPictures, item) => allPictures.concat(item.pictures), [])
    },
    initialReviewIndex(state, getters) {
      return getters.reviewsPictures && getters.reviewsPictures.findIndex(item => item.id === state.initialReview)
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
    },
    setActiveKitchenStyle(state, style) {
      state.activeKitchenStyle = style
    },

    setMainKitchens(state, kitchens) {
      state.mainKitchens = kitchens
    },
    setCatalogKitchens(state, response) {
      state.catalogKitchens = response.goods
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
    }
  },

  actions: {
    loadBase({ commit }) {
      api.getBase()
        .then(response => commit('setBase', response))
    },
    
    loadMainKitchens({ commit }) {
      api.getMainKitchens()
        .then(response => commit('setMainKitchens', response))
    },

    loadCatalogKitchens({ commit }, params) {
      api.getCatalogKitchens(params)
        .then(response => commit('setCatalogKitchens', response))
    },

    loadKitchenDetails({ commit }, url) {
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
