<template>
  <v-layout row wrap class="text-center" style="position: relative;">
    <v-flex xs12 style="position:relative" class="control-section uploader file-preview py-0">
      <div class="control_wrapper">
        <div id="dropAreaForm">
          <span id="drop" class="droparea" style="display: none;" > Kéo thả tệp tin hoặc <a href="javascript:;" id="browseForm" style="
              right: 20px;
              color: #0064c7;
              position: absolute;
              text-decoration: none;
              font-weight: 700;
          ">Chọn từ máy tính &nbsp; 📤</a></span>
          <ejs-uploader name="UploadFiles" :allowedExtensions= 'extensions' :asyncSettings= "path" ref="uploadObj" :dropAreaForm= "dropAreaForm" :success= "onSuccess" :removing= "onFileRemove" :uploading= "addHeaders">
          </ejs-uploader>
        </div>
        <div class="e-upload-done-list" v-if="fileTotal > 0">
          <ul class="e-upload-files">
            <li class="e-upload-file-list">
              <div class='container py-2' style="position: relative;">
                <span class='wrapper layout row wrap' style="
                  line-height: 10px;
                ">
                <span :class="['icon sf-icon-txt']"></span>
                <div class='name file-name fileNameForm' style="
                      line-height: 42px;
                      padding-left: 10px;
                  ">
                  File cấu hình FORM
                </div>
                <v-btn flat icon color="primary" v-if="!formScriptIdDeliverableType"
                  :href="avatarData"
                  target="_blank"
                  :loading="loading"
                  :disabled="loading"
                  style="
                    position: absolute;
                    right: 5px;
                    top: 8px;
                  ">
                  <v-icon size="14">link</v-icon>
                </v-btn>
                <v-btn flat icon color="primary" v-else
                  @click="loadFile(formScriptIdDeliverableType)"
                  :loading="loading"
                  :disabled="loading"
                  style="
                    position: absolute;
                    right: 5px;
                    top: 8px;
                  ">
                  <v-icon size="14">link</v-icon>
                </v-btn>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  /* eslint-disable */
  import {
    UploaderPlugin
  } from '@syncfusion/ej2-vue-inputs'
  import {
    detach
  } from '@syncfusion/ej2-base'
  /* eslint-disable */
  Vue.use(UploaderPlugin)
  
  export default {
    data() {
      return {
        fileTotal: 0,
        noAvatar: true,
        avatarData: '',
        loadingRemove: false,
        loading: false,
        fileTemplateData: [],
        fileTemplateTotal: 0,
        path: {
          saveUrl: '',
          removeUrl: ''
        },
        extensions: '.txt',
        dropAreaForm: "dropAreaForm",
        rawData: [],
        className: '',
        formScriptIdDeliverableType: ''
      }
    },
    props: ['pickItem', 'pk', 'code'],
    created() {
      var vm = this
      vm.$nextTick(function() {
        this.loadImageComponent()
      })
    },
    mounted: function() {
      this.path = {
        saveUrl: this.pickItem['upload_api'] + 'FORM/' + this.pk,
        removeUrl: this.pickItem['remove_api'] + 'FORM/' + this.pk,
      }
      this.className = this.pickItem['class_name']
      document.getElementById('browseForm').onclick = function() {
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        return false;
      }
    },
    methods: {
      addHeaders(args) {
        let vm = this
        args.currentRequest.setRequestHeader('Token', vm.getAuthToken())
        args.currentRequest.setRequestHeader('groupId', vm.getScopeGroupId())
      },
      loadImageComponent() {
        let vm = this
        vm.fileTotal = 0
        if (vm.code === 'opencps_deliverabletype') {
          let textPost = {
            'type': 'admin',
            'cmd': 'get',
            'code': 'opencps_deliverabletype',
            'respone': 'detail',
            'responeType': 'detail',
            'filter': [
              {
                'key': 'id',
                'value_filter': vm.pk,
                'compare': '=',
                'type': 'number'
              }
            ]
          }
          let dataPost = new URLSearchParams();
          dataPost.append('text', JSON.stringify(textPost))
          axios.post('/o/rest/v2/socket/web', dataPost, {}).then(function (response) {
            let dataObj = response.data['detail'][0]
            vm.formScriptIdDeliverableType = dataObj['formScriptFileId']
            if (vm.formScriptIdDeliverableType) {
              vm.fileTotal = 1
            }
          }).catch(function (error) {
          })
        } else {
          let filter = {
            pk: vm.pk,
            className: vm.className
          }
          vm.noAvatar = true
          vm.avatarData = ''
          vm.$store.dispatch('getImageComponent', filter).then(function (data) {
            if (data !== '' && data !== null) {
              vm.noAvatar = false
              let portalURL = ''
              if (window.themeDisplay !== null && window.themeDisplay !== undefined) {
                portalURL = themeDisplay.getPortalURL()
              }
              vm.avatarData = portalURL + data
              vm.fileTotal = 1
            }
          })
        }
      },
      onSuccess: function() {
        setTimeout(() => {
          document.getElementById('dropAreaForm').querySelectorAll(".e-upload-success").forEach(e => e.parentNode.removeChild(e))
          $(".fileNameForm").html($('#dropAreaForm .e-file-select input')[0].files[0]['name'])
          // this.loadImageComponent()
        }, 2000)
      },
      onFileRemove: function(args) {
        args.postRawFile = false
      },
      loadFile(id) {
        let vm = this
        
      }
    }
  }
</script>
