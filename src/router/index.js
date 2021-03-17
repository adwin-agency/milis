import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/MainView'
import CatalogView from '../views/CatalogView'
import ProductView from '../views/ProductView'
import TechnicsView from '../views/TechnicsView'
import AboutView from '../views/AboutView'
import DeliveryView from '../views/DeliveryView'
import PaymentView from '../views/PaymentView'
import ReviewsView from '../views/ReviewsView'
// import BlogView from '../views/BlogView'
// import ArticleView from '../views/ArticleView'
import ContactsView from '../views/ContactsView'
import NotFoundView from '../views/NotFoundView'
// import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainView,
    name: 'main'
  },
  {
    path: '/kitchens',
    component: CatalogView,
    name: 'catalog'
  },
  {
    path: '/kitchens/:category',
    component: CatalogView,
    name: 'category'
  },
  {
    path: '/kitchens/:category/:kitchen',
    component: ProductView,
    name: 'product'
  },
  {
    path: '/technics',
    component: TechnicsView,
    name: 'technics'
  },
  {
    path: '/technics/:category',
    component: TechnicsView,
    name: 'techcategory'
  },
  {
    path: '/about',
    component: AboutView,
    name: 'about'
  },
  {
    path: '/delivery',
    component: DeliveryView,
    name: 'delivery'
  },
  {
    path: '/payment',
    component: PaymentView,
    name: 'payment'
  },
  {
    path: '/reviews',
    component: ReviewsView,
    name: 'reviews'
  },
  // {
  //   path: '/blog',
  //   component: BlogView,
  //   name: 'blog'
  // },
  // {
  //   path: '/article',
  //   component: ArticleView,
  //   name: 'article'
  // },
  {
    path: '/contacts',
    component: ContactsView,
    name: 'contacts'
  },
  {
    path: '*',
    component: NotFoundView,
    name: 'notfound'
  }
]

const router = new VueRouter({
  routes,
  // base: '/milis/',
  mode: 'history',
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
