import intelSecurity from './router-maps/intel-security'
import operationOverview from './router-maps/operation-overview'
import notification from './router-maps/notification'
export default {
  // 运营总览
  ...operationOverview,
  // 智能安防
  ...intelSecurity,
  ...notification
}
