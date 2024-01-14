import { createRouter, createWebHistory } from 'vue-router'
import About from '../page/AboutView.vue'
import EditListing from '../page/EditListingView.vue'
import Home from '../page/HomeView.vue'
import HouseDetails from '../page/HouseDetailsView.vue'
import CreateNewListing from '../page/NewListingView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        title: 'About'
      }
    },
    {
      path: '/house-details/:id',
      name: 'HouseDetails',
      component: HouseDetails,
      meta: {
        title: 'House Details'
      }
    },
    {
      path: '/new_listing',
      name: 'createNewListing',
      component: CreateNewListing,
      meta: {
        title: 'Create House'
      }
    },
    {
      path: '/edit_listing/:id',
      name: 'editListing',
      component: EditListing,
      meta: {
        title: 'Create House'
      }
    }
  ]
})

export default router
