<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { calculateTimeDifference } from '@/utils/timeCalculator'

const router = useRouter()

// 计算相识和相爱的时间
const firstMeetDate = new Date('2007-09-01T00:00:00')
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
  '从2007年的初次相遇，到2024年的重新开始',
  '十七年后的重逢，让我发现你就是我一直在寻找的那个人',
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
  
  console.log('Love confession page loaded for 宋玲')
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
            {{ timeSinceFirstMeet.years }}年 {{ timeSinceFirstMeet.months }}月 {{ timeSinceFirstMeet.days }}日
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
            {{ timeSinceLove.years }}年 {{ timeSinceLove.months }}月 {{ timeSinceLove.days }}日
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
      <div class="love-heart-container" v-show="showLoveHeart">
        <canvas id="loveCanvas" width="400" height="300"></canvas>
        <div class="love-message">
          <h2>宋玲，我爱你！</h2>
          <p>愿我们的爱情如这颗心一样，永远跳动，永不停息</p>
        </div>
      </div>
      
      <!-- 导航按钮区域 -->
      <div class="navigation-buttons" v-show="showNavigation">
        <button class="love-button" @click="goToConfession">
          <span class="button-icon">💌</span>
          <span class="button-text">我的告白</span>
          <span class="button-desc">那些想对你说的话</span>
        </button>
        
        <button class="love-button" @click="goToMemories">
          <span class="button-icon">📸</span>
          <span class="button-text">爱的回忆</span>
          <span class="button-desc">我们一起的美好时光</span>
        </button>
      </div>
      
      <!-- 底部签名 -->
      <div class="signature" v-show="showNavigation">
        <p>— 永远爱你的人 ❤️</p>
        <p class="date">2024年12月</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Noto+Sans+SC:wght@300;400;700&display=swap');

.love-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%);
  position: relative;
  overflow: hidden;
  font-family: 'Noto Sans SC', sans-serif;
  color: white;
  margin: 0;
  padding: 0;
}

/* 星空背景 */
.stars-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle linear infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* 浮动爱心 */
.hearts-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.floating-heart {
  position: absolute;
  animation: floatUp 6s linear infinite;
  pointer-events: none;
  filter: drop-shadow(0 0 10px rgba(255, 182, 193, 0.8));
}

