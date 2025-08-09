<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue'

const emit = defineEmits<{
  authenticated: []
}>()

const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const correctPassword = 'v587'
const CACHE_KEY = 'investment_auth_cache'
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7天（毫秒）

// 检查缓存的验证状态
function checkCachedAuth(): boolean {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return false
    
    const { timestamp, authenticated } = JSON.parse(cached)
    const now = Date.now()
    
    // 检查是否在7天内且已验证
    if (authenticated && (now - timestamp) < CACHE_DURATION) {
      return true
    } else {
      // 缓存过期，清除
      localStorage.removeItem(CACHE_KEY)
      return false
    }
  } catch (error) {
    // 缓存数据损坏，清除
    localStorage.removeItem(CACHE_KEY)
    return false
  }
}

// 保存验证状态到缓存
function saveAuthToCache() {
  const cacheData = {
    timestamp: Date.now(),
    authenticated: true
  }
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
}

// 组件挂载时检查缓存
onMounted(() => {
  if (checkCachedAuth()) {
    emit('authenticated')
  }
})

function handleSubmit() {
  if (!password.value.trim()) {
    errorMessage.value = '请输入密码'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  
  // 模拟验证延迟
  setTimeout(() => {
    if (password.value === correctPassword) {
      saveAuthToCache() // 保存到缓存
      emit('authenticated')
    } else {
      errorMessage.value = '密码错误，请重新输入'
      password.value = ''
    }
    isLoading.value = false
  }, 500)
}

function handleKeyup(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    handleSubmit()
  }
}
</script>

<template>
  <div class="password-protection-overlay">
    <div class="password-protection-modal">
      <div class="modal-header">
        <h2 class="modal-title">🔒 投资模块访问验证</h2>
        <p class="modal-subtitle">请输入访问密码以继续</p>
      </div>
      
      <div class="modal-body">
        <div class="password-input-group">
          <input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            class="password-input"
            :disabled="isLoading"
            @keyup="handleKeyup"
            autofocus
          />
          
          <button
            @click="handleSubmit"
            class="submit-button"
            :disabled="isLoading || !password.trim()"
          >
            <span v-if="isLoading" class="loading-spinner">⏳</span>
            <span v-else>验证</span>
          </button>
        </div>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <div class="password-hint">
          <p>💡 提示：请联系管理员获取访问密码</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.password-protection-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.password-protection-modal {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-title {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.modal-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin: 0;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.password-input-group {
  display: flex;
  gap: 0.75rem;
}

.password-input {
  flex: 1;
  padding: 0.875rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.password-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.password-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.password-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-button {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #ee5a24, #ff6b6b);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(238, 90, 36, 0.3);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.error-message {
  color: #ff6b6b;
  background-color: rgba(255, 107, 107, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 107, 107, 0.3);
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.password-hint {
  text-align: center;
}

.password-hint p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin: 0;
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .password-protection-modal {
    padding: 2rem;
    margin: 1rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .password-input-group {
    flex-direction: column;
  }
  
  .submit-button {
    width: 100%;
  }
}
</style>