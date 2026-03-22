import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Background from '../views/Background.vue'
import DataVisualization from '../views/DataVisualization.vue'
import DataTable from '../views/DataTable.vue'
import DataDashboard from '@/components/DataDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '地震监测预警系统 - 首页'
    }
  },
  {
    path: '/background',
    name: 'Background',
    component: Background,
    meta: {
      title: '项目背景与硬件说明'
    }
  },
  {
    path: '/data-visualization',
    name: 'DataVisualization',
    component: DataVisualization,
    meta: {
      title: '数据可视化展示'
    }
  },
  {
    path: '/data-table',
    name: 'DataTable',
    component: DataTable,
    meta: {
      title: '传感器数据表格'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DataDashboard,
    meta: {
      title: '数据可视化大屏'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '地震监测预警系统'
  next()
})

export default router