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
import BlogView from '../views/BlogView'
import ArticleView from '../views/ArticleView'
import ContactsView from '../views/ContactsView'
import NotFoundView from '../views/NotFoundView'
// import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainView,
    name: 'main',
    meta: { title: 'Главная' }
  },
  {
    path: '/kitchens',
    component: CatalogView,
    name: 'catalog',
    meta: { title: 'Каталог' }
  },
  {
    path: '/kitchens/:category',
    component: CatalogView,
    name: 'category',
    meta: { title: 'Каталог' }
  },
  {
    path: '/kitchens/:category/:kitchen',
    component: ProductView,
    name: 'product',
    meta: { title: 'Кухня' }
  },
  {
    path: '/technics',
    component: TechnicsView,
    name: 'technics',
    meta: { title: 'Техника' }
  },
  {
    path: '/technics/:category',
    component: TechnicsView,
    name: 'techcategory',
    meta: { title: 'Техника' }
  },
  {
    path: '/about',
    component: AboutView,
    name: 'about',
    meta: { title: 'Материалы' }
  },
  {
    path: '/delivery',
    component: DeliveryView,
    name: 'delivery',
    meta: { title: 'Доставка и монтаж' }
  },
  {
    path: '/payment',
    component: PaymentView,
    name: 'payment',
    meta: { title: 'Оплата' }
  },
  {
    path: '/reviews',
    component: ReviewsView,
    name: 'reviews',
    meta: { title: 'Отзывы' }
  },
  {
    path: '/blog',
    component: BlogView,
    name: 'blog',
    meta: { title: 'Блог' }
  },
  {
    path: '/article',
    component: ArticleView,
    name: 'article',
    meta: { title: 'Статья' }
  },
  {
    path: '/contacts',
    component: ContactsView,
    name: 'contacts',
    meta: { title: 'Контакты' }
  },
  {
    path: '*',
    component: NotFoundView,
    name: 'notfound',
    meta: { title: 'Страница не найдена' }
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

// router.afterEach((to) => {
//   const exceptions = ['catalog', 'category', 'product', 'technics', 'techcategory']

//   if (!exceptions.find(item => item === to.name)) {
//     document.title = to.meta.title
//   }  
// })

export default router
