<script setup lang="ts">
import { ref, computed } from 'vue'
import HomeButton from '@/components/HomeButton.vue'

// 定义奥特曼数据类型接口
interface Ultraman {
  id: number;
  name: string;
  alias: string;
  actor: string;
  firstAppear: string;
  height: string;
  weight: string;
  abilities: string[];
  description: string;
  image: string;
  color: string;
}

// 奥特曼数据
const ultramanList = ref<Ultraman[]>([
  {
    id: 1,
    name: '迪迦奥特曼',
    alias: '光之巨人',
    actor: '长野博',
    firstAppear: '1996年',
    height: '53米',
    weight: '4.4万吨',
    abilities: ['形态转换', '哉佩利敖光线', '定身光束'],
    description: '迪迦奥特曼是第一个能够变换形态的奥特曼，拥有复合型、强壮型和敏捷型三种形态。他是光的化身，也是黑暗的克星，在地球上与人类共同对抗来犯的怪兽和宇宙人。',
    image: 'https://via.placeholder.com/300x400?text=迪迦奥特曼',
    color: '#E91E63'
  },
  {
    id: 2,
    name: '戴拿奥特曼',
    alias: '光之使者',
    actor: '吉冈毅志',
    firstAppear: '1998年',
    height: '57米',
    weight: '4.5万吨',
    abilities: ['索尔捷特光线', '闪光捷特光线', '光线冲击波'],
    description: '戴拿奥特曼是迪迦的继承者，同样拥有三种形态：强壮型、奇迹型和闪耀型。他与人类青年飞鸟信合二为一，共同保卫地球和平。',
    image: 'https://via.placeholder.com/300x400?text=戴拿奥特曼',
    color: '#2196F3'
  },
  {
    id: 3,
    name: '盖亚奥特曼',
    alias: '大地之光',
    actor: '吉冈毅志',
    firstAppear: '1998年',
    height: '50米',
    weight: '4.2万吨',
    abilities: ['光子冲击', '量子流线', '光子喷射'],
    description: '盖亚奥特曼是地球意志的化身，与人类高山我梦合二为一。他拥有至高形态、至尊形态等多种形态，守护着地球的和平。',
    image: 'https://via.placeholder.com/300x400?text=盖亚奥特曼',
    color: '#4CAF50'
  },
  {
    id: 4,
    name: '赛罗奥特曼',
    alias: '光之国的救世主',
    actor: '宫野真守(配音)',
    firstAppear: '2009年',
    height: '49米',
    weight: '3.5万吨',
    abilities: ['终极铁拳', '终极光线', '等离子火花剑'],
    description: '赛罗奥特曼是奥特之父和奥特之母的儿子，拥有强大的战斗力和多种武器。他性格热血，正义感强，是新生代奥特曼中的佼佼者。',
    image: 'https://via.placeholder.com/300x400?text=赛罗奥特曼',
    color: '#FF5722'
  },
  {
    id: 5,
    name: '泰罗奥特曼',
    alias: '奥特兄弟之一',
    actor: '篠田三郎',
    firstAppear: '1973年',
    height: '53米',
    weight: '4.4万吨',
    abilities: ['斯特利姆光线', '奥特炸弹', '奥特断头刀'],
    description: '泰罗奥特曼是奥特之父和奥特之母的第六个儿子，也是奥特兄弟中最年轻的一位。他性格活泼，充满正义感，是光之国的优秀战士。',
    image: 'https://via.placeholder.com/300x400?text=泰罗奥特曼',
    color: '#FF9800'
  }
])

// 当前选中的奥特曼
const selectedUltraman = ref<Ultraman | null>(null)

// 显示奥特曼详情
function showUltramanDetail(ultraman: Ultraman) {
  selectedUltraman.value = ultraman
}

// 关闭奥特曼详情
function closeUltramanDetail() {
  selectedUltraman.value = null
}

