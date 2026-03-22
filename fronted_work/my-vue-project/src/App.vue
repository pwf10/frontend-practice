<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="navbar-container">
        <!-- 品牌标识 -->
        <div class="brand">
          <router-link to="/">
            <span class="brand-icon">🌍</span>
            Earthquake Monitoring System
          </router-link>
        </div>
        
        <!-- Logo 区域 - 靠左放置 -->
        <div class="logo-section">
          <div class="logo-container">
            <img src="@/assets/images/logos/logo1.png" alt="合作单位1" class="nav-logo">
            <img src="@/assets/images/logos/logo2.svg" alt="合作单位2" class="nav-logo">
            <img src="@/assets/images/logos/logo3.svg" alt="合作单位3" class="nav-logo">
          </div>
        </div>
        
        <!-- 导航链接 -->
        <div class="nav-links">
          <router-link to="/" class="nav-link">
            <span class="nav-icon">🏠</span>
            首页
          </router-link>
          <router-link to="/background" class="nav-link">
            <span class="nav-icon">🔧</span>
            项目详情
          </router-link>
          <router-link to="/data-visualization" class="nav-link">
            <span class="nav-icon">📊</span>
            数据可视化
          </router-link>
          <router-link to="/data-table" class="nav-link">
            <span class="nav-icon">📋</span>
            数据表
          </router-link>
          <router-link to="/dashboard" class="nav-link">
            <span class="nav-icon">📺</span>
             数据大屏
            </router-link>
        </div>
      </div>
    </nav>
    
    <!-- 路由视图 -->
    <div class="content-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Inter', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: #f8fafc;
}

.navbar {
  background: linear-gradient(135deg, #165DFF 0%, #0A2463 100%);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.brand {
  padding: 20px 0;
}

.brand a {
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.brand a:hover {
  transform: translateY(-2px);
}

.brand-icon {
  font-size: 24px;
}

/* Logo区域样式 - 靠左放置，在品牌标识后 */
.logo-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}

.logo-container {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-logo {
  height: 32px; /* 统一Logo高度 */
  width: auto; /* 保持宽高比 */
  opacity: 0.9;
  transition: all 0.3s ease;
  /* 显示Logo原色 */
}

.nav-logo:hover {
  opacity: 1;
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 4px;
  margin-left: auto; /* 导航链接靠右 */
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 15px;
  padding: 18px 20px;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  margin: 0 2px;
}

.nav-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.nav-icon {
  font-size: 16px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background-color: #4DD0E1;
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover::after {
  width: 80%;
}

/* 激活路由的高亮样式 */
.nav-link.router-link-exact-active {
  color: white;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-exact-active::after {
  width: 80%;
}

/* 内容区样式 */
.content-container {
  padding: 0;
  min-height: calc(100vh - 68px);
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .logo-container {
    gap: 15px;
  }
  
  .nav-logo {
    height: 28px;
  }
}

@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    padding: 16px;
  }
  
  .brand {
    padding: 10px 0;
  }
  
  .brand a {
    font-size: 18px;
  }
  
  .logo-section {
    order: 2; /* 在小屏幕上将Logo移到品牌标识后，导航链接前 */
    width: 100%;
    margin: 10px 0 0 0;
    justify-content: center;
  }
  
  .navbar-container {
    flex-wrap: wrap;
  }
  
  .logo-container {
    justify-content: center;
    gap: 20px;
  }
  
  .nav-logo {
    height: 24px;
  }
  
  .nav-links {
    order: 3; /* 导航链接放在最下方 */
    width: 100%;
    justify-content: center;
    margin: 8px 0 0 0;
    flex-wrap: wrap;
  }
  
  .nav-link {
    padding: 12px 16px;
    font-size: 14px;
  }
  
  .content-container {
    padding: 0;
  }
}

@media (max-width: 480px) {
  .logo-container {
    gap: 10px;
  }
  
  .nav-logo {
    height: 20px;
  }
  
  .nav-links {
    gap: 2px;
  }
  
  .nav-link {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  .brand a {
    font-size: 16px;
  }
}
</style>