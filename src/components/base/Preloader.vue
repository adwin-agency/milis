<template>
  <div class="preloader"></div>
</template>

<script>
export default {
  name: 'Preloader'
}
</script>

<style lang="scss">
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  @keyframes preloader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  &::after {
    content: "";
    width: 50px;
    height: 50px;
    border: 5px solid;
    border-color: $color-green $color-green $color-green transparent;
    border-radius: 50%;
    animation: preloader 1s linear infinite;
  }
}
</style>
