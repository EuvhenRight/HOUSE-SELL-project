<script lang="ts">
import CartItem from '../components/Cart-item.vue'
import SearchBar from '../components/Search-bar.vue'
import SortHouses from '../components/Sort-houses.vue'

export default {
  components: {
    SortHouses,
    SearchBar,
    CartItem
  }
}
</script>

<template>
  <div>
    <Sort-houses />
    <SearchBar />
    <CartItem />
    <h1>Home</h1>
  </div>
</template>

<style lang="sass"></style>
