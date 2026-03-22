<template>
  <div class="background-container">
    <!-- 顶部装饰条 -->
    <div class="top-decoration"></div>

    <!-- 标题区域 -->
    <h2 class="page-title">硬件说明与系统架构</h2>
    <!-- 添加空白间距 -->
    <div style="height: 48px;"></div>

    <!-- 硬件展示区 -->
    <div class="hardware-grid">

      <!-- SW-420 振动传感器 -->
      <div class="hardware-card" :class="cardAnimate">
        <div class="hardware-content">
          <div class="hardware-image-container">
            <img src="@/assets/images/hardware/sw420.jpg" alt="SW-420 震动传感器" class="hardware-img" />
          </div>
          <div class="hardware-text">
            <div class="hardware-title">
              <div class="title-icon">
                <img src="@/assets/images/icons/earthquake_icon.svg" alt="振动传感器图标" class="icon" />
              </div>
              <h3 class="hardware-name">SW-420 震动传感器</h3>
            </div>
            <p class="hardware-desc">高灵敏度震动检测模块，常闭型传感器，当检测到振动时输出低电平信号，适用于地震、碰撞检测等场景。</p>
            <div class="hardware-specs">
              <span class="spec-tag">工作电压: 3.3-5V</span>
              <span class="spec-tag">输出信号: 数字信号</span>
              <span class="spec-tag">灵敏度可调</span>
            </div>
          </div>
        </div>
      </div>

      <!-- DHT11 温湿度传感器 -->
      <div class="hardware-card" :class="cardAnimate" style="animation-delay: 0.1s">
        <div class="hardware-content">
          <div class="hardware-image-container">
            <img src="@/assets/images/hardware/DHT11.png" alt="DHT11 温湿度传感器" class="hardware-img" />
          </div>
          <div class="hardware-text">
            <div class="hardware-title">
              <div class="title-icon">
                <img src="@/assets/images/icons/humidity_temp_icon.svg" alt="温湿度图标" class="icon" />
              </div>
              <h3 class="hardware-name">DHT11 温湿度传感器</h3>
            </div>
            <p class="hardware-desc">高精度采集环境温湿度，响应速度快、稳定性强，为环境监测提供基础数据。</p>
            <div class="hardware-specs">
              <span class="spec-tag">温度范围: 0-50°C</span>
              <span class="spec-tag">湿度范围: 20-90%</span>
              <span class="spec-tag">精度: ±2°C / ±5%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- TCRT5000 红外寻迹模块 -->
      <div class="hardware-card" :class="cardAnimate" style="animation-delay: 0.2s">
        <div class="hardware-content">
          <div class="hardware-image-container">
            <img src="@/assets/images/hardware/tcrt5000.jpg" alt="TCRT5000 红外寻迹模块" class="hardware-img" />
          </div>
          <div class="hardware-text">
            <div class="hardware-title">
              <div class="title-icon">
                <img src="@/assets/images/icons/esp32_icon.svg" alt="红外寻迹图标" class="icon" />
              </div>
              <h3 class="hardware-name">TCRT5000 红外寻迹模块</h3>
            </div>
            <p class="hardware-desc">红外反射式传感器，用于检测物体表面反射率，常用于线路跟踪、物体检测和距离测量。</p>
            <div class="hardware-specs">
              <span class="spec-tag">检测距离: 1-25mm</span>
              <span class="spec-tag">工作电压: 3.3-5V</span>
              <span class="spec-tag">数字/模拟输出</span>
            </div>
          </div>
        </div>
      </div>

      <!-- DS1302 实时时钟 -->
      <div class="hardware-card" :class="cardAnimate" style="animation-delay: 0.3s">
        <div class="hardware-content">
          <div class="hardware-image-container">
            <img src="@/assets/images/hardware/ds1302.jpg" alt="DS1302 实时时钟" class="hardware-img" />
          </div>
          <div class="hardware-text">
            <div class="hardware-title">
              <div class="title-icon">
                <img src="@/assets/images/icons/clock_icon.svg" alt="实时时钟图标" class="icon" />
              </div>
              <h3 class="hardware-name">DS1302 实时时钟</h3>
            </div>
            <p class="hardware-desc">低功耗实时时钟芯片，提供精确的秒、分、时、日、月、年计时功能，带31字节静态RAM。</p>
            <div class="hardware-specs">
              <span class="spec-tag">工作电压: 2.0-5.5V</span>
              <span class="spec-tag">接口: 三线SPI</span>
              <span class="spec-tag">内置晶振</span>
            </div>
          </div>
        </div>
      </div>

      <!-- SSD1306 OLED 显示屏 -->
      <div class="hardware-card" :class="cardAnimate" style="animation-delay: 0.4s">
        <div class="hardware-content">
          <div class="hardware-image-container">
            <img src="@/assets/images/hardware/SSD1306.jpg" alt="SSD1306 OLED 显示屏" class="hardware-img" />
          </div>
          <div class="hardware-text">
            <div class="hardware-title">
              <div class="title-icon">
                <img src="@/assets/images/icons/oled_icon.svg" alt="OLED显示屏图标" class="icon" />
              </div>
              <h3 class="hardware-name">SSD1306 OLED 显示屏</h3>
            </div>
            <p class="hardware-desc">128×64分辨率，低功耗自发光，可本地实时显示温湿度、系统状态等数据，便于现场观测。</p>
            <div class="hardware-specs">
              <span class="spec-tag">分辨率: 128×64</span>
              <span class="spec-tag">接口: I2C</span>
              <span class="spec-tag">低功耗</span>
            </div>
          </div>
        </div>
      </div>

      <!-- MPU6050 六轴传感器 -->
      <div class="hardware-card" :class="cardAnimate" style="animation-delay: 0.5s">
        <div class="hardware-content">
          <div class="hardware-image-container">
            <img src="@/assets/images/hardware/MPU6050.png" alt="MPU6050 六轴传感器" class="hardware-img" />
          </div>
          <div class="hardware-text">
            <div class="hardware-title">
              <div class="title-icon">
                <img src="@/assets/images/icons/mpu6050_icon.svg" alt="六轴传感器图标" class="icon" />
              </div>
              <h3 class="hardware-name">MPU6050 六轴传感器</h3>
            </div>
            <p class="hardware-desc">集成三轴陀螺仪和三轴加速度计，可精确检测物体的姿态、加速度和角速度变化。</p>
            <div class="hardware-specs">
              <span class="spec-tag">加速度: ±2/4/8/16g</span>
              <span class="spec-tag">陀螺仪: ±250/500/1000/2000°/s</span>
              <span class="spec-tag">接口: I2C</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 无源蜂鸣器 -->
      <div class="hardware-card" :class="cardAnimate" style="animation-delay: 0.6s">
        <div class="hardware-content">
          <div class="hardware-image-container">
            <img src="@/assets/images/hardware/buzzer.jpg" alt="无源蜂鸣器" class="hardware-img" />
          </div>
          <div class="hardware-text">
            <div class="hardware-title">
              <div class="title-icon">
                <img src="@/assets/images/icons/buzzer_icon.svg" alt="蜂鸣器图标" class="icon" />
              </div>
              <h3 class="hardware-name">无源蜂鸣器</h3>
            </div>
            <p class="hardware-desc">通过不同频率的PWM信号驱动，可发出多种音调，用于系统报警、状态提示等场景。</p>
            <div class="hardware-specs">
              <span class="spec-tag">工作电压: 3.3-5V</span>
              <span class="spec-tag">频率范围: 1.5-2.5kHz</span>
              <span class="spec-tag">无源驱动</span>
            </div>
          </div>
        </div>
      </div>

      <!-- WS2812 RGB 彩灯 -->
      <div class="hardware-card" :class="cardAnimate" style="animation-delay: 0.7s">
        <div class="hardware-content">
          <div class="hardware-image-container">
            <img src="@/assets/images/hardware/ws2812.jpg" alt="WS2812 RGB 彩灯" class="hardware-img" />
          </div>
          <div class="hardware-text">
            <div class="hardware-title">
              <div class="title-icon">
                <img src="@/assets/images/icons/led_icon.svg" alt="RGB彩灯图标" class="icon" />
              </div>
              <h3 class="hardware-name">WS2812 RGB 彩灯</h3>
            </div>
            <p class="hardware-desc">智能控制LED，内置控制芯片，单线控制多个灯珠，可实现丰富的灯光效果和状态指示。</p>
            <div class="hardware-specs">
              <span class="spec-tag">工作电压: 5V</span>
              <span class="spec-tag">单线控制</span>
              <span class="spec-tag">全彩RGB</span>
            </div>
          </div>
        </div>
      </div>

      <!-- TM1637 四位数码管 -->
      <div class="hardware-card" :class="cardAnimate" style="animation-delay: 0.8s">
        <div class="hardware-content">
          <div class="hardware-image-container">
            <img src="@/assets/images/hardware/tm1637.jpg" alt="TM1637 四位数码管" class="hardware-img" />
          </div>
          <div class="hardware-text">
            <div class="hardware-title">
              <div class="title-icon">
                <img src="@/assets/images/icons/oled_icon.svg" alt="数码管图标" class="icon" />
              </div>
              <h3 class="hardware-name">TM1637 四位数码管</h3>
            </div>
            <p class="hardware-desc">4位7段数码管显示模块，内置驱动芯片，亮度可调，用于显示数字、简单字符和时间信息。</p>
            <div class="hardware-specs">
              <span class="spec-tag">工作电压: 3.3-5V</span>
              <span class="spec-tag">接口: 二线制</span>
              <span class="spec-tag">亮度可调</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- 技术规格表格 -->
  <div class="specs-section">
    <h3 class="specs-title">硬件技术规格</h3>
    <div class="specs-table">
      <div class="specs-row">
        <div class="specs-cell specs-header">设备名称</div>
        <div class="specs-cell specs-header">型号</div>
        <div class="specs-cell specs-header">主要参数</div>
        <div class="specs-cell specs-header">接口类型</div>
      </div>
      <div class="specs-row">
        <div class="specs-cell">ESP32开发板</div>
        <div class="specs-cell">ESP32-WROOM-32</div>
        <div class="specs-cell">双核240MHz, 4MB Flash, Wi-Fi + 蓝牙</div>
        <div class="specs-cell">GPIO, I2C, SPI, UART</div>
      </div>
      <div class="specs-row">
        <div class="specs-cell">温湿度传感器</div>
        <div class="specs-cell">DHT11</div>
        <div class="specs-cell">温度: 0-50°C ±2°C, 湿度: 20-90% ±5%</div>
        <div class="specs-cell">单总线</div>
      </div>
      <div class="specs-row">
        <div class="specs-cell">振动传感器</div>
        <div class="specs-cell">SW-420</div>
        <div class="specs-cell">常闭型, 灵敏度可调, 振动检测</div>
        <div class="specs-cell">数字输出</div>
      </div>
      <div class="specs-row">
        <div class="specs-cell">六轴运动传感器</div>
        <div class="specs-cell">MPU6050</div>
        <div class="specs-cell">三轴加速度±16g, 三轴陀螺仪±2000°/s</div>
        <div class="specs-cell">I2C</div>
      </div>
      <div class="specs-row">
        <div class="specs-cell">红外寻迹模块</div>
        <div class="specs-cell">TCRT5000</div>
        <div class="specs-cell">检测距离1-25mm, 反射式红外检测</div>
        <div class="specs-cell">数字/模拟输出</div>
      </div>
      <div class="specs-row">
        <div class="specs-cell">实时时钟</div>
        <div class="specs-cell">DS1302</div>
        <div class="specs-cell">秒、分、时、日、月、年计时, 31字节RAM</div>
        <div class="specs-cell">三线SPI</div>
      </div>
      <div class="specs-row">
        <div class="specs-cell">OLED显示屏</div>
        <div class="specs-cell">SSD1306</div>
        <div class="specs-cell">128×64像素, I2C接口, 低功耗</div>
        <div class="specs-cell">I2C</div>
      </div>
      <div class="specs-row">
        <div class="specs-cell">无源蜂鸣器</div>
        <div class="specs-cell">通用型</div>
        <div class="specs-cell">频率1.5-2.5kHz, PWM驱动</div>
        <div class="specs-cell">PWM</div>
      </div>
      <div class="specs-row">
        <div class="specs-cell">RGB彩灯</div>
        <div class="specs-cell">WS2812</div>
        <div class="specs-cell">5V驱动, 全彩RGB, 单线控制</div>
        <div class="specs-cell">单线数字</div>
      </div>
      <div class="specs-row">
        <div class="specs-cell">四位数码管</div>
        <div class="specs-cell">TM1637</div>
        <div class="specs-cell">4位7段显示, 亮度可调</div>
        <div class="specs-cell">二线制</div>
      </div>
    </div>
  </div>

  <!-- 系统架构图 -->
  <div class="architecture-section">
    <h3 class="architecture-title">系统架构图</h3>
    <div class="architecture-diagram">
      <div class="arch-layer">
        <div class="layer-title">数据采集层</div>
        <div class="layer-devices">
          <div class="device-item">SW-420振动传感器</div>
          <div class="device-item">MPU6050六轴传感器</div>
          <div class="device-item">DHT11温湿度传感器</div>
          <div class="device-item">TCRT5000红外模块</div>
        </div>
      </div>
      <div class="arch-arrow">↓</div>
      <div class="arch-layer">
        <div class="layer-title">数据处理层</div>
        <div class="layer-devices">
          <div class="device-item">ESP32主控</div>
          <div class="device-item">数据滤波</div>
          <div class="device-item">特征提取</div>
          <div class="device-item">算法分析</div>
        </div>
      </div>
      <div class="arch-arrow">↓</div>
      <div class="arch-layer">
        <div class="layer-title">预警响应层</div>
        <div class="layer-devices">
          <div class="device-item">无源蜂鸣器</div>
          <div class="device-item">WS2812 RGB灯</div>
          <div class="device-item">预警通知</div>
        </div>
      </div>
      <div class="arch-arrow">↓</div>
      <div class="arch-layer">
        <div class="layer-title">信息展示层</div>
        <div class="layer-devices">
          <div class="device-item">SSD1306 OLED屏</div>
          <div class="device-item">TM1637数码管</div>
          <div class="device-item">Web界面</div>
          <div class="device-item">数据可视化</div>
        </div>
      </div>
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
</template>

