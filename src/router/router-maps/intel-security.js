export default {
  'intel-security/access-control': {
    name: 'AccessControl',
    component: () => import('@/views/intel-security/access-control')
  },
  'intel-security/video-monitor': {
    name: 'VideoMonitor',
    component: () => import('@/views/intel-security/video-monitor')
  }
}
