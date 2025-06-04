<template>
  <div class="home-page">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="floating-heart" v-for="n in 6" :key="n"></div>
    </div>

    <!-- 主要内容 -->
    <div class="main-content">
      <!-- 时间显示区域 -->
      <div class="time-display">
        <div class="time-section">
          <div class="time-label">现在时间</div>
          <div class="time-value">{{ currentTime }}</div>
          <div class="time-clock">⏰</div>
        </div>
      </div>

      <!-- 打字机效果容器 -->
      <div class="typewriter-container">
        <div class="typewriter-text" ref="typewriterText">
          {{ displayText }}
          <span class="cursor" v-show="showCursor">|</span>
        </div>
      </div>

      <!-- 爱心容器 -->
      <div class="love-heart-container">
        <div class="love-message">
          <h2>💖 我们的爱情故事 💖</h2>
        </div>
      </div>

      <!-- 导航按钮 -->
      <div class="navigation-buttons">
        <router-link to="/love/memories" class="love-button memories-btn">
          <span class="button-icon">📸</span>
          <div class="button-content">
            <span class="button-text">美好回忆</span>
            <span class="button-desc">记录我们的点点滴滴</span>
          </div>
        </router-link>
        
        <router-link to="/love/confession" class="love-button confession-btn">
          <span class="button-icon">💌</span>
          <div class="button-content">
            <span class="button-text">爱的告白</span>
            <span class="button-desc">说出心中的话</span>
          </div>
        </router-link>
      </div>

      <!-- 签名 -->
      <div class="signature">
        <p>❤️ 愿我们的爱情如星辰般永恒 ❤️</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式数据
const currentTime = ref('')
const displayText = ref('')
const showCursor = ref(true)
const typewriterText = ref<HTMLElement | null>(null)

// 爱情消息数组
const loveMessages = [
  '每一天都想对你说：我爱你 💕',
  '你是我生命中最美的遇见 🌹',
  '愿与你共度每一个春夏秋冬 🍃',
  '你的笑容是我最大的幸福 😊',
  '在茫茫人海中，我只想牵你的手 👫',
  '爱你，是我做过最正确的决定 💖'
]

let currentMessageIndex = 0
let currentCharIndex = 0
let timeInterval: number | null = null
let typewriterInterval: number | null = null
let cursorInterval: number | null = null

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

// 打字机效果
const typeWriter = () => {
  const currentMessage = loveMessages[currentMessageIndex]
  
  if (currentCharIndex < currentMessage.length) {
    displayText.value += currentMessage.charAt(currentCharIndex)
    currentCharIndex++
    typewriterInterval = setTimeout(typeWriter, 100)
  } else {
    // 当前消息打完，等待一段时间后清除并开始下一条
    setTimeout(() => {
      displayText.value = ''
      currentCharIndex = 0
      currentMessageIndex = (currentMessageIndex + 1) % loveMessages.length
      typewriterInterval = setTimeout(typeWriter, 500)
    }, 3000)
  }
}

// 光标闪烁
const blinkCursor = () => {
  showCursor.value = !showCursor.value
}

// 组件挂载
onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  
  // 启动打字机效果
  typewriterInterval = setTimeout(typeWriter, 1000)
  
  // 启动光标闪烁
  cursorInterval = setInterval(blinkCursor, 500)
})

// 组件卸载
onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
  if (typewriterInterval) clearTimeout(typewriterInterval)
  if (cursorInterval) clearInterval(cursorInterval)
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
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
  font-size: 20px;
  color: rgba(255, 255, 255, 0.3);
  animation: floatUp 6s infinite linear;
}

.floating-heart:nth-child(1) {
  left: 10%;
  animation-delay: 0s;
}

.floating-heart:nth-child(2) {
  left: 20%;
  animation-delay: 1s;
}

.floating-heart:nth-child(3) {
  left: 30%;
  animation-delay: 2s;
}

.floating-heart:nth-child(4) {
  left: 70%;
  animation-delay: 3s;
}

.floating-heart:nth-child(5) {
  left: 80%;
  animation-delay: 4s;
}

.floating-heart:nth-child(6) {
  left: 90%;
  animation-delay: 5s;
}

.floating-heart::before {
  content: '💖';
}

@keyframes floatUp {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.main-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 800px;
  width: 100%;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);
}

.time-display {
  margin-bottom: 30px;
}

.time-section {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 20px;
  border-radius: 15px;
  position: relative;
  transition: transform 0.3s ease;
}

.time-section:hover {
  transform: translateY(-5px);
}

.time-label {
  font-size: 16px;
  margin-bottom: 10px;
  opacity: 0.9;
}

.time-value {
  font-size: 24px;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

.time-clock {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 24px;
}

.typewriter-container {
  position: relative;
  width: 100%;
  margin: 40px 0;
  text-align: center;
  padding: 30px 20px;
}

.typewriter-text {
  font-size: 28px;
  line-height: 1.3;
  color: transparent;
  white-space: nowrap;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  font-family: 'Georgia', serif;
  font-weight: 600;
  max-width: 100%;
  margin: 0 auto;
  letter-spacing: 1px;
  position: relative;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite, textBreath 2s ease-in-out infinite;
}

.cursor {
  color: #ff6b6b;
  font-weight: bold;
  animation: blink 1s infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes textBreath {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.love-heart-container {
  margin: 40px 0;
  animation: fadeInUp 1s ease-out 0.5s both;
}

.love-message h2 {
  color: #e74c3c;
  font-size: 32px;
  margin: 0;
  animation: heartbeat 2s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.navigation-buttons {
  display: flex;
  gap: 30px;
  justify-content: center;
  margin: 40px 0;
  animation: fadeInUp 1s ease-out 0.8s both;
}

.love-button {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  min-width: 200px;
}

.love-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

.button-icon {
  font-size: 32px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.button-text {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.button-desc {
  font-size: 14px;
  opacity: 0.9;
}

.signature {
  margin-top: 40px;
  animation: fadeInUp 1s ease-out 1s both;
}

.signature p {
  color: #7f8c8d;
  font-style: italic;
  font-size: 18px;
  margin: 0;
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
  .main-content {
    padding: 30px 20px;
    margin: 10px;
  }
  
  .time-display {
    margin-bottom: 20px;
  }
  
  .typewriter-text {
    font-size: 20px;
    white-space: normal;
    line-height: 1.4;
  }
  
  .navigation-buttons {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  
  .love-button {
    min-width: 250px;
  }
  
  .love-message h2 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 20px 15px;
  }
  
  .typewriter-text {
    font-size: 18px;
  }
  
  .time-value {
    font-size: 20px;
  }
  
  .button-text {
    font-size: 16px;
  }
  
  .love-message h2 {
    font-size: 20px;
  }
}
</style>