<script>
export default {
  name: 'Background',
  data() {
    return {
      cardAnimate: 'hardware-card-animate',
      descAnimate: 'desc-animate'
    }
  },
  mounted() {
    // 页面加载时触发动画
    this.cardAnimate = 'hardware-card-animate active';
    setTimeout(() => {
      this.descAnimate = 'desc-animate active';
    }, 500);
  }
}
</script>

<style scoped>
/* 科技风配色变量 */
:root {
  --primary-color: #165DFF;
  --secondary-color: #0F172A;
  --light-gray: #F8FAFC;
  --text-primary: #1E293B;
  --text-secondary: #64748B;
  --accent-color: #36CFFB;
  --success-color: #00B96B;
  --white: #FFFFFF;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;
  --border-radius: 12px;
  --shadow-base: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 8px 24px rgba(22, 93, 255, 0.15);
}

/* 页面容器 */
.background-container {
  min-height: calc(100vh - 40px);
  padding: var(--spacing-lg) var(--spacing-md);
  background: linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%);
  max-width: 1400px;
  margin: 0 auto;
}

/* 顶部装饰条 */
.top-decoration {
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  border-radius: 2px;
  margin-bottom: var(--spacing-lg);
}

/* 页面标题 */
.page-title {
  text-align: center;
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  position: relative;
  font-family: 'Inter', sans-serif;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.page-title:hover::after {
  width: 120px;
}

/* 硬件网格布局 */
.hardware-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  /* 增加卡片之间的间隔 */
  max-width: 1400px;
  margin: 0 auto var(--spacing-lg);
}