// 搜索功能
const searchQuery = ref('')
const filteredUltraman = computed(() => {
  if (!searchQuery.value) return ultramanList.value
  
  const query = searchQuery.value.toLowerCase()
  return ultramanList.value.filter(ultraman => 
    ultraman.name.toLowerCase().includes(query) || 
    ultraman.alias.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div class="ultraman-home">
    <div class="search-bar">
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="搜索奥特曼..."
        class="search-input"
      />
    </div>
    
    <div class="ultraman-grid">
      <div 
        v-for="ultraman in filteredUltraman" 
        :key="ultraman.id"
        class="ultraman-card"
        :style="{ borderColor: ultraman.color }"
        @click="showUltramanDetail(ultraman)"
      >
        <div class="ultraman-image">
          <img :src="ultraman.image" :alt="ultraman.name" />
        </div>
        <div class="ultraman-info">
          <h3 class="ultraman-name">{{ ultraman.name }}</h3>
          <p class="ultraman-alias">{{ ultraman.alias }}</p>
          <div class="ultraman-abilities">
            <span 
              v-for="(ability, index) in ultraman.abilities.slice(0, 2)" 
              :key="index"
              class="ability-tag"
              :style="{ backgroundColor: ultraman.color }"
            >
              {{ ability }}
            </span>
            <span 
              v-if="ultraman.abilities.length > 2" 
              class="ability-more"
            >
              +{{ ultraman.abilities.length - 2 }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 奥特曼详情弹窗 -->
    <div v-if="selectedUltraman" class="ultraman-detail-modal">
      <div 
        class="modal-content"
        :style="{ borderColor: selectedUltraman.color }"
      >
        <button class="close-button" @click="closeUltramanDetail">&times;</button>
        
        <div class="modal-header" :style="{ backgroundColor: selectedUltraman.color }">
          <h2>{{ selectedUltraman.name }}</h2>
          <p>{{ selectedUltraman.alias }}</p>
        </div>
        
        <div class="modal-body">
          <div class="detail-image">
            <img :src="selectedUltraman.image" :alt="selectedUltraman.name" />
          </div>
          
          <div class="detail-info">
            <div class="info-item">
              <span class="info-label">首次登场：</span>
              <span class="info-value">{{ selectedUltraman.firstAppear }}</span>
            </div>
            
            <div class="info-item">
              <span class="info-label">扮演者：</span>
              <span class="info-value">{{ selectedUltraman.actor }}</span>
            </div>
            
            <div class="info-item">
              <span class="info-label">身高：</span>
              <span class="info-value">{{ selectedUltraman.height }}</span>
            </div>
            
            <div class="info-item">
              <span class="info-label">体重：</span>
              <span class="info-value">{{ selectedUltraman.weight }}</span>
            </div>
            
            <div class="info-item abilities-list">
              <span class="info-label">特殊能力：</span>
              <div class="abilities-tags">
                <span 
                  v-for="(ability, index) in selectedUltraman.abilities" 
                  :key="index"
                  class="ability-tag"
                  :style="{ backgroundColor: selectedUltraman.color }"
                >
                  {{ ability }}
                </span>
              </div>
            </div>
            
            <div class="info-item description">
              <span class="info-label">简介：</span>
              <p class="info-description">{{ selectedUltraman.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 使用通用返回首页按钮组件 -->
  <HomeButton />
</template>

<style scoped>
.ultraman-home {
  padding: 1rem 0;
}

.search-bar {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  border: 2px solid #e0e0e0;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
}

.ultraman-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.ultraman-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border-top: 4px solid;
}

.ultraman-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.ultraman-image {
  height: 200px;
  overflow: hidden;
}

.ultraman-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.ultraman-card:hover .ultraman-image img {
  transform: scale(1.05);
}

.ultraman-info {
  padding: 1.5rem;
}

.ultraman-name {
  font-size: 1.25rem;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
}

.ultraman-alias {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.ultraman-abilities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ability-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
}

.ability-more {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background-color: #e0e0e0;
  color: #666;
  font-size: 0.8rem;
  font-weight: 500;
}

/* 详情弹窗样式 */
.ultraman-detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-top: 5px solid;
  position: relative;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  z-index: 10;
}

.modal-header {
  padding: 2rem;
  color: white;
  text-align: center;
}

.modal-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.modal-header p {
  margin: 0;
  font-size: 1.2rem;
  opacity: 0.9;
}

.modal-body {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.detail-image {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.detail-image img {
  width: 100%;
  height: auto;
  display: block;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.info-label {
  font-weight: 600;
  color: #333;
  min-width: 80px;
}

.info-value {
  color: #666;
}

.abilities-list {
  flex-direction: column;
}

.abilities-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.description {
  flex-direction: column;
}

.info-description {
  margin: 0.5rem 0 0 0;
  line-height: 1.6;
  color: #444;
}

/* 返回首页按钮样式已移除，使用通用组件 */

/* 响应式调整 */
@media (max-width: 768px) {
  .modal-body {
    grid-template-columns: 1fr;
  }
  
  .ultraman-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}
</style>