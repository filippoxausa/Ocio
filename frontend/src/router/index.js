import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ViewHome.vue'),
    },
    {
      path: '/storico',
      name: 'storico',
      component: () => import('../views/ViewStorico.vue'),
    },
    {
      path: '/dettagli',
      name: 'dettagli',
      component: () => import('../views/ViewDettagli.vue'),
    },
    {
      path: '/accedi',
      name: 'accedi',
      component: () => import('../views/ViewAccedi.vue'),
    },
    {
      path: '/registrati',
      name: 'registrati',
      component: () => import('../views/ViewRegistrati.vue'),
    },
    {
      path: '/invia_segnalazione',
      name: 'invia_segnalazione',
      component: () => import('../views/ViewSegnalazione.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error404',
      component: () => import('../views/ViewError404.vue'),
    }
  ],
})

export default router
