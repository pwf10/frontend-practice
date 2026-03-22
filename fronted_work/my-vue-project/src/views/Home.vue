<template>
  <div class="home-container">
    <!-- 顶部装饰条 -->
    <div class="top-decoration"></div>

    <!-- 主标题区域 -->
    <div class="hero-section">
      <h1 class="main-title">基于物联网技术的多源传感地震智能检测与预警系统</h1>
      <p class="subtitle">Earthquake Monitoring System</p>

      <div class="intro-section">
        <p class="intro-text">
          我国是地震灾害多发国家，地震活动具有频度高、强度大、分布广等特点，
          迷你地震监测预警系统在生活中显得尤为必要。本项目设计并实现了一套基于普中-ESP32开发板的地震监测预警系统，
          通过多传感器融合（MPU6050六轴运动传感器、SW-420震动传感器等）与高可靠性机制，
          构建"数据采集-实时处理-智能预警"一体化监测体系。
        </p>
      </div>
    </div>
    
    <!-- 视频展示区域 -->
    <div class="video-section">
      <h2 class="section-title"></h2>
      <div class="video-container">
        <video 
          ref="demoVideo"
          class="demo-video"
          controls
          preload="metadata"
          :poster="videoPoster"
          @play="onVideoPlay"
          @pause="onVideoPause"
        >
          <source :src="videoSource" type="video/mp4">
          您的浏览器不支持视频播放，请升级浏览器或使用现代浏览器访问。
        </video>
        
        <!-- 简化版视频控制栏 -->
        <div class="video-controls" v-if="showCustomControls">
          <button 
            class="control-btn play-pause-btn"
            @click="togglePlay"
          >
            <i class="control-icon">{{ isPlaying ? '❚❚' : '▶' }}</i>
          </button>
          
          <div class="progress-container">
            <div 
              class="progress-bar"
              @click="seekVideo"
            >
              <div 
                class="progress-fill"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
          </div>
          
          <div class="time-display">
            {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
          </div>
          
          <button 
            class="control-btn fullscreen-btn"
            @click="toggleFullscreen"
          >
            <i class="control-icon">⛶</i>
          </button>
        </div>
      </div>
    </div>

    <!-- 系统特性展示 -->
    <div class="features-section">
      <h2 class="section-title">系统核心特性</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <span class="feature-badge">实时</span>
          </div>
          <h3>全方位实时监测</h3>
          <p>
            系统采用多传感器融合技术，24小时不间断监测地震活动与山体稳定性参数，通过ESP32主控芯片实时采集加速度、倾斜角度、温湿度等多维度数据，确保监测的连续性与准确性。数据采集频率高达100Hz，能够捕捉到微小的地面振动变化山体位移，为灾害预警提供可靠的数据基础。
          </p>
          <div class="feature-tags">
            <span class="tag">24小时监测</span>
            <span class="tag">多传感器</span>
            <span class="tag">实时采集</span>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <span class="feature-badge">智能</span>
          </div>
          <h3>智能预警分析</h3>
          <p>
            基于传感器数据与阈值分析技术，系统能够智能识别地震前兆与山体失稳特征，及时发出分级预警信息，为避险争取宝贵时间，有效降低灾害带来的损失。预警系统采用多级响应机制，根据灾害强度自动调整预警级别，确保信息的准确性和及时性。
          </p>
          <div class="feature-tags">

            <span class="tag">智能算法</span>
            <span class="tag">分级预警</span>
            <span class="tag">风险评估</span>

          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <span class="feature-badge">集成</span>
          </div>
          <h3>多源数据融合</h3>
          <p>
            系统整合MPU6050六轴运动传感器、DHT11温湿度传感器、SW-420震动传感器等多种硬件，构建完整的数据采集与分析体系，实现多源数据的协同处理与展示。通过数据融合算法，提高地震与滑坡监测精度，减少误报率，确保系统在各种环境条件下的稳定运行。
          </p>
          <div class="feature-tags">
            <span class="tag">数据融合</span>
            <span class="tag">多源采集</span>
            <span class="tag">协同处理</span>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <span class="feature-badge">可视</span>
          </div>
          <h3>可视化数据展示</h3>
          <p>
            通过现代化Web界面，系统提供丰富的数据可视化功能，包括实时图表、历史趋势分析、设备状态监控等，使用户能够直观了解监测数据与系统运行状态。支持多灾害场景数据对比分析，提供专业的数据报表导出功能，满足不同用户的数据分析需求。
          </p>
          <div class="feature-tags">
            <span class="tag">图表展示</span>
            <span class="tag">趋势分析</span>
            <span class="tag">状态监控</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 轮播图展示 -->
    <div class="carousel-section">
      <h2 class="section-title">系统应用场景</h2>
      <div class="carousel-container">
        <div class="carousel-wrapper" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div class="carousel-slide">
            <img src="@/assets/images/1.jpg" alt="地震监测设备" />
            <div class="slide-content">
              <h3>智能监测地震</h3>
              <p>基于ESP32的核心监测单元，集成多种传感器</p>
            </div>
          </div>
          <div class="carousel-slide">
            <img src="@/assets/images/2.jpg" alt="数据分析平台" />
            <div class="slide-content">
              <h3>精确分析数据</h3>
              <p>实时处理和分析采集的地震相关数据</p>
            </div>
          </div>
          <div class="carousel-slide">
            <img src="@/assets/images/4.jpg" alt="预警系统" />
            <div class="slide-content">
              <h3>山体滑坡监测预警</h3>
              <p>实时监测山体倾斜变化，提前预警滑坡风险</p>
            </div>
          </div>
          <div class="carousel-slide">
            <img src="@/assets/images/3.jpg" alt="预警系统" />
            <div class="slide-content">
              <h3>发送预警通知</h3>
              <p>及时向用户发送地震预警信息，同时监测滑坡遇难人员情况</p>
            </div>
          </div>
          
        </div>

        <!-- 轮播指示器 -->
        <div class="carousel-indicators">
          <button v-for="(slide, index) in slides" :key="index" @click="goToSlide(index)"
            :class="{ 'active': currentIndex === index }"></button>
        </div>

        <!-- 左右切换按钮 -->
        <button class="carousel-prev" @click="prevSlide">
          <i class="arrow">‹</i>
        </button>
        <button class="carousel-next" @click="nextSlide">
          <i class="arrow">›</i>
        </button>
      </div>
    </div>

    <!-- 技术架构展示 -->
    <div class="architecture-section">
      <h2 class="section-title">系统技术架构</h2>
      <div class="architecture-steps">
        <div class="step-card">
          <div class="step-number">01</div>
          <h3>数据采集层</h3>
          <p>通过ESP32连接各类传感器，实时采集环境数据和地震相关参数</p>
        </div>

        <div class="step-card">
          <div class="step-number">02</div>
          <h3>数据处理层</h3>
          <p>对采集的原始数据进行滤波、分析和特征提取，识别异常模式</p>
        </div>

        <div class="step-card">
          <div class="step-number">03</div>
          <h3>预警分析层</h3>
          <p>基于传感器数据评估地震与滑坡风险，生成预警等级和通知</p>
        </div>

        <div class="step-card">
          <div class="step-number">04</div>
          <h3>应用展示层</h3>
          <p>通过Web界面实时展示数据、图表和预警信息</p>
        </div>
      </div>
    </div>

    <!-- 快速导航 -->
    <div class="quick-nav-section">
      <h2 class="section-title">快速访问</h2>
      <div class="nav-cards">
        <router-link to="/background" class="nav-card">
          <div class="nav-icon">
            <img src="@/assets/images/icons/earthquake_icon.svg" alt="项目背景">
          </div>
          <h3>项目背景及应用</h3>
          <p>了解系统硬件组成和技术原理</p>
          <span class="nav-arrow">→</span>
        </router-link>

        <router-link to="/data-table" class="nav-card">
          <div class="nav-icon">
            <img src="@/assets/images/icons/humidity_temp_icon.svg" alt="数据表格">
          </div>
          <h3>数据表格</h3>
          <p>查看详细的传感器数据记录</p>
          <span class="nav-arrow">→</span>
        </router-link>

        <router-link to="/data-visualization" class="nav-card">
          <div class="nav-icon">
            <img src="@/assets/images/icons/oled_icon.svg" alt="数据可视化">
          </div>
          <h3>数据可视化</h3>
          <p>通过图表直观分析数据趋势</p>
          <span class="nav-arrow">→</span>
        </router-link>
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="footer-section">
      <div class="footer-content">
        <div class="footer-columns-wrapper">
          <div class="footer-column">
            <div class="footer-icon">
              <i class="icon-shield"></i>
            </div>
            <h3>
              <p style="margin-bottom: 0.5rem;">关于我们</p>
            </h3>
            <p style="margin-bottom: 1rem;">研发团队聚焦 ESP32 技术的物联网化应用，构建地震监测预警系统 ——
              通过实时数据感知、传输与分析的全链路优化，显著提升地震预警的响应速度与准确性，为人民生命财产安全筑起技术防线。</p>
            <div class="social-links">
              <a href="#" class="social-link">
                <i class="icon-wechat"></i>
              </a>
              <a href="#" class="social-link">
                <i class="icon-github"></i>
              </a>
              <a href="#" class="social-link">
                <i class="icon-email"></i>
              </a>
            </div>
          </div>

          <div class="footer-column">
            <div class="footer-icon">
              <i class="icon-link"></i>
            </div>
            <h3>
              <p style="margin-bottom: 0.5rem;">快速链接</p>
            </h3>
            <ul class="footer-links">
              <li>
                <router-link to="/">
                  <i class="icon-home"></i>
                  <span>首页</span>
                </router-link>
              </li>
              <li>
                <router-link to="/background">
                  <i class="icon-info"></i>
                  <span>项目背景</span>
                </router-link>
              </li>
              <li>
                <router-link to="/data-table">
                  <i class="icon-table"></i>
                  <span>数据表格</span>
                </router-link>
              </li>
              <li>
                <router-link to="/data-visualization">
                  <i class="icon-chart"></i>
                  <span>数据可视化</span>
                </router-link>
              </li>
            </ul>
          </div>

          <div class="footer-column">
            <div class="footer-icon">
              <i class="icon-contact"></i>
            </div>
            <h3>
              <p style="margin-bottom: 0.5rem;">联系我们</p>
            </h3>
            <div class="contact-info">
              <div class="contact-item">
                <i class="icon-location"></i>
                <span>地址：地震监测实验室</span>
              </div>
              <div class="contact-item">
                <i class="icon-phone"></i>
                <span>电话：123-4567-1111</span>
              </div>
              <div class="contact-item">
                <i class="icon-email"></i>
                <span>邮箱：earthquake@monitoring.com</span>
              </div>
              <div class="contact-item">
                <i class="icon-time"></i>
                <span>工作时间：周一至周五 9:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 新增分隔区域 -->
      <div class="footer-spacer"></div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; 2026 地震监测预警系统 - 版权所有</p>
          <div class="footer-badges">
            <span class="badge">物联网技术</span>
            <span class="badge">智能监测</span>
            <span class="badge">实时预警</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入视频文件
import videoSource from '@/assets/videos/system-demo.mp4';
import videoPoster from '@/assets/images/6.jpg';

export default {
  name: 'Home',
  data() {
    return {
      currentIndex: 0,
      slides: [1, 2, 3,4],
      carouselInterval: null,
      // 视频相关数据
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      progress: 0,
      isMuted: false,
      updateInterval: null,
      showCustomControls: false, // 默认使用原生控制
      // 视频文件路径
      videoSource: videoSource,
      videoPoster: videoPoster
    }
  },
  mounted() {
    this.startCarousel();
    const carousel = this.$el.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => clearInterval(this.carouselInterval));
    carousel.addEventListener('mouseleave', () => this.startCarousel());
    
    // 初始化视频事件监听
    this.initVideoEvents();
  },
  beforeDestroy() {
    clearInterval(this.carouselInterval);
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  },
  methods: {
    startCarousel() {
      this.carouselInterval = setInterval(() => {
        this.nextSlide();
      }, 4000);
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
    
    // 视频相关方法
    initVideoEvents() {
      const video = this.$refs.demoVideo;
      if (video) {
        video.addEventListener('loadedmetadata', () => {
          this.duration = video.duration;
        });
        
        video.addEventListener('timeupdate', () => {
          this.currentTime = video.currentTime;
          this.progress = (video.currentTime / video.duration) * 100;
        });
        
        video.addEventListener('ended', () => {
          this.isPlaying = false;
          clearInterval(this.updateInterval);
        });

        // 检测浏览器是否支持自定义控制
        this.showCustomControls = !video.controls;
      }
    },
    
    togglePlay() {
      const video = this.$refs.demoVideo;
      if (video) {
        if (video.paused) {
          video.play();
          this.isPlaying = true;
        } else {
          video.pause();
          this.isPlaying = false;
        }
      }
    },
    
    onVideoPlay() {
      this.isPlaying = true;
    },
    
    onVideoPause() {
      this.isPlaying = false;
    },
    
    seekVideo(event) {
      const video = this.$refs.demoVideo;
      if (video) {
        const progressBar = event.currentTarget;
        const clickPosition = event.offsetX;
        const progressBarWidth = progressBar.offsetWidth;
        const seekTime = (clickPosition / progressBarWidth) * video.duration;
        video.currentTime = seekTime;
      }
    },
    
    toggleMute() {
      const video = this.$refs.demoVideo;
      if (video) {
        video.muted = !video.muted;
        this.isMuted = video.muted;
      }
    },
    
    toggleFullscreen() {
      const video = this.$refs.demoVideo;
      if (video) {
        if (!document.fullscreenElement) {
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
          } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          }
        }
      }
    },
    
    formatTime(seconds) {
      if (!seconds || isNaN(seconds)) return '00:00';
      
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }
}
</script>

