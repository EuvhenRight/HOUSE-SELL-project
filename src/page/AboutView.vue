<script setup lang="ts">
import Logo from '../assets/images/img_logo_dtt@3x.png'
</script>

<template>
  <section class="container-about-section">
    <h1 class="mobile-content about-header-1">About</h1>
    <h1 class="not-mobile-content about-header-1">About DTT Real Estate</h1>
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
    <h1 class="design-development-header not-mobile-content about-header-1">
      Design and Development
    </h1>
    <div class="container-development-info">
      <div class="container-logo"><img :src="Logo" alt="DTT Logo" /></div>
      <div class="link-container">
        <div>By DTT</div>
        <div><a href="https://www.d-tt.nl/" target="_blank">www.d-tt.nl</a></div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped></style>
