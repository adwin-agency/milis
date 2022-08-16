import Vue from 'vue'
import VueRouter from 'vue-router'
const MainView = () => import('../views/MainView')
const CatalogView = () => import('../views/CatalogView')
const ProductView = () => import('../views/ProductView')
const TechnicsView = () => import('../views/TechnicsView')
const AboutView = () => import('../views/AboutView')
const DeliveryView = () => import('../views/DeliveryView')
const ReviewsView = () => import('../views/ReviewsView')
// const BlogView = () => import('../views/BlogView')
// const ArticleView = () => import('../views/ArticleView')
const ContactsView = () => import('../views/ContactsView')
const NotFoundView = () => import('../views/NotFoundView')
const CareView = () => import('../views/CareView')
const PaymentView = () => import(/* webpackChunkName: "pay" */'../views/PaymentView')
const PayView = () => import(/* webpackChunkName: "pay" */ '../views/PayView')
const PaySuccessView = () => import(/* webpackChunkName: "pay" */ '../views/PaySuccessView')
const PayFailView = () => import(/* webpackChunkName: "pay" */ '../views/PayFailView')
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
  {
    path: '/pay',
    component: PayView,
    name: 'pay'
  },
  {
    path: '/pay-success',
    component: PaySuccessView,
    name: 'paysuccess'
  },
  {
    path: '/pay-fail',
    component: PayFailView,
    name: 'payfail'
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
    path: '/care',
    component: CareView,
    name: 'care'
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
