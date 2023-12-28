<script setup lang="ts"></script>

<template>
  <div class="container-sort">
    <ul class="sort-list">
      <li class="price-list active-list">Price</li>
      <li class="size-list">Size</li>
    </ul>
  </div>
</template>

<style scoped>
.container-sort {
  width: 100%;
}
.sort-list {
  display: flex;
}
.sort-list li {
  list-style: none;
  color: var(--element-background-2);
  background-color: var(--element-tertiary-2);
  width: 150px;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.price-list {
  border-radius: 5px 0 0 5px;
}

.size-list {
  border-radius: 0 5px 5px 0;
}

li.active-list {
  background-color: var(--element-primary);
}

@media (max-width: 768px) {
  .sort-list li {
    width: 100%;
  }
}
</style>
