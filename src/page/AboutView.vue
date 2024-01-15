<script setup lang="ts">
import Logo from '../assets/images/img_logo_dtt@3x.png'
</script>

<template>
  <section class="container-about-view">
    <div class="title-about">
      <h1 class="title-about-header mobile-version">About</h1>
    </div>
    <h1 class="about-header">About DTT Real Estate</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu scelerisque lectus. Ut
      elementum pulvinar velit, et efficitur arcu finibus maximus. Nullam vitae tempor leo. Praesent
      lobortis vitae ante vitae consequat. Integer lobortis, magna sit amet mattis malesuada, ante
      libero luctus leo, eu fringilla libero metus sed orci. Vivamus eget molestie felis. Sed eu est
      quis metus sodales tempus. In auctor imperdiet odio, in tempus leo. Donec et ligula ornare,
      viverra dolor non, posuere nulla.
    </p>
    <p>
      Integer non nisi tristique, pharetra augue eget, iaculis leo. Donec sit amet dictum ligula. Ut
      tortor risus, molestie a eros ac, lobortis aliquam urna. Vivamus libero tortor, dignissim a
      sagittis ut, sagittis sed nunc. Donec at porta mi. Donec pulvinar magna in fringilla maximus.
      Sed tempus lorem non gravida fermentum.
    </p>
    <h1 class="design-development-about">Design and Development</h1>
    <div class="container-development-info-view">
      <div class="container-logo"><img :src="Logo" alt="DTT Logo" /></div>
      <div class="link-container">
        <div>By DTT</div>
        <div><a href="https://www.d-tt.nl/" target="_blank">www.d-tt.nl</a></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container-about-view {
  width: 1320px;
  margin: 70px auto 0;
}
.container-about-view p {
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  margin-top: 30px;
  line-height: 1.7;
  color: var(--text-secondary);
}
.about-header {
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 700;
}
.design-development-about {
  margin-top: 60px;
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 700;
}
.container-development-info-view {
  display: flex;
  align-items: start;
  margin-top: 30px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: var(--text-secondary);
}
.container-development-info-view a {
  color: var(--text-hyperlink);
  text-decoration: none;
}
.container-logo {
  margin-right: 30px;
}

.container-logo img {
  width: 250px;
}

.link-container div {
  margin: 5px 0;
}

.mobile-version {
  display: none;
}
@media (max-width: 1321px) {
  .container-about-view {
    width: 100%;
    padding: 0 20px;
  }
}

@media screen and (max-width: 992px) {
  .title-about-header {
    font-size: 32px;
    display: flex;
    margin-bottom: 30px;
    justify-content: center;
  }
  .about-header {
    display: flex;
    font-size: 18px;
  }
  .design-development-about {
    font-size: 18px;
  }
  .container-logo img {
    width: 176px;
  }
  .mobile-version {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    display: flex;
    margin-bottom: 50px;
  }
  .container-about-view {
    margin-bottom: 120px;
  }
}
</style>