<style scoped>
/* 变量定义 */
:root {
  --primary-color: #165DFF;
  --secondary-color: #0F172A;
  --accent-color: #36CFFB;
  --light-bg: #F8FAFC;
  --text-primary: #1E293B;
  --text-secondary: #64748B;
  --white: #FFFFFF;
  --border-radius: 12px;
  --shadow-base: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 8px 24px rgba(22, 93, 255, 0.15);
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 48px;
  --spacing-xl: 80px;
}

/* 基础容器 */
.home-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%);
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  line-height: 1.6;
  /* 提高整体行间距 */
}

/* 顶部装饰条 */
.top-decoration {
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
}

/* 主标题区域 */
.hero-section {
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-md);
  background: url('@/assets/images/tech_grid.jpg') center/cover no-repeat;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1;
}

.hero-section>* {
  position: relative;
  z-index: 2;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.3;
  /* 优化标题行高 */
  letter-spacing: -0.5px;
  /* 稍微收紧字母间距 */
}

.subtitle {
  font-size: 1.2rem;
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: var(--spacing-lg);
  letter-spacing: 1px;
}

.intro-section {
  max-width: 800px;
  margin: 0 auto;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.8;
  /* 增加行高提高可读性 */
  color: var(--text-secondary);
  text-align: left;
  text-indent: 2em;
  /* 添加首行缩进 */
  margin-bottom: 0;
  /* 移除底部边距 */
}

