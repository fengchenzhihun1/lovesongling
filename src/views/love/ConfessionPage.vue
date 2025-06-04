<template>
  <div class="confession-page">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="floating-heart" v-for="n in 12" :key="n"></div>
    </div>

    <!-- 主要内容 -->
    <div class="main-content">
      <!-- 标题区域 -->
      <div class="header-section">
        <h1 class="confession-title">💌 爱的告白 💌</h1>
        <p class="confession-subtitle">说出心中最真挚的话语</p>
      </div>

      <!-- 告白文字区域 -->
      <div class="confession-text">
        <div class="text-line" v-for="(line, index) in confessionLines" :key="index" :style="{ animationDelay: index * 0.5 + 's' }">
          {{ line }}
        </div>
      </div>

      <!-- 时间显示 -->
      <div class="time-display">
        <div class="time-label">此刻时间</div>
        <div class="time-value">{{ currentTime }}</div>
      </div>

      <!-- 烟花效果容器 -->
      <div class="fireworks-container" v-if="showFireworks">
        <div class="firework" v-for="n in 5" :key="n" :style="{ animationDelay: (n-1) * 0.2 + 's' }"></div>
      </div>

      <!-- 无穷符号显示 -->
      <div class="infinity-display">
        <div class="infinity-symbol">∞</div>
        <div class="infinity-label">我对你的爱无穷无尽</div>
      </div>

      <!-- 回应区域 -->
      <div class="response-section">
        <h3>你愿意接受我的爱吗？</h3>
        <div class="response-buttons">
          <button class="response-btn yes-btn" @click="handleResponse(true)">
            <span class="btn-text">我愿意 💕</span>
          </button>
          <button class="response-btn no-btn" @click="handleResponse(false)">
            <span class="btn-text">让我想想 💭</span>
          </button>
        </div>
        
        <div class="response-message" v-if="responseMessage">
          {{ responseMessage }}
        </div>
      </div>

      <!-- 返回按钮 -->
      <div class="navigation">
        <router-link to="/love" class="home-btn">
          <span class="btn-icon">🏠</span>
          <span class="btn-text">返回首页</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式数据
const currentTime = ref('')
const showFireworks = ref(false)
const responseMessage = ref('')

// 告白文字
const confessionLines = [
  '亲爱的，',
  '从第一次见到你的那一刻起，',
  '我就知道你是我生命中最重要的人。',
  '你的笑容如阳光般温暖，',
  '照亮了我心中的每一个角落。',
  '我想和你一起走过春夏秋冬，',
  '分享生活中的每一个美好瞬间。',
  '我爱你，不仅仅是现在，',
  '更是直到永远。',
  '愿你能接受我这份真挚的爱意。'
]

let timeInterval: number | null = null

// 更新时间
const updateTime = () => {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  currentTime.value = now.toLocaleString('zh-CN', options)
}

// 处理回应
const handleResponse = (accepted: boolean) => {
  if (accepted) {
    responseMessage.value = '太好了！我们会永远幸福的！💖✨'
    showFireworks.value = true
    
    // 3秒后隐藏烟花
    setTimeout(() => {
      showFireworks.value = false
    }, 3000)
  } else {
    responseMessage.value = '没关系，我会一直等你的答案 💕'
  }
}

// 组件挂载
onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

// 组件卸载
onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
})
</script>

<style scoped>
.confession-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  padding: 20px 0;
}

.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-heart {
  position: absolute;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.4);
  animation: floatHeart 8s infinite linear;
}

.floating-heart:nth-child(1) { left: 5%; animation-delay: 0s; }
.floating-heart:nth-child(2) { left: 15%; animation-delay: 1s; }
.floating-heart:nth-child(3) { left: 25%; animation-delay: 2s; }
.floating-heart:nth-child(4) { left: 35%; animation-delay: 3s; }
.floating-heart:nth-child(5) { left: 45%; animation-delay: 4s; }
.floating-heart:nth-child(6) { left: 55%; animation-delay: 5s; }
.floating-heart:nth-child(7) { left: 65%; animation-delay: 6s; }
.floating-heart:nth-child(8) { left: 75%; animation-delay: 7s; }
.floating-heart:nth-child(9) { left: 85%; animation-delay: 0.5s; }
.floating-heart:nth-child(10) { left: 95%; animation-delay: 1.5s; }
.floating-heart:nth-child(11) { left: 10%; animation-delay: 2.5s; }
.floating-heart:nth-child(12) { left: 90%; animation-delay: 3.5s; }

