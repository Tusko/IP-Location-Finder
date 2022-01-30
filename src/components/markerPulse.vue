<template>
  <div class="marker-wrapper" :class="{ 'is-loading': loading }">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="100%"
      y="100%"
      viewBox="0 0 23 21"
    >
      <g id="marker">
        <circle class="core" cx="11.3" cy="10.5" r="1.5" />
        <circle
          class="ring"
          fill="none"
          stroke="#000000"
          stroke-miterlimit="10"
          cx="11.3"
          cy="10.5"
          r="6"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "MarkerPulse",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@keyframes anim-pulse {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }

  90% {
    opacity: 0;
  }

  100% {
    transform: scale(1.25);
  }
}

.marker-wrapper {
  transform: translate(-50%, -50%);
  transition: transform 2s ease;
  transform-origin: center;
  position: absolute;
  width: 120px;
  z-index: 1;
  left: 50%;
  top: 50%;
  &.is-loading {
    transform: translate(-50%, -50%) scale(100);
    * {
      opacity: 0.5;
    }
  }
  .core {
    fill: rgba(255, 255, 255, 0.65);
  }
  .ring {
    animation: anim-pulse 2s 1s infinite;
    stroke: rgba(255, 255, 255, 0.5);
    transform-origin: center;
    opacity: 0;
  }
}
</style>