/* 通用区块标题 */
.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  position: relative;
  line-height: 1.3;
  /* 优化标题行高 */
  letter-spacing: -0.5px;
  /* 稍微收紧字母间距 */
  margin-bottom: 1em;
  /* 移动端间距更小 */
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 2px;
}

/* 特性展示区域 */
.features-section {
  padding: var(--spacing-xl) var(--spacing-md);
  background: var(--white);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: var(--white);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-base);
  text-align: left;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
}

.feature-icon {
  width: 60px;
  height: 60px;
  margin-bottom: var(--spacing-md);
  background: rgba(22, 93, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-badge {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-color);
}

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
  /* 优化标题行高 */
  text-align: center;
  /* 确保标题居中 */
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  /* 增加段落行高 */
  margin-bottom: var(--spacing-md);
  flex-grow: 1;
  text-indent: 2em;
  /* 添加首行缩进 */
  padding: 0 1em;
  /* 添加左右内边距，与方框保持一个字的间隔 */
}

.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: rgba(22, 93, 255, 0.08);
  color: var(--primary-color);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* 轮播图区域 */
.carousel-section {
  padding: var(--spacing-xl) var(--spacing-md);
  background: var(--light-bg);
}

.carousel-container {
  position: relative;
  max-width: 1000px;
  height: 500px;
  margin: 0 auto;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-base);
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.carousel-slide {
  flex: 0 0 100%;
  position: relative;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: var(--white);
  padding: var(--spacing-lg);
}

