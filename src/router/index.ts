import { createRouter, createWebHistory } from 'vue-router'
import DeleteListing from '../components/Delete-pop-up.vue'
import About from '../page/AboutView.vue'
import Home from '../page/HomeView.vue'
import HouseDetails from '../page/HouseDetailsView.vue'
import CreateNewListing from '../page/ListingView.vue'

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
      path: '/house/:id',
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
      path: '/delete_house',
      name: 'deleteListing',
      component: DeleteListing,
      meta: {
        title: 'Delete House'
      }
    }
  ]
})

export default router
