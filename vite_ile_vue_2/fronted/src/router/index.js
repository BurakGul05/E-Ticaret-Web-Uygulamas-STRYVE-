import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FAQ from '../views/SSS.vue'
import Contact from '../views/Contact.vue'
import Product from '../views/Product.vue'
import About from '../views/About.vue'
import Test from '../views/test.vue'
import Admin from '@/views/Admin.vue'
import User from '@/views/User.vue'
import Checkout from '@/views/Checkout.vue'
import Test2 from '@/views/test2.vue'
import Forbidden from '@/views/403.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },

    {
      path: '/about',
      name: 'about',
      component: About,
    },

    {
      path: '/faq',
      name: 'faq',
      component: FAQ,
    },

    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },

    {
      path: '/product',
      name: 'product',
      component: Product,
    },

    {
      path: '/test',
      name: 'test',
      component: Test,
    },

    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true, roles: ["1"] } //sayafaya giderken meta verisi ekledik
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { requiresAuth: true, roles: ["0"] } //sayfaya giderken meta verisi ekledik
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/test2',
      name: 'test2',
      component: Test2
    },
    {
      path: '/403',
      name: '403',
      component: Forbidden,
    }
  ],
})



router.beforeEach((to, from, next) => { //kullanıcı hangi sayfaya gitmek isterse istesin önce burası çalışır.
  console.log("Gitmek istenen:", to.path);
  console.log("Gelinen:", from.path);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") == "true"; //true veya false donuyor
  const role = sessionStorage.getItem("role"); // "admin" | "user"
  if (to.meta.requiresAuth && !isLoggedIn) { //Gidilen sayfa korumalı mı? ve Kullanıcı giriş yapmamış mı?
     return next("/"); // login sayfasına at. izin yok.
  }
  if (to.meta.roles && !to.meta.roles.includes(role)) {
    return next("/403"); // yetkisiz sayfa (yoksa)
  }
  next();
});


export default router