.slide-content h3 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
  color: #FFFFFF;
  line-height: 1.4;
  /* 优化标题行高 */
  text-indent: 1cm;
  /* 添加缩进 */
}

.slide-content p {
  opacity: 0.9;
  color: #FFFFFF;
  line-height: 1.6;
  /* 增加行高 */
  text-indent: 1cm;
  /* 添加缩进 */
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicators button.active {
  background: var(--white);
  transform: scale(1.2);
}

.carousel-prev,
.carousel-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--primary-color);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-base);
}

.carousel-prev:hover,
.carousel-next:hover {
  background: var(--white);
  transform: translateY(-50%) scale(1.1);
}

.carousel-prev {
  left: 20px;
}

.carousel-next {
  right: 20px;
}

.arrow {
  font-weight: bold;
}

/* 技术架构区域 */
.architecture-section {
  padding: var(--spacing-xl) var(--spacing-md);
  background: var(--white);
}

.architecture-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.step-card {
  background: var(--light-bg);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  text-align: center;
  transition: all 0.3s ease;
  border-left: 4px solid var(--primary-color);
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-base);
}

.step-number {
  font-size: 3rem;
  font-weight: 700;
  color: rgba(22, 93, 255, 0.1);
  margin-bottom: var(--spacing-sm);
  line-height: 1;
  /* 优化数字行高 */
}

