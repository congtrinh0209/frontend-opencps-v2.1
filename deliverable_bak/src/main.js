import Vue from 'vue'
import './stylus/app.styl'
import './stylus/jexcel.css'
import './stylus/ej2base.css'
import './stylus/ej2upload.css'
import App from './App'
import router from './router'
import { store } from './store'
import VueNativeSock from 'vue-native-websocket'
import VueContentPlaceholders from 'vue-content-placeholders'
import { UploaderPlugin } from '@syncfusion/ej2-vue-inputs'
import axios from 'axios'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  theme: {
    primary: '#212121',
    secondary: '#424242',
    accent: '#459fed',
    error: '#ff8e8e',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.use(UploaderPlugin)
Vue.use(VueContentPlaceholders)

let groupId = window.themeDisplay !== undefined ? window.themeDisplay.getScopeGroupId() : 0
let companyId = window.themeDisplay !== undefined ? window.themeDisplay.getCompanyId() : 0
let userId = window.themeDisplay !== undefined ? window.themeDisplay.getUserId() : 0
let userName = window.themeDisplay !== undefined ? window.themeDisplay.getUserName() : ''
let portalURL = (window.themeDisplay !== undefined )? window.themeDisplay.getPortalURL().replace('http://', '') : 'localhost:8080'
let token = window.themeDisplay !== undefined ? window.Liferay.authToken : ''
let portalURLSock = portalURL.indexOf(':') > 0 ? portalURL.substr(0, portalURL.indexOf(':')) : portalURL

Vue.use(VueNativeSock, 'ws://' + portalURLSock + ':8080/o/v1/socket/web?groupId='+ groupId
  + '&portalURL=' + portalURL
  + '&companyId=' + companyId
  + '&userId=' + userId
  + '&userName=' + userName
  + '&Token=' + token, 
  {
    store: store,
    format: 'json',
    reconnection: true
  }
)

axios.defaults.headers.common['Token'] = window.Liferay !== undefined ? window.Liferay.authToken : ''
axios.defaults.headers.common['groupId'] = groupId

Vue.config.productionTip = true

Vue.mixin({
  methods: {
    getScopeGroupId: function () {
      if (window.themeDisplay !== null && window.themeDisplay !== undefined) {
        return window.themeDisplay.getScopeGroupId()
      } else {
        return 0
      }
    },
    getAuthToken: function () {
      if (window.themeDisplay !== null && window.themeDisplay !== undefined) {
        return window.Liferay.authToken
      } else {
        return ''
      }
    },
    getUserId: function () {
      if (window.themeDisplay !== null && window.themeDisplay !== undefined) {
        return window.themeDisplay.getUserId()
      } else {
        return 0
      }
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    var vm = this
    vm.$nextTick(function() {
      if (window.location.href.endsWith('#/')) {
        vm.$router.push('/danh-sach-giay-to/0')
      }
      vm.$store.dispatch('getDeliverableTypes')
    })
  }
})
