<script setup lang="ts">
import bathIcon from '../assets/icons/ic_bath@3x.png'
import bedIcon from '../assets/icons/ic_bed@3x.png'
import sizeIcon from '../assets/icons/ic_size@3x.png'
import imageIcon from '../assets/images/img_placeholder_house@3x.png'
</script>

<template>
  <!-- SHOW RECOMMENDED HOUSE LIKE FOR EXAMPLE -->
  <div class="container-card-item">
    <div class="card-item">
      <div class="info-block">
        <img class="card-item-img" :src="imageIcon" alt="imageIcon" />
        <div class="container-card-info">
          <div class="house-location">joan Melchior St. 46H</div>
          <div class="price-info">$500</div>
          <div class="zip-code-info">1051TS</div>
          <div class="room-info">
            <span class="icons"
              ><img :src="bedIcon" alt="Bed Icon" />
              <p>1</p></span
            >
            <span class="icons"
              ><img :src="bathIcon" alt="Bath Icon" />
              <p>1</p></span
            >
            <span class="icons"
              ><img :src="sizeIcon" alt="Size Icon" />
              <p>120 m2</p></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-card-item {
  position: relative;
}

.container-card-item a {
  text-decoration: none;
}

.info-block {
  display: flex;
  align-items: center;
  font-size: 80%;
}

.card-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 auto 15px;
  padding: 10px;
  background-color: var(--element-background-2);
  border-radius: 7px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);
  & .card-item-img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    object-fit: cover;
  }
}
.container-card-info {
  margin-left: 15px;
  color: var(--text-secondary);
  font-family: 'Open Sans', sans-serif;

  & div {
    margin-bottom: 3px;
  }
}

.icons img {
  width: 16px;
  height: 16px;
}

.house-location {
  color: var(--text-primary);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.house-location::first-letter {
  text-transform: uppercase;
}

.price-info {
  font-weight: 600;
}

.zip-code-info {
  color: var(--element-tertiary-2);
}

.icons {
  margin-right: 10px;
  display: flex;
  & p {
    margin-left: 10px;
    margin-right: 10px;
  }
}
.room-info {
  display: flex;
  align-items: center;
}

@media (min-width: 992px) and (max-width: 1319px) {
  .icons {
    margin-right: 0;
  }
}
</style>
