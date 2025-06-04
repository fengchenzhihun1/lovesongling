<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { calculateTimeDifference } from '@/utils/timeCalculator'

const router = useRouter()

// 计算相识和相爱的时间
const firstMeetDate = new Date('2006-09-01T00:00:00')
const loveStartDate = new Date('2024-05-04T00:00:00')
const currentTime = ref(new Date())

// 定时器更新当前时间
let timer: number | null = null

// 打字机效果相关
const typewriterText = ref('')
const showLoveHeart = ref(false)
const showNavigation = ref(false)

// 爱情文字内容
const loveMessages = [
  '宋玲，我想对你说...',
  '从2006年的初次相遇，到2024年的重新开始',
  '十八年后的重逢，让我发现你就是我一直在寻找的那个人',
  '你就像天边最亮的那颗星，指引着我前进的方向',
  '在郑州的那次约会，我看到了你眼中的星光',
  '迪士尼的浪漫之旅，让我更加确定你就是我的唯一',
  '每一次的磕磕碰碰，都让我们的爱情更加坚固',
  '宋玲，你愿意和我一起走过人生的每一个春夏秋冬吗？',
  '愿我们的爱情故事永远美好下去...'
]

const timeSinceFirstMeet = computed(() => {
  return calculateTimeDifference(firstMeetDate, currentTime.value)
})

const timeSinceLove = computed(() => {
  return calculateTimeDifference(loveStartDate, currentTime.value)
})

// 打字机效果
function startTypewriter() {
  let messageIndex = 0
  let charIndex = 0
  
  function typeNextChar() {
    if (messageIndex < loveMessages.length) {
      const currentMessage = loveMessages[messageIndex]
      
      if (charIndex < currentMessage.length) {
        typewriterText.value += currentMessage[charIndex]
        charIndex++
        setTimeout(typeNextChar, 100)
      } else {
        typewriterText.value += '\n\n'
        messageIndex++
        charIndex = 0
        setTimeout(typeNextChar, 1000)
      }
    } else {
      // 打字完成，显示爱心和导航
      setTimeout(() => {
        showLoveHeart.value = true
        setTimeout(() => {
          showNavigation.value = true
        }, 2000)
      }, 1000)
    }
  }
  
  setTimeout(typeNextChar, 2000)
}

// 爱心动画
function createFloatingHeart() {
  const heart = document.createElement('div')
  heart.innerHTML = '💖'
  heart.className = 'floating-heart'
  heart.style.left = Math.random() * 100 + '%'
  heart.style.animationDelay = Math.random() * 2 + 's'
  heart.style.fontSize = (Math.random() * 20 + 20) + 'px'
  
  document.querySelector('.hearts-container')?.appendChild(heart)
  
  setTimeout(() => {
    heart.remove()
  }, 6000)
}

// 页面加载动画和定时器
onMounted(() => {
  // 启动定时器，每秒更新时间
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
  
  // 启动打字机效果
  startTypewriter()
  
  // 定期创建浮动爱心
  setInterval(createFloatingHeart, 800)
  
  console.log('Love homepage loaded for 宋玲')
})

// 清理定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

// 导航函数
function goToConfession() {
  router.push('/confession')
}

function goToMemories() {
  router.push('/memories')
}
</script>

<template>
  <div class="love-container">
    <!-- 背景星空 -->
    <div class="stars-background">
      <div class="star" v-for="n in 100" :key="n" 
           :style="{ 
             left: Math.random() * 100 + '%', 
             top: Math.random() * 100 + '%',
             animationDelay: Math.random() * 3 + 's',
             animationDuration: (Math.random() * 3 + 2) + 's'
           }">
      </div>
    </div>
    
    <!-- 浮动爱心容器 -->
    <div class="hearts-container"></div>
    
    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 顶部时间显示 -->
      <div class="time-display">
        <div class="time-section">
          <div class="time-label">💕 相识时光</div>
          <div class="time-value">
            {{ timeSinceFirstMeet.years }}年 {{ timeSinceFirstMeet.months }}月 {{ timeSinceFirstMeet.days }}天
            <span class="time-clock">
              {{ String(timeSinceFirstMeet.hours).padStart(2, '0') }}:
              {{ String(timeSinceFirstMeet.minutes).padStart(2, '0') }}:
              {{ String(timeSinceFirstMeet.seconds).padStart(2, '0') }}
            </span>
          </div>
        </div>
        
        <div class="time-section">
          <div class="time-label">💖 相爱时光</div>
          <div class="time-value">
            {{ timeSinceLove.years }}年 {{ timeSinceLove.months }}月 {{ timeSinceLove.days }}天
            <span class="time-clock">
              {{ String(timeSinceLove.hours).padStart(2, '0') }}:
              {{ String(timeSinceLove.minutes).padStart(2, '0') }}:
              {{ String(timeSinceLove.seconds).padStart(2, '0') }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- 打字机文字区域 -->
      <div class="typewriter-container">
        <div class="typewriter-text">{{ typewriterText }}</div>
        <div class="cursor">|</div>
      </div>
      
      <!-- 爱心动画区域 -->
      <div v-if="showLoveHeart" class="love-heart-container">
        <div class="love-message">
          <h2>💖 永远爱你 💖</h2>
        </div>
      </div>
      
      <!-- 导航按钮 -->
      <div v-if="showNavigation" class="navigation-buttons">
        <div class="love-button" @click="goToConfession">
          <div class="button-icon">💌</div>
          <div class="button-text">我的表白</div>
          <div class="button-desc">阅读我写给你的情书</div>
        </div>
        
        <div class="love-button" @click="goToMemories">
          <div class="button-icon">📸</div>
          <div class="button-text">爱的回忆</div>
          <div class="button-desc">我们的美好瞬间</div>
        </div>
      </div>
      
      <!-- 签名 -->
      <div class="signature">
        <p>爱你的人</p>
      </div>
      
      <!-- 首页不需要返回首页按钮 -->
    </div>
  </div>
</template>

<style scoped>
/* 容器样式 */
.love-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #2d3a8c 0%, #4a1c5c 25%, #5d2d7a 50%, #c2185b 75%, #e91e63 100%);
}

