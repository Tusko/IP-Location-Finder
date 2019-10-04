<template>
  <div class="loader">
    <div class="loader__bar"></div>
    <div class="loader__bar loader__bar--delay-1"></div>
    <div class="loader__bar loader__bar--delay-2"></div>
    <div class="loader__bar loader__bar--delay-3"></div>
    <div class="loader__bar loader__bar--delay-4"></div>
    <div class="loader__bar loader__bar--delay-5"></div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style lang="scss" scoped>
$color-light: #444;
$color-medium: #333;
$color-dark: #222;
$color-darkest: #111;
$animation-speed: 4s;
$animation-loop: infinite;

@keyframes loader {
  0% {
    background: $color-dark;
    width: 0%;
  }
  20% {
    width: 100%;
  }
  39% {
    background: $color-dark;
  }
  40% {
    background: $color-light;
    width: 0%;
  }
  60% {
    width: 100%;
  }
  80% {
    width: 0%;
  }
  100% {
    background: $color-light;
    width: 0%;
  }
}

@keyframes loaderAlt {
  0% {
    background: $color-darkest;
    width: 100%;
  }
  19% {
    background: $color-darkest;
  }
  20% {
    background: $color-medium;
    width: 0%;
  }
  40% {
    width: 100%;
  }
  59% {
    background: $color-medium;
  }
  60% {
    background: $color-darkest;
    width: 0;
  }
  80% {
    width: 100%;
  }
  100% {
    background: $color-darkest;
    width: 100%;
  }
}

.loader {
  flex-direction: column;
  position: relative;
  position: fixed;
  display: flex;
  height: 100vh;
  width: 100vw;
  z-index: 99;
  left: 0;
  top: 0;
  &__bar {
    position: relative;
    display: flex;
    width: 100%;
    flex: 1;
    &:before {
      animation: loader ease $animation-speed $animation-loop;
      background: $color-darkest;
      background-size: 200% 200%;
      animation-delay: 100ms;
      content: "";
      height: 100%;
      width: 0%;
    }
  }
  .loader__bar .loader__bar:after {
    animation: loaderAlt ease $animation-speed $animation-loop;
    animation-delay: 100ms;
    background: $color-darkest;
    background-size: 200% 200%;
    content: "";
    height: 100%;
    width: 100%;
  }
}

.loader__bar--delay-1:before,
.loader__bar--delay-1:after {
  animation-delay: 200ms;
}

.loader__bar--delay-2:before,
.loader__bar--delay-2:after {
  animation-delay: 300ms;
}

.loader__bar--delay-3:before,
.loader__bar--delay-3:after {
  animation-delay: 400ms;
}

.loader__bar--delay-4:before,
.loader__bar--delay-4:after {
  animation-delay: 500ms;
}

.loader__bar--delay-5:before,
.loader__bar--delay-5:after {
  animation-delay: 600ms;
}
</style>