/* 硬件卡片基础样式 */
.hardware-card {
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-base);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* 卡片动画（加载时渐入上浮） */
.hardware-card-animate.active {
  opacity: 1;
  transform: translateY(0);
}

/* 卡片hover效果 */
.hardware-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
}

/* 硬件图标（左上角小图标） */
.hardware-icon {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  width: 36px;
  height: 36px;
  background-color: rgba(22, 93, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 20px;
  height: 20px;
  fill: var(--primary-color);
}

/* 硬件内容布局 */
.hardware-content {
  display: flex;
  gap: var(--spacing-md);
  height: 100%;
}

.hardware-image-container {
  flex: 0 0 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 硬件图片 */
.hardware-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.hardware-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 硬件标题布局 */
.hardware-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: var(--spacing-sm);
}

.title-icon {
  width: 36px;
  height: 36px;
  background-color: rgba(22, 93, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* 移除原来的硬件图标样式 */
.hardware-icon {
  display: none;
}

/* 硬件名称样式调整 */
.hardware-name {
  color: var(--text-primary);
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  /* 移除原来的 margin-bottom */
  font-family: 'Inter', sans-serif;
  line-height: 1.2;
}

/* 硬件描述 */
.hardware-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  flex-grow: 1;
}

/* 硬件规格标签 */
.hardware-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}

.spec-tag {
  background: rgba(22, 93, 255, 0.08);
  color: var(--primary-color);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* 项目描述容器 */
.project-desc-container {
  max-width: 1000px;
  margin: var(--spacing-xl) auto;
  padding: var(--spacing-lg);
  background: linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%);
  /* 与硬件区域背景相同 */
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-base);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  border-left: 4px solid var(--primary-color);
  text-align: center;
  /* 居中文本 */
}

