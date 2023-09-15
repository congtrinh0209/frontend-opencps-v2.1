<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 class="form-script" :class="fullScreenScript ? 'sm3' : 'sm6'">
        <div :class="scriptShow ? '' : 'd-none'">
          <v-toolbar class="toolbar-script" flat height="36" dark color="#222">
            <v-btn class="mr-0" icon @click="formatScript(true)" title="Json viewer">
              <v-icon size="16" :class="formatS === '1' ? 'blue--text' : 'white--text'">format_align_right</v-icon>
            </v-btn>
            <v-btn class="ml-0" icon @click="formatScript(false)" title="String viewer">
              <v-icon size="16" :class="formatS === '-1' ? 'blue--text' : 'white--text'">format_align_left</v-icon>
            </v-btn>
            <v-toolbar-title class="white--text">REPORT PDF</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn round dark small color="blue" @click="scriptShow = false">
              <v-icon size="18" class="white--text">swap_horiz</v-icon> &nbsp; DATA
            </v-btn>
          </v-toolbar>
          <v-jsoneditor class="content-script" ref="editorScript" v-model="formReport" :options="options" :plus="true" height="100%" @error="onError">
        </div>
        <div :class="scriptShow ? 'd-none' : ''">
          <v-toolbar class="toolbar-data" flat height="36" dark color="#222">
            <v-btn class="mr-0" icon @click="formatData(true)" title="Json viewer">
              <v-icon size="16" :class="formatD === '1' ? 'blue--text' : 'white--text'">format_align_right</v-icon>
            </v-btn>
            <v-btn class="ml-0" icon @click="formatData(false)" title="String viewer">
              <v-icon size="16" :class="formatD === '-1' ? 'blue--text' : 'white--text'">format_align_left</v-icon>
            </v-btn>
            <v-toolbar-title class="white--text">Data</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn round dark small color="blue" @click="scriptShow = true">
              <v-icon size="18" class="white--text">swap_horiz</v-icon> &nbsp; Form Report
            </v-btn>
          </v-toolbar>
          <v-jsoneditor class="content-data" ref="editorData" v-model="reportData" :options="options" :plus="true" height="100%" @error="onError">
        </div>
      </v-flex>

      <v-flex xs12 sm4 class="form-report" :class="fullScreenScript ? 'sm9' : 'sm6'">
        <v-toolbar class="toolbar-report" flat height="36" dark color="#222">
          <v-toolbar-title class="white--text">PDF VIEWER</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-btn round dark small color="blue" @click="viewForm"
            :loading="loading"
            :disabled="loading"
          >
            <v-icon size="18" class="white--text">description</v-icon> &nbsp; View form
          </v-btn>
          <v-btn round dark small color="green" @click="viewPdf(false)"
            :loading="loading"
            :disabled="loading"
          >
            <v-icon size="16" class="white--text">fa fa-file-pdf-o</v-icon> &nbsp; View pdf
            <span slot="loader">Loading...</span>
          </v-btn> -->
          <v-btn icon v-if="fullScreenScript" @click="fullScreenScript = !fullScreenScript">
            <v-icon>fullscreen_exit</v-icon>
          </v-btn>
          <v-btn icon v-else @click="fullScreenScript = !fullScreenScript">
            <v-icon>zoom_out_map</v-icon>
          </v-btn>
        </v-toolbar>
        <div>
          <iframe id="pdfPreview" src="" type="application/pdf" width="100%" height="100%" style="overflow: auto;height: 100vh" frameborder="0">
          </iframe>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import Vue from 'vue'
import $ from 'jquery'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
import VJsoneditor from 'v-jsoneditor'
import toastr from 'toastr'
import axios from 'axios'
import { codemirror } from 'vue-codemirror'
import support from '../../store/support.json'

Vue.use(toastr)
Vue.use(VJsoneditor)