@keyframes floatUp {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* 主要内容 */
.main-content {
  position: relative;
  z-index: 3;
  padding: 3rem 5%;
  width: 100%;
  max-width: none;
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  line-height: 2.2;
  color: #fff;
  white-space: pre-line;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-family: 'Dancing Script', cursive;
  font-weight: 500;
  max-width: 1000px;
  margin: 0 auto;
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
  font-weight: 700;
  animation: pulse 2s ease-in-out infinite;
}

.love-message p {
  font-size: 1.8rem;
  color: #ffb6c1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  max-width: 800px;
  margin: 0 auto;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* 导航按钮 */
.navigation-buttons {
  display: flex;
  gap: 5rem;
  margin: 6rem 0;
  flex-wrap: wrap;
  justify-content: center;
  animation: fadeInUp 1s ease-out 0.5s both;
  width: 100%;
}

.love-button {
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  border: none;
  border-radius: 30px;
  padding: 3rem 4rem;
  color: white;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-align: center;
  min-width: 280px;
  box-shadow: 0 15px 40px rgba(255, 107, 157, 0.4);
  position: relative;
  overflow: hidden;
  flex: 1;
  max-width: 400px;
}

.love-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.love-button:hover::before {
  left: 100%;
}

.love-button:hover {
  transform: translateY(-10px) scale(1.08);
  box-shadow: 0 25px 60px rgba(255, 107, 157, 0.6);
  background: linear-gradient(135deg, #ff8fb3, #d55a7a);
}

.button-icon {
  display: block;
  font-size: 3.5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
}

.button-text {
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.button-desc {
  display: block;
  font-size: 1.2rem;
  opacity: 0.95;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

/* 签名 */
.signature {
  text-align: center;
  margin-top: 6rem;
  animation: fadeInUp 1s ease-out 1s both;
  width: 100%;
}

.signature p {
  font-size: 1.6rem;
  color: #ffb6c1;
  margin: 1rem 0;
  font-family: 'Dancing Script', cursive;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.signature .date {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* 动画 */
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

/* PC端大屏幕优化 */
@media (min-width: 1200px) {
  .main-content {
    padding: 4rem 8%;
  }
  
  .time-display {
    gap: 8rem;
    margin-bottom: 8rem;
  }
  
  .time-section {
    padding: 4rem 5rem;
    min-width: 400px;
  }
  
  .typewriter-container {
    margin: 8rem 0;
  }
  
  .typewriter-text {
    font-size: 2.4rem;
    line-height: 2.5;
  }
  
  .love-heart-container {
    margin: 8rem 0;
  }
  
  .love-message h2 {
    font-size: 5rem;
  }
  
  .love-message p {
    font-size: 2.2rem;
  }
  
  .navigation-buttons {
    gap: 8rem;
    margin: 8rem 0;
  }
  
  .love-button {
    padding: 4rem 5rem;
    min-width: 350px;
    max-width: 450px;
  }
}

@media (min-width: 1600px) {
  .main-content {
    padding: 5rem 10%;
  }
  
  .time-display {
    gap: 10rem;
  }
  
  .time-section {
    min-width: 450px;
    padding: 5rem 6rem;
  }
  
  .typewriter-text {
    font-size: 2.8rem;
  }
  
  .love-message h2 {
    font-size: 6rem;
  }
  
  .navigation-buttons {
    gap: 10rem;
  }
}

/* 平板端 */
@media (min-width: 769px) and (max-width: 1199px) {
  .main-content {
    padding: 3rem 6%;
  }
  
  .time-display {
    gap: 4rem;
  }
  
  .time-section {
    min-width: 300px;
    padding: 2.5rem 3rem;
  }
  
  .typewriter-text {
    font-size: 1.8rem;
  }
  
  .love-message h2 {
    font-size: 3.5rem;
  }
  
  .navigation-buttons {
    gap: 4rem;
  }
  
  .love-button {
    min-width: 250px;
    padding: 2.5rem 3.5rem;
  }
}

/* 移动端 */
@media (max-width: 768px) {
  .main-content {
    padding: 2rem 4%;
  }
  
  .time-display {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    margin-bottom: 4rem;
  }
  
  .time-section {
    min-width: 280px;
    max-width: 350px;
    padding: 2rem 2.5rem;
  }
  
  .time-label {
    font-size: 1.4rem;
  }
  
  .time-clock {
    font-size: 2rem;
  }
  
  .typewriter-container {
    margin: 4rem 0;
    padding: 0 3%;
  }
  
  .typewriter-text {
    font-size: 1.4rem;
    line-height: 2;
  }
  
  .love-message h2 {
    font-size: 2.5rem;
  }
  
  .love-message p {
    font-size: 1.3rem;
  }
  
  .navigation-buttons {
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    margin: 4rem 0;
  }
  
  .love-button {
    min-width: 280px;
    max-width: 350px;
    padding: 2.5rem 3rem;
  }
  
  .button-icon {
    font-size: 3rem;
  }
  
  .button-text {
    font-size: 1.5rem;
  }
  
  .signature {
    margin-top: 4rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 1.5rem 3%;
  }
  
  .time-section {
    padding: 1.5rem 2rem;
    min-width: 250px;
  }
  
  .time-label {
    font-size: 1.2rem;
  }
  
  .time-clock {
    font-size: 1.6rem;
  }
  
  .typewriter-text {
    font-size: 1.2rem;
  }
  
  .love-message h2 {
    font-size: 2rem;
  }
  
  .love-message p {
    font-size: 1.1rem;
  }
  
  .love-button {
    min-width: 250px;
    padding: 2rem 2.5rem;
  }
  
  .button-icon {
    font-size: 2.5rem;
  }
  
  .button-text {
    font-size: 1.3rem;
  }
  
  .button-desc {
    font-size: 1rem;
  }
}
</style>