/* 项目描述动画 */
.desc-animate.active {
  opacity: 1;
  transform: translateY(0);
}

.project-desc-content {
  position: relative;
  z-index: 2;
}

/* 项目描述文本 */
.project-desc {
  color: var(--text-primary);
  /* 黑色文本 */
  font-size: 1.2rem;
  line-height: 1.8;
  text-align: center;
  /* 确保文本居中 */
  margin: 0;
  font-weight: 500;
}

/* 强调文本 */
.highlight {
  color: var(--primary-color);
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
  border-radius: 1px;
}

/* 技术规格区域 */
.specs-section {
  margin-top: var(--spacing-xl);
  background: white;
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-base);
  border-left: 4px solid var(--success-color);
}

.specs-title {
  text-align: center;
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  position: relative;
  margin-top: 1rem;
}

.specs-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background-color: var(--success-color);
  border-radius: 2px;
}

.specs-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.specs-row {
  display: table-row;
  transition: background-color 0.2s ease;
}

.specs-row:hover {
  background-color: #f8fafc;
}

.specs-cell {
  display: table-cell;
  padding: 16px;
  border-bottom: 1px solid #e1e5e9;
  vertical-align: middle;
  text-align: center;
}

.specs-header {
  background-color: var(--primary-color);
  color: rgb(0, 0, 0);
  font-weight: 600;
  border-bottom: none;
  text-align: center;
}