.step-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
  /* 优化标题行高 */
}

.step-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  /* 增加段落行高 */
  margin-bottom: var(--spacing-md);
}

.step-btn {
  background: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  line-height: 1.4;
  /* 优化按钮文字行高 */
}

.step-btn:hover {
  background: #0e4fd8;
  transform: translateY(-2px);
}

/* 快速导航区域 - 修改部分 */
.quick-nav-section {
  padding: var(--spacing-xl) var(--spacing-md);
  background: var(--light-bg);
}

.nav-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 改为3列固定布局 */
  gap: var(--spacing-md);
  /* 减小间距 */
  max-width: 1200px;
  /* 增加最大宽度 */
  margin: 0 auto;
  align-items: stretch;
  /* 确保所有卡片高度一致 */
}

.nav-card {
  background: var(--white);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  /* 确保所有卡片高度一致 */
  transition: all 0.3s ease;
  box-shadow: var(--shadow-base);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  text-align: center;
  /* 居中文本 */
}

.nav-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(22, 93, 255, 0.05), transparent);
  transition: left 0.5s ease;
}

.nav-card:hover::before {
  left: 100%;
}

.nav-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
}

.nav-icon {
  width: 70px;
  /* 统一图标大小 */
  height: 70px;
  background: rgba(22, 93, 255, 0.1);
  border-radius: 16px;
  /* 稍微增大圆角 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
  /* 居中并添加底部间距 */
}

.nav-icon img {
  width: 35px;
  /* 统一图标图片大小 */
  height: 35px;
}

.nav-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
  /* 移除缩进，保持居中 */
  text-indent: 0;
}