export default {
  props: [],
  components: {
    VJsoneditor,
    codemirror
  },
  data: () => ({
    loading: false,
    functionTimeOut:false,
    scriptShow: true,
    formReport: {},
    reportData: {},
    form_report: '',
    formatS: 0,
    formatD: 0,
    fullScreenScript: false,
    fullScreenData: false,
    dialog: false,
    viewFormInput: true, 
    options: {
      mode: 'code'
    },
    cmOptions: {
      tabSize: 4,
      mode: 'text/javascript',
      theme: 'base16-light',
      lineNumbers: true,
      line: true
    }
  }),
  computed: {
  },
  created () {
    var vm = this
    vm.$nextTick(function () {
      vm.formReport = support.sampleReport
    })
  },
  updated () {
    var vm = this
    vm.$nextTick(function () {
    })
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
    },
    formReport (val) {
      let vm = this
      if (vm.functionTimeOut) {
        clearTimeout(vm.functionTimeOut)
      }
      vm.functionTimeOutApplicant = setTimeout(function () {
        vm.generatePdf()
      }, 1000)
    }
  },
  methods: {
    formatScript (active) {
      let vm = this
      // console.log('editorScript', vm.$refs.editorScript)
      if (active) {
        vm.formatS = '1'
        vm.$refs.editorScript.editor.format()
      } else {
        vm.formatS = '-1'
        vm.$refs.editorScript.editor.compact()
      }
    },
    formatData (active) {
      let vm = this
      if (active) {
        vm.formatD = '1'
        vm.$refs.editorData.editor.format()
      } else {
        vm.formatD = '-1'
        vm.$refs.editorData.editor.compact()
      }
    },
    generatePdf() {
      let vm = this
      let pdfDocGenerator = pdfMake.createPdf(vm.formReport)
      pdfDocGenerator.getBlob((blob) => {
        vm.pdfBlob = window.URL.createObjectURL(blob)
        document.getElementById('pdfPreview').src = vm.pdfBlob
      })
    },
    viewForm () {
      let vm = this
      let formScript, formData
      /* eslint-disable */
      try {
        formScript =  eval('(' + vm.$refs.editorScript.editor.getText() + ')')
      } catch (error) {
        formScript = {}
        toastr.error('Lỗi form script!')
        console.log('formScript emty or error parse')
        return
      }
      formData = {}
      /* eslint-disable */
      try {
        formScript.data = vm.$refs.editorData.editor.get()
        vm.viewFormInput = true
        vm.dialog = true
        setTimeout(function () {
          window.$('#formInput').empty()
          window.$('#formInput').alpaca(formScript)
        }, 200)
      } catch (error) {
        formScript.data = {}
        console.log('formData emty or error parse')
        if (vm.$refs.editorData.editor.getText() === '') {
          vm.viewFormInput = true
          vm.dialog = true
          setTimeout(function () {
            window.$('#formInput').empty()
            window.$('#formInput').alpaca(formScript)
          }, 200)
        }
      }
      
    },
    viewPdf (t) {
      let vm = this
      if (vm.form_report === '') {
        return
      }
      var formData = {}
      try {
        if (t) {
          let control = window.$('#formInput').alpaca('get')
          formData = control.getValue()
        } else {
          formData = vm.$refs.editorData.editor.getText() ? vm.$refs.editorData.editor.get() : {}
        }
      } catch (error) {
        if (vm.$refs.editorData.editor.getText()) {
          console.log('formData error')
          return
        }
      }
      vm.loading = true
      let options = {
        headers: {
          groupId: window.themeDisplay ? window.themeDisplay.getScopeGroupId() : '',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'blob'
      }
      if (!formData) {
        formData = {}
      }
      let dataCreate = new URLSearchParams()
      dataCreate.append('scriptStr', vm.form_report)
      dataCreate.append('jsonDataStr', JSON.stringify(formData))
      axios.post('/o/rest/v2/jaspers/preview', dataCreate, options).then(function (response) {
        vm.loading = false
        vm.dialog = true
        vm.viewFormInput = false
        console.log('respond create pdf', response.data)
        let serializable = response.data
        let file = window.URL.createObjectURL(serializable)
        setTimeout(() => {
          document.getElementById('pdfPreview').src = file
        }, 200)
      }).catch(function (response) {
        vm.loading = false
        console.log('respond create pdf 2', response)
      })
    },
    closeDialog () {
      let vm = this
      try {
        let control = window.$('#formInput').alpaca('get')
        let formData = control.getValue()
        if (formData) {
          vm.reportData = formData
        }
      } catch (error) {
      }
      vm.dialog = false
    },
    onError () {}
  }
}
</script>