.specs-row:last-child .specs-cell {
  border-bottom: none;
}

/* 系统架构区域 */
.architecture-section {
  margin-top: var(--spacing-xl);
  background: white;
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-base);
  border-left: 4px solid var(--accent-color);
}

.architecture-title {
  text-align: center;
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  position: relative;
  margin-top: 1rem;
}

.architecture-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background-color: var(--accent-color);
  border-radius: 2px;
}

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.arch-layer {
  background: var(--light-gray);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  width: 100%;
  max-width: 600px;
  text-align: center;
  box-shadow: var(--shadow-base);
  transition: all 0.3s ease;
}

.arch-layer:hover {
  transform: translateX(8px);
  box-shadow: var(--shadow-hover);
}

.layer-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.layer-devices {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.device-item {
  background: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: var(--text-secondary);
  border: 1px solid #e1e5e9;
}

.arch-arrow {
  font-size: 1.5rem;
  color: var(--primary-color);
  font-weight: bold;
  animation: bounce 2s infinite;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-5px);
  }

  60% {
    transform: translateY(-3px);
  }
}

/* 响应式适配（移动端） */
@media (max-width: 1024px) {
  .hardware-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hardware-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .hardware-card {
    padding: var(--spacing-md);
  }

  .hardware-content {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .hardware-image-container {
    flex: none;
  }

  .hardware-img {
    height: 160px;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .project-desc {
    font-size: 1rem;
  }

  .specs-table {
    display: block;
  }

  .specs-row {
    display: block;
    margin-bottom: 16px;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    overflow: hidden;
  }

  .specs-cell {
    display: block;
    padding: 12px;
    border-bottom: 1px solid #e1e5e9;
  }

  .specs-cell:last-child {
    border-bottom: none;
  }

  .specs-cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--text-primary);
    display: block;
    margin-bottom: 4px;
    font-size: 0.9rem;
  }

  .specs-header {
    display: none;
  }

  .layer-devices {
    flex-direction: column;
    align-items: center;
  }

  .architecture-diagram {
    gap: var(--spacing-sm);
  }

  .arch-layer {
    padding: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .background-container {
    padding: var(--spacing-md) var(--spacing-sm);
  }

  .hardware-grid {
    grid-template-columns: 1fr;
  }

  .project-desc-container {
    padding: var(--spacing-md);
    margin: var(--spacing-lg) auto;
  }

  .specs-section,
  .architecture-section {
    padding: var(--spacing-md);
  }
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
</style>