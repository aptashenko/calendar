<template>
  <div class="global-loader">
    <div class="loader"/>
  </div>
</template>

<style scoped>
.global-loader {
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: grid;
  place-items: center;
}
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side,#ffa516 94%,#0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%,#ffa516);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px),#000 0);
  animation: l13 1s infinite linear;
}
@keyframes l13{
  100%{transform: rotate(1turn)}
}
</style>
