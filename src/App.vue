<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

// 浮动返回按钮相关代码已移除
</script>

<template>
  <div class="love-container">
    <main class="love-main">
      <RouterView />
    </main>
    
    <div class="floating-hearts">
      <div class="floating-heart" v-for="n in 6" :key="n">💕</div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --love-primary: #ff6b8b;
  --love-secondary: #ffb6c1;
  --love-accent: #ff4081;
  --love-text: #333;
  --love-background: #fff5f8;
}

.love-container {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: var(--love-background);
  background-image: linear-gradient(45deg, #fff5f8 0%, #ffe8f0 100%);
  font-family: 'Arial', sans-serif;
  color: var(--love-text);
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* 浮动返回按钮样式已移除 */

.love-main {
  padding: 0;
  width: 100%;
  margin: 0;
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 200px);
}

.floating-hearts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.floating-heart {
  position: absolute;
  font-size: 2rem;
  opacity: 0.6;
  animation: float 15s infinite linear;
}

.floating-heart:nth-child(1) {
  top: 10%;
  left: 10%;
  animation-duration: 20s;
  animation-delay: 0s;
}

.floating-heart:nth-child(2) {
  top: 20%;
  right: 15%;
  animation-duration: 25s;
  animation-delay: 2s;
}

.floating-heart:nth-child(3) {
  bottom: 30%;
  left: 20%;
  animation-duration: 18s;
  animation-delay: 5s;
}

.floating-heart:nth-child(4) {
  bottom: 10%;
  right: 10%;
  animation-duration: 22s;
  animation-delay: 7s;
}

.floating-heart:nth-child(5) {
  top: 40%;
  left: 5%;
  animation-duration: 24s;
  animation-delay: 9s;
}

.floating-heart:nth-child(6) {
  top: 60%;
  right: 5%;
  animation-duration: 21s;
  animation-delay: 11s;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(50px, 50px) rotate(90deg);
  }
  50% {
    transform: translate(100px, 0) rotate(180deg);
  }
  75% {
    transform: translate(50px, -50px) rotate(270deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

@media (max-width: 768px) {
  .love-nav {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-link {
    margin-bottom: 0.5rem;
  }
  
  .heart {
    font-size: 3rem;
  }
}
</style>