/* 星空背景 */
.stars-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.8);
  animation: twinkle 5s infinite ease-in-out;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* 浮动爱心 */
.hearts-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.floating-heart {
  position: absolute;
  bottom: -20px;
  animation: floatUp 6s linear forwards;
  opacity: 0.7;
  filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.7));
}

@keyframes floatUp {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

/* 主要内容 */
.main-content {
  position: relative;
  z-index: 3;
  padding: 2rem 5% 3rem;
  width: 100%;
  max-width: none;
  margin: 0;
  min-height: calc(100vh - 120px); /* 减去导航栏高度 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
}

/* 时间显示 */
.time-display {
  display: flex;
  gap: 6rem;
  margin-bottom: 5rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.time-section {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 3rem 4rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  min-width: 350px;
  flex: 1;
  max-width: 500px;
  transition: all 0.3s ease;
}

.time-section:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 0.15);
}

.time-label {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #ffb6c1;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.time-value {
  font-size: 1.4rem;
  color: #fff;
  line-height: 1.8;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.time-clock {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffd700;
  margin-top: 1rem;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
  letter-spacing: 2px;
}

/* 打字机效果 */
.typewriter-container {
  position: relative;
  width: 100%;
  max-width: none;
  margin: 6rem 0;
  text-align: center;
  padding: 0 5%;
}

.typewriter-text {
  font-size: 2rem;
  line-height: 1.3; /* 进一步减小行高，使文字更紧凑 */
  background: linear-gradient(45deg, #fff, #ffb6c1, #ffd700, #ff69b4);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: pre-line;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-family: 'Dancing Script', cursive;
  font-weight: 500;
  max-width: 1000px;
  margin: 0 auto;
  letter-spacing: -0.5px;
  animation: gradientShift 4s ease-in-out infinite, textBreath 3s ease-in-out infinite;
  position: relative;
}

.cursor {
  display: inline-block;
  font-size: 1.6rem;
  color: #ffd700;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* 爱心动画区域 */
.love-heart-container {
  text-align: center;
  margin: 6rem 0;
  animation: fadeInUp 1s ease-out;
  width: 100%;
}

.love-message {
  margin-top: 3rem;
}

.love-message h2 {
  font-size: 4rem;
  color: #ff69b4;
  margin-bottom: 2rem;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  font-family: 'Dancing Script', cursive;
  animation: heartbeat 1.5s infinite alternate;
}

@keyframes heartbeat {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

/* 导航按钮 */
.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 2rem 0 4rem;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 0.5s both;
}

.love-button {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem 3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  min-width: 250px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.love-button:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
}

.button-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite alternate;
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-10px); }
}

.button-text {
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.button-desc {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

/* 签名 */
.signature {
  margin-top: 4rem;
  text-align: right;
  width: 100%;
  max-width: 1000px;
  padding-right: 2rem;
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  animation: fadeInUp 1s ease-out 1s both;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes textBreath {
  0%, 100% { 
    transform: scale(1);
    filter: brightness(1);
  }
  50% { 
    transform: scale(1.02);
    filter: brightness(1.1);
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

/* 响应式优化 */
@media (min-width: 1200px) {
  .main-content {
    padding: 3rem 10% 5rem;
  }
  
  .time-display {
    gap: 8rem;
  }
  
  .typewriter-text {
    font-size: 2.2rem;
  }
}
</style>