.floating-heart::before {
  content: '💖';
}

@keyframes floatHeart {
  0% {
    transform: translateY(100vh) rotate(0deg) scale(0.5);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg) scale(1);
    opacity: 0;
  }
}

.main-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.header-section {
  text-align: center;
  margin-bottom: 50px;
}

.confession-title {
  font-size: 48px;
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: titleGlow 3s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  from {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(255, 255, 255, 0.3);
  }
  to {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3), 0 0 30px rgba(255, 255, 255, 0.6);
  }
}

.confession-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  animation: fadeInUp 1s ease-out 0.5s both;
}

.confession-text {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 50px 40px;
  margin-bottom: 40px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
}

.text-line {
  font-size: 24px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
  opacity: 0;
  animation: textGlow 1s ease-out forwards, shimmer 2s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
}

.text-line:last-child {
  margin-bottom: 0;
  font-weight: bold;
  color: #e91e63;
}

.time-display {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  margin-bottom: 40px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.time-label {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.time-value {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  font-family: 'Courier New', monospace;
}

.fireworks-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.firework {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ff6b6b;
  border-radius: 50%;
  animation: explode 2s ease-out forwards;
}

.firework:nth-child(1) {
  top: 20%;
  left: 20%;
  background: #ff6b6b;
}

.firework:nth-child(2) {
  top: 30%;
  left: 80%;
  background: #4ecdc4;
}

.firework:nth-child(3) {
  top: 60%;
  left: 30%;
  background: #45b7d1;
}

.firework:nth-child(4) {
  top: 70%;
  left: 70%;
  background: #96ceb4;
}

.firework:nth-child(5) {
  top: 40%;
  left: 50%;
  background: #feca57;
}

@keyframes explode {
  0% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 0 0 0 0 currentColor;
  }
  100% {
    transform: scale(20);
    opacity: 0;
    box-shadow: 
      0 0 0 20px transparent,
      0 0 0 40px transparent,
      0 0 0 60px transparent;
  }
}

@keyframes textGlow {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0%, 100% {
    text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
  }
  50% {
    text-shadow: 0 0 20px rgba(102, 126, 234, 0.6), 0 0 30px rgba(233, 30, 99, 0.4);
  }
}

.infinity-display {
  text-align: center;
  margin: 50px 0;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

.infinity-symbol {
  font-size: 80px;
  color: #e91e63;
  margin-bottom: 20px;
  animation: pulse 2s ease-in-out infinite;
}

.infinity-label {
  font-size: 24px;
  color: #333;
  font-weight: 500;
}

.response-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  margin-bottom: 40px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

.response-section h3 {
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
}

.response-buttons {
  display: flex;
  gap: 30px;
  justify-content: center;
  margin-bottom: 30px;
}

.response-btn {
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.response-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}

.response-btn:hover::before {
  width: 300px;
  height: 300px;
}

.yes-btn {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
}

.yes-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(255, 107, 107, 0.4);
}

.no-btn {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
  box-shadow: 0 8px 25px rgba(116, 185, 255, 0.3);
}

.no-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(116, 185, 255, 0.4);
}

.btn-text {
  position: relative;
  z-index: 1;
}

.response-message {
  font-size: 20px;
  color: #e91e63;
  font-weight: bold;
  animation: fadeInUp 0.5s ease-out;
}

.navigation {
  text-align: center;
  margin-top: 40px;
}

.home-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  text-decoration: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.home-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  background: white;
}

.btn-icon {
  font-size: 20px;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .confession-title {
    font-size: 36px;
  }
  
  .text-line {
    font-size: 20px;
    line-height: 1.6;
  }
  
  .response-buttons {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  
  .response-btn {
    width: 200px;
  }
  
  .confession-text {
    padding: 30px 25px;
  }
  
  .main-content {
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .confession-title {
    font-size: 28px;
  }
  
  .text-line {
    font-size: 18px;
  }
  
  .infinity-symbol {
    font-size: 60px;
  }
  
  .response-section h3 {
    font-size: 24px;
  }
}
</style>