.nav-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  /* 增加行高 */
  margin-bottom: var(--spacing-md);
  flex-grow: 1;
  /* 让描述文本占据剩余空间 */
  /* 移除缩进，保持居中 */
  text-indent: 0;
}

.nav-arrow {
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.3s ease;
  margin-top: auto;
  /* 将箭头推到底部 */
}

.nav-card:hover .nav-arrow {
  transform: translateX(5px);
}

/* 底部信息区域美化 */
.footer-section {
  background: linear-gradient(135deg, #1c44a4 0%, #165DFF 100%);
  color: var(--white);
  padding: var(--spacing-xl) var(--spacing-md) 0;
  position: relative;
  overflow: hidden;
}

/* 添加背景装饰元素 */
.footer-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  z-index: 2;
}

.footer-section::after {
  content: '';
  position: absolute;
  top: 20%;
  right: 5%;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50%;
  z-index: 1;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.footer-columns-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  /* 增加底部间距 */
}

.footer-column {
  text-align: center;
  padding: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.footer-column:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.footer-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
  font-size: 1.5rem;
  color: var(--accent-color);
}

.footer-column h3 {
  font-size: 1.3rem;
  margin-bottom: var(--spacing-md);
  color: white;
  font-weight: 600;
  position: relative;
  display: inline-block;
  line-height: 1.4;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background-color: var(--accent-color);
  border-radius: 2px;
}

.footer-column p {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-bottom: var(--spacing-md);
}

/* 新增分隔区域 */
.footer-spacer {
  height: 60px;
  /* 控制分隔距离 */
  position: relative;
  z-index: 2;
}

/* 社交媒体链接 */
.social-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.social-link:hover {
  background: var(--accent-color);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(54, 207, 251, 0.3);
}

/* 链接列表 */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 8px 0;
  border-radius: 6px;
}

.footer-links a:hover {
  color: var(--white);
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.footer-links i {
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

/* 联系信息 */
.contact-info {
  text-align: left;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  padding: 8px 0;
  color: rgba(255, 255, 255, 0.85);
}

.contact-item i {
  font-size: 1.1rem;
  color: var(--accent-color);
  width: 20px;
  text-align: center;
}

/* 底部版权区域 */
.footer-bottom {
  background: rgba(0, 0, 0, 0.2);
  padding: var(--spacing-lg) var(--spacing-md);
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.footer-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.badge {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 图标字体（使用 Unicode 或图标类） */
.icon-shield::before {
  content: "🛡️";
}

.icon-link::before {
  content: "🔗";
}

.icon-contact::before {
  content: "📞";
}

.icon-home::before {
  content: "🏠";
}

.icon-info::before {
  content: "ℹ️";
}

.icon-table::before {
  content: "📊";
}

.icon-chart::before {
  content: "📈";
}

.icon-location::before {
  content: "📍";
}

.icon-phone::before {
  content: "📱";
}

.icon-email::before {
  content: "✉️";
}

.icon-time::before {
  content: "🕒";
}

.icon-wechat::before {
  content: "💬";
}

.icon-github::before {
  content: "🐙";
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-columns-wrapper {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .footer-column {
    padding: var(--spacing-md);
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-badges {
    justify-content: center;
  }

  .contact-info {
    text-align: center;
  }

  .contact-item {
    justify-content: center;
  }

  .footer-spacer {
    height: 40px;
    /* 移动端减少分隔距离 */
  }
}

@media (max-width: 480px) {
  .footer-section {
    padding: var(--spacing-lg) var(--spacing-sm) 0;
  }

  .footer-column {
    padding: 15px;
  }

  .social-links {
    gap: 10px;
  }

  .social-link {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .footer-spacer {
    height: 30px;
    /* 小屏幕进一步减少分隔距离 */
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-columns-wrapper {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .footer-column {
    padding: var(--spacing-md);
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-badges {
    justify-content: center;
  }

  .contact-info {
    text-align: center;
  }

  .contact-item {
    justify-content: center;
  }

  .footer-spacer {
    height: 40px;
    /* 移动端减少分隔距离 */
  }
}

@media (max-width: 480px) {
  .footer-section {
    padding: var(--spacing-lg) var(--spacing-sm) 0;
  }

  .footer-column {
    padding: 15px;
  }

  .social-links {
    gap: 10px;
  }

  .social-link {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .footer-spacer {
    height: 30px;
    /* 小屏幕进一步减少分隔距离 */
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .footer-column {
    padding: var(--spacing-sm);
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-badges {
    justify-content: center;
  }

  .contact-info {
    text-align: center;
  }

  .contact-item {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-section {
    padding: var(--spacing-lg) var(--spacing-sm) var(--spacing-sm);
  }

  .footer-column {
    padding: 15px;
  }

  .social-links {
    gap: 10px;
  }

  .social-link {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .carousel-container {
    height: 400px;
  }

  .features-grid,
  .architecture-steps {
    grid-template-columns: 1fr;
  }

  /* 移动端导航卡片改为单列 */
  .nav-cards {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .hero-section,
  .features-section,
  .carousel-section,
  .architecture-section,
  .quick-nav-section {
    padding: var(--spacing-lg) var(--spacing-sm);
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .footer-column {
    text-align: center;
  }

  .footer-column h3::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .footer-section::after {
    width: 150px;
    height: 150px;
    top: 10%;
    right: -50px;
  }

  /* 移动端减少缩进 */
  .intro-text,
  .feature-card p,
  .slide-content h3,
  .slide-content p {
    text-indent: 1em;
  }

  /* 移动端调整特性卡片内边距 */
  .feature-card p {
    padding: 0 0.8em;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .carousel-container {
    height: 300px;
  }

  .carousel-prev,
  .carousel-next {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }

  .feature-card {
    padding: var(--spacing-md);
  }

  .nav-card {
    padding: var(--spacing-md);
  }

  /* 进一步减少移动端缩进 */
  .intro-text,
  .feature-card p,
  .slide-content h3,
  .slide-content p {
    text-indent: 0.5em;
  }

  /* 小屏幕进一步调整特性卡片内边距 */
  .feature-card p {
    padding: 0 0.5em;
  }
}

/* 视频展示区域 */
.video-section {
  padding: var(--spacing-xl) var(--spacing-md);
  background: var(--light-bg);
}

.video-container {
  max-width: 900px;
  margin: 0 auto;
  background: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-base);
  overflow: hidden;
}

.demo-video {
  width: 100%;
  height: auto;
  max-height: 500px;
  background: #000;
  display: block;
}

/* 视频控制栏 */
.video-controls {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.8);
  color: var(--white);
  gap: 12px;
}

.control-btn {
  background: none;
  border: none;
  color: var(--white);
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.control-icon {
  font-size: 14px;
  font-style: normal;
}

/* 进度条 */
.progress-container {
  flex: 1;
  padding: 0 8px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  transition: height 0.2s ease;
}

.progress-bar:hover {
  height: 6px;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  border-radius: 2px;
  transition: width 0.1s ease;
}

/* 时间显示 */
.time-display {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  min-width: 80px;
  text-align: center;
}

/* 视频说明 */
.video-description {
  padding: var(--spacing-lg);
  text-align: center;
}

.video-description h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.video-description p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.video-features {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.video-tag {
  background: rgba(22, 93, 255, 0.1);
  color: var(--primary-color);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .video-controls {
    padding: 8px 12px;
    gap: 8px;
  }
  
  .control-btn {
    padding: 4px;
    min-width: 28px;
    min-height: 28px;
  }
  
  .control-icon {
    font-size: 12px;
  }
  
  .time-display {
    font-size: 0.8rem;
    min-width: 70px;
  }
  
  .video-description {
    padding: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .video-section {
    padding: var(--spacing-lg) var(--spacing-sm);
  }
  
  .video-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .progress-container {
    order: 3;
    flex: 0 0 100%;
    margin-top: 8px;
  }
}
</style>