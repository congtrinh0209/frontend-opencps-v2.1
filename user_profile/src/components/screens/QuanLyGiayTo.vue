<template>
  <div style="max-width: 1300px; margin: 0px auto;">
    <v-card>
      <div class="row-header no__hidden_class">
        <div class="background-triangle-big">
          <span>QUẢN LÝ KHO TÀI LIỆU</span>
        </div>
        <div class="layout row wrap header_tools row-blue">
          <div class="flex xs4 sm2 text-right" style="margin-left: auto;">
            <v-btn flat class="my-0 mx-0 btn-border-left" @click="goBack" active-class="temp_active">
              <v-icon size="18">reply</v-icon> &nbsp;
              Quay lại
            </v-btn>
          </div>
        </div> 
      </div>
      <v-card-text class="px-0 pt-0 mt-3">
        <v-layout wrap class="mt-0">
          <!-- <v-flex xs12 sm6 class="pr-2">
            <v-autocomplete
              :items="fileTemplateList"
              v-model="fileTemplateNo"
              label="Chọn loại tài liệu"
              item-text="name"
              item-value="fileTemplateNo"
              :hide-selected="true"
              clearable
              @change="changeFilterSearch"
              box
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm6 class="pr-0">
            <v-autocomplete
              :items="statusList"
              v-model="status"
              label="Chọn tình trạng"
              item-text="text"
              item-value="value"
              :hide-selected="true"
              clearable
              @change="changeFilterSearch"
              box
            ></v-autocomplete>
          </v-flex> -->
          <v-flex xs12 sm6 class="pr-2">
            <v-text-field
              label="Tìm theo tên tài liệu"
              v-model="keySearch"
              @keyup.enter="changeFilterSearch"
              append-icon="search"
              box
              clear-icon="clear"
              clearable
              @click:clear="changeFilterSearch"
              @click:append="changeFilterSearch"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 class="">
            <v-text-field
              label="Tìm theo mã tài liệu"
              v-model="fileNoSearch"
              @keyup.enter="changeFilterSearch"
              append-icon="search"
              box
              clear-icon="clear"
              clearable
              @click:clear="changeFilterSearch"
              @click:append="changeFilterSearch"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-flex style="width: 100%;height:32px">
          <v-btn class="mx-0 my-0 right" color="primary" dark @click.native="showCreatedocument">
            <v-icon size="18">add</v-icon> &nbsp; Thêm tài liệu
          </v-btn>
        </v-flex>
        <v-data-table
          :headers="documentListHeader"
          :items="documentApplicantList"
          hide-actions
          class="table-landing table-bordered mt-2"
          style="border-left: 1px solid #dedede"
        >
          <template slot="items" slot-scope="props">
            <tr v-bind:class="{'active': props.index%2==1}" style="cursor: pointer;">
              <td class="text-xs-center" style="width:50px;height:36px">
                <content-placeholders v-if="loadingTable">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <div v-else>
                  <span>{{ documentPage * numberPerPage - numberPerPage + props.index + 1 }}</span>
                </div>
              </td>
              <td class="text-xs-left" style="height:36px; min-width:450px">
                <content-placeholders v-if="loadingTable">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <div v-else>
                  <span>{{props.item.hasOwnProperty('fileName') ? props.item.fileName : ''}}</span>
                </div>
              </td>
              <td class="text-xs-left" style="height:36px;min-width:150px">
                <content-placeholders v-if="loadingTable">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <div v-else>
                  <span>{{props.item.hasOwnProperty('fileNo') ? props.item.fileNo : ''}}</span>
                </div>
              </td>
              <td class="text-xs-left" style="height:36px;min-width:120px">
                <content-placeholders v-if="loadingTable">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <div v-else>
                  <span>{{props.item.hasOwnProperty('fileExtension') ? props.item.fileExtension : ''}}</span>
                </div>
              </td>
              <td class="text-xs-left" style="height:36px; min-width:150px">
                <content-placeholders v-if="loadingTable">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <div v-else>
                  <span>{{props.item.hasOwnProperty('createDate') ? props.item.createDate : ''}}</span>
                </div>
              </td>
              <td class="text-xs-center" style="height:36px;width:135px">
                <content-placeholders v-if="loadingTable">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <div v-else>
                  <span :style="props.item.status === 1 ? 'color: green' : (props.item.status === 2 ? 'color: red' : 'color: orange')">
                    {{props.item.hasOwnProperty('status') ? getStatus(props.item.status) : ''}}
                  </span>
                </div>
              </td>
              <td class="text-xs-center" style="height:36px;width: 200px">
                <content-placeholders v-if="loadingTable">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-tooltip top v-if="!loadingTable" class="mr-2">
                  <v-btn @click="viewDocument(props.item)" color="blue" slot="activator" flat icon class="mx-0 my-0">
                    <v-icon>visibility</v-icon>
                  </v-btn>
                  <span>Xem</span>
                </v-tooltip>
                <v-tooltip top v-if="!loadingTable" class="mr-2">
                  <v-btn @click="downloadDocument(props.item)" color="blue" slot="activator" flat icon class="mx-0 my-0">
                    <v-icon>fas fa fa-download</v-icon>
                  </v-btn>
                  <span>Tải xuống</span>
                </v-tooltip>
                <v-tooltip top v-if="!loadingTable && props.item.status == 0" class="mr-2">
                  <v-btn @click="showEditDocument(props.item)" color="green" slot="activator" flat icon class="mx-0 my-0">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <span>Chỉnh sửa</span>
                </v-tooltip>
                <v-tooltip top v-if="!loadingTable && props.item.status == 0">
                  <v-btn @click="deleteDocument(props.item)" color="green" slot="activator" flat icon class="mx-0 my-0 mr-3">
                    <v-icon size="22">delete</v-icon>
                  </v-btn>
                  <span>Xóa</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
          <template slot="no-data">
            <div class="text-xs-center mt-2">
              Không có tài liệu
            </div>
          </template>
        </v-data-table>

        <div class="my-2" v-if="totalDocument > numberPerPage">
          <div class="text-xs-right layout wrap" style="position: relative;">
            <div class="flex pagging-table"> 
              <tiny-pagination :total="totalDocument" :page="documentPage" :numberPerPage="numberPerPage" nameRecord="tài liệu" custom-class="custom-tiny-class" 
                @tiny:change-page="changePage" ></tiny-pagination> 
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog_createDocument" scrollable persistent max-width="900px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{typeCreate === 'create' ? 'Thêm mới tài liệu' : 'Cập nhật tài liệu'}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialog_createDocument = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="py-1">
          <v-form ref="form" v-model="valid" lazy-validation class="px-0 grid-list">
            <v-layout row wrap class="px-0 py-3">
              <!-- <v-flex xs12 class="pr-2">
                <v-autocomplete
                  :items="fileTemplateList"
                  v-model="fileTemplateNoCreate"
                  item-text="name"
                  item-value="fileTemplateNo"
                  return-object
                  :hide-selected="true"
                  box
                  :rules="[v => !!v || 'Loại tài liệu là bắt buộc']"
                  required
                >
                  <template slot="label"> 
                    <span>Loại tài liệu</span>
                    <span class="red--text darken-3"> (*)</span>
                  </template>  
                </v-autocomplete>
              </v-flex> -->
              
              <v-flex xs12 class="">
                <v-text-field
                  v-model="fileName"
                  box
                  clearable
                  :rules="[v => !!v || 'Tên tài liệu là bắt buộc']"
                  required
                >
                  <template slot="label"> 
                    <span>Tên tài liệu</span>
                    <span class="red--text darken-3"> (*)</span>
                  </template> 
                </v-text-field>
              </v-flex>
              <v-flex xs12 class="">
                <v-text-field
                  label="Mã tài liệu"
                  v-model="fileNo"
                  box
                  clearable
                  :rules="[v => !!v || 'Mã tài liệu là bắt buộc']"
                  required
                >
                  <template slot="label"> 
                    <span>Mã tài liệu</span>
                    <span class="red--text darken-3"> (*)</span>
                  </template> 
                </v-text-field>
              </v-flex>
              <v-flex xs12 class="mt-2">
                <div v-if="fileNameView" class="mb-3">
                  <v-icon size="18" color="#004b94">attach_file</v-icon>
                  <span class="ml-2" style="font-style: italic">{{fileNameView}}</span>
                </div>
                <input type="file" id="documentFile" @input="uploadDocumentFile($event)" style="display:none">
              </v-flex>
              <v-flex xs12 md6 class="mt-2 pr-2">
                <v-btn block color="primary" class="mx-0" dark @click.native="uploadFile" style="height: 42px;">
                  <v-icon size="20">fas fa fa-upload</v-icon> &nbsp; &nbsp;
                  Tải lên giấy tờ
                </v-btn>
                <div>
                  <span style="color:red">(*) </span>
                  <span v-if="fileTemplateNoCreate && fileTemplateNoCreate.fileType">File tải lên chấp nhận các định dạng: {{fileTemplateNoCreate.fileType}} .</span>
                  <span>Dung lượng tải lên tối đa {{fileTemplateNoCreate && fileTemplateNoCreate.size ? fileTemplateNoCreate.size : maxFileSize}}MB.</span>
                </div>
              </v-flex>
              <v-flex xs12 md6 class="mt-2 pl-2">
                <v-btn block color="primary" class="mx-0" dark @click.native="uploadFile" style="height: 42px;">
                  <v-icon size="20">border_color</v-icon> &nbsp; &nbsp;
                  Tải lên và ký số giấy tờ
                </v-btn>
              </v-flex>
              <div class="flex xs12">
                <span style="color:red">(*) </span>
                <span v-if="fileTemplateNoCreate && fileTemplateNoCreate.fileType">File tải lên chấp nhận các định dạng: {{fileTemplateNoCreate.fileType}} .</span>
                <span>Dung lượng tải lên tối đa {{fileTemplateNoCreate && fileTemplateNoCreate.size ? fileTemplateNoCreate.size : maxFileSize}}MB.</span>
              </div>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions class="mx-3">
          <v-spacer></v-spacer>
          <v-btn class="mr-2" color="primary" :disabled="loadingAction" @click.native="dialog_createDocument = false">
            <v-icon>clear</v-icon> &nbsp;
            Thoát
          </v-btn>
          <v-btn v-if="typeCreate === 'create'" class="mr-0" color="primary" 
            :disabled="loadingAction"
            @click.native="createDocument"
          >
            <v-icon>save</v-icon> &nbsp;
            <span>Thêm tài liệu</span> 
          </v-btn>
          <v-btn v-else :disabled="loadingAction" class="mr-0" color="primary" @click.native="updateDocument">
            <v-icon>save</v-icon> &nbsp;
            <span>Cập nhật tài liệu</span> 
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogPDF" max-width="1200" transition="fade-transition">
      <v-card>
        <v-toolbar flat dark color="primary">
          <v-toolbar-title>Tài liệu đính kèm</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialogPDF = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <iframe id="dialogPDFPreview" src="" type="application/pdf" width="100%" height="100%" style="overflow: auto;min-height: 600px;" frameborder="0">
        </iframe>
      </v-card>
    </v-dialog>
    <!-- ký số điện tử -->
    <v-dialog
      v-model="dialogInputMobile"
      max-width="550"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title style="font-size: 14px">KÝ SỐ SỬ DỤNG CHỮ KÝ SỐ CÔNG CỘNG</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="dialogInputMobile = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="px-0 pb-0">
          <v-layout wrap>
            <v-flex xs12 class="px-3" style="cursor: pointer">
              <div>Chọn nhà cung cấp : <span style="color: red"> (*)</span></div>
              <v-autocomplete
                :items="dsCungCapCA"
                hide-no-data
                v-model="donViCapCA"
                item-text="name"
                item-value="value"
                box
                class="my-2"
              ></v-autocomplete>
              <div>Mã số thuế / Số CMND/CCCD, hộ chiếu<span style="color: red"> (*)</span>:</div>
              <v-text-field class="mt-2"
                v-model="userIdMySign"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="text-xs-center mb-3">
              <v-btn :loading="loadingAction" :disabled="loadingAction" class="mr-0" style="width: 100px" color="primary" @click="getCertMySign()" >
                <v-icon>save</v-icon> &nbsp;
                Xác nhận
              </v-btn>
            </v-flex>
            <v-flex xs12 class="px-3 mb-4" v-if="listCertMySign.length">
              <div style="display: flex;align-items: center;">
                <v-icon size="20" color="#5a770d" class="mr-2">double_arrow</v-icon>
                <span style="text-transform: uppercase; color: #5a770d;font-weight: 500; font-size: 14px;">Chọn chứng thư số:</span>
              </div>
              <v-flex class="py-2 mt-2" v-for="(item, index) in listCertMySign" :key="index" xs12 
                style="border: 1px dotted #5a770d; background: #5a770d24;"
                @click="submitMySign(item)"
              >
                <p style="cursor: pointer !important;text-decoration: underline;padding-left: 15px;margin-bottom: 0px;">
                  <v-icon class="mr-2" size="18">edit</v-icon>
                  <span style="font-size: 14px;">{{item.cert_id}}</span>
                </p>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--  -->
    <div style="display:none">
      <a id="downloadFile" :href="srcDownload" download></a>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import toastr from 'toastr'
import axios from 'axios'
import $ from 'jquery'
import TinyPagination from './Pagination.vue'
Vue.use(toastr)
export default {
  props: ['index'],
  components: {
    'tiny-pagination': TinyPagination
  },
  data: () => ({
    dialogInputMobile: false,
    loadingAction: false,
    userIdMySign: '',
    dsCungCapCA: [
      {name: 'Viettel CA', value: 'Viettel-CA'},
      {name: 'VNPT CA', value: 'VNPT-CA'},
      {name: 'FPT CA', value: 'FPT-CA'},
      {name: 'BKAV CA', value: 'BkavCA'},
      {name: 'Nacencom', value: 'CA2'},
      {name: 'MISA CA', value: 'MISA-CA'}
    ],
    donViCapCA: '',
    certSelected: '',
    dialogChoKySoBatDongBo: false,
    fileKySo: '',
    applicantInfos: '',
    nameTitle: '',
    creditTitle: '',
    documentApplicantList: '',
    totalDocument: 0,
    documentPage: 1,
    numberPerPage: 15,
    statusList: [
      {text: 'Chưa duyệt', value: 0},
      {text: 'Có hiệu lực', value: 1},
      {text: 'Hết hiệu lực', value: 2}
    ],
    status: '',
    statusCreate: '',
    fileTemplateNoCreate: '',
    fileTemplateList: [],
    fileTemplateNo: '',
    fileName: '',
    fileNo: '',
    fileUpdate: '',
    fileNameUpdate: '',
    fileNoSearch: '',
    keySearch: '',
    dialog_createDocument: false,
    updateFile: false,
    loadingAction: false,
    loadingTable: false,
    dialogPDF: false,
    valid: false,
    documentListHeader: [
      {
        text: 'STT',
        align: 'center',
        sortable: false
      },
      {
        text: 'Tên tài liệu',
        align: 'center',
        sortable: false
      },
      {
        text: 'Mã số',
        align: 'center',
        sortable: false
      },
      {
        text: 'Định dạng',
        align: 'center',
        sortable: false
      },
      {
        text: 'Ngày tạo',
        align: 'center',
        sortable: false
      },
      {
        text: 'Tình trạng',
        align: 'center',
        sortable: false
      },
      {
        text: 'Thao tác',
        align: 'center',
        sortable: false
      }
    ],
    maxFileSize: 100,
    typeCreate: 'create',
    documentSelect: '',
    fileNameView: '',
    srcDownload: ''
  }),
  computed: {
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      let vm = this
      let currentParams = newRoute.params
      let currentQuery = newRoute.query
    }
  },
  created () {
    let vm = this
    try {
      vm.maxFileSize = maxFileSizeConfig
    } catch (error) {
    }
    vm.$nextTick(function () {
      let current = vm.$router.history.current
      let query = vm.$router.history.current.query
      let applicant = vm.$store.getters.getApplicantInfos
      vm.getApplicantDocument()
      vm.getFileItems()
    })
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    getCertMySign () {
      let vm = this
      if (String(vm.userIdMySign).trim()) {
        let user = {
          user_id: String(vm.userIdMySign).trim(),
          ca_name: vm.donViCapCA,
          serial_number: ''
        }
        vm.loadingAction = true
        vm.$store.dispatch('getCertMySign', user).then(res => {
          vm.loadingAction = false
          vm.listCertMySign = []
          try {
            vm.listCertMySign = res.data.user_certificates
          } catch (error) {
          }
          if (!vm.listCertMySign.length) {
            toastr.error('Không có thông tin chứng thư số')
          }
        }).catch(function () {
          vm.loadingAction = false
          toastr.error('Không có thông tin chứng thư số')
        })
      }  
    },
    submitMySign (item) {
      let vm = this
      vm.certSelected = item
      if (vm.loadingAction) {
        return;
      }
      let dataInsertSignature = {
        "user_id": String(vm.userIdMySign).trim(),
        "ca_name": vm.donViCapCA,
        "serial_number": item.serial_number,
        "dossierId": vm.fileKySo.dossierId,
        "referenceUid": vm.fileKySo.referenceUid,
        "cert_data": item.cert_data
      }
      vm.loadingAction = true
      toastr.success('Yêu cầu đã được gửi. Vui lòng thực hiện ký số trên thiết bị.')
      vm.dialogChoKySoBatDongBo = true
      vm.dialogInputMobile = false
      vm.$store.dispatch('signatureMySign', dataInsertSignature).then(res => {
        vm.loadingAction = false
        let dataUpdateFile = {
          fileEntryIdStr: res ? res['fileEntryIdStr'] : '',
          dossierFileIdStr: vm.fileKySo.dossierFileId
        }
        vm.$store.dispatch('updateSignatureVtCa', dataUpdateFile).then(res => {
          toastr.clear()
          toastr.success('Thực hiện ký số thành công')
          vm.dialogChoKySoBatDongBo = false
          // vm.$store.dispatch('loadDossierFiles', vm.thongTinHoSo.dossierId).then(resFiles => {
          //   vm.dossierFilesItems = resFiles
          // }).catch(reject => {
          // })
        }).catch(function() {
          toastr.error('Lỗi trong quá trình cập nhật tài liệu ký số')
          vm.dialogChoKySoBatDongBo = false
        })
      }).catch(function () {
        vm.loadingAction = false
        vm.dialogChoKySoBatDongBo = false
        toastr.error('Gửi yêu cầu ký số thất bại')
      })
    },
    getApplicantInfos () {
      let vm = this
      let filter = {
        applicantId: vm.index
      }
      vm.$store.dispatch('getApplicantInfos', filter).then(function (result) {
        vm.applicantInfos = result
        vm.getApplicantType(vm.applicantInfos)
      }).catch(function () {
      })
    },
    getApplicantDocument () {
      let vm = this
      let param = {
        headers: {
          groupId: window.themeDisplay.getScopeGroupId()
        }
      }
      let params = {
        start: vm.documentPage * vm.numberPerPage - vm.numberPerPage,
        end: vm.documentPage * vm.numberPerPage,
        applicantIdNo: vm.index,
        fileTemplateNo: vm.fileTemplateNo,
        status: vm.status,
        keyword: vm.keySearch,
        fileNo: vm.fileNoSearch,
        applicantDataType: ''
      }
      let dataPost = new URLSearchParams()
      let textPost = params
      dataPost.append('method', 'GET')
      dataPost.append('url', '/applicantdatas')
      dataPost.append('data', JSON.stringify(textPost))
      dataPost.append('serverCode', 'SERVER_MOTCUA')
      vm.loadingTable = true
      axios.post('/o/rest/v2/proxy', dataPost, param).then(function (response) { 
        if (response['data'].hasOwnProperty('data')) {
          if (Array.isArray(response['data']['data'])) {
            vm.documentApplicantList = response.data.data
          } else {
            vm.documentApplicantList = [response['data']['data']]
          }
        } else {
          vm.documentApplicantList = []
        }
        vm.totalDocument = response['data']['total']
        vm.loadingTable = false
      }, error => {
        vm.loadingTable = false
        vm.documentApplicantList = []
        vm.totalDocument = 0
      })
    },
    uploadFile () {
      let vm = this
      document.getElementById('documentFile').value = ''
      document.getElementById('documentFile').click()
    },
    uploadDocumentFile (e) {
      let vm = this
      let files = $('#documentFile')[0].files
      let file = files[0]
      let fileName = ''
      let valid = vm.validFileUpload(file)
      if (valid) {
        vm.updateFile = true
        if (file['name']) {
          fileName = file['name'].replace(/\%/g, '')
          fileName = fileName.replace(/\//g, '')
          fileName = fileName.replace(/\\/g, '')
          fileName = fileName.replace(/\s/g, '')
        }
        vm.fileUpdate = file
        vm.fileNameUpdate = fileName
        vm.fileNameView = fileName
      }

    },
    getFileItems () {
      let vm = this
      let filter = {
        status: 1
      }
      vm.$store.dispatch('getFileItems', filter).then(function (result) {
        if (result.hasOwnProperty('data')) {
          vm.fileTemplateList = result.data
        } else {
          vm.fileTemplateList = []
        }
      }).catch(function () {
      })
    },
    showCreatedocument () {
      let vm = this
      vm.typeCreate = 'create'
      vm.dialog_createDocument = true
      vm.$refs.form.reset()
      vm.$refs.form.resetValidation()
      vm.fileNameView = ''
    },
    createDocument () {
      let vm = this
      let validFileUpload = true
      if (vm.updateFile) {
        let files = $('#documentFile')[0].files
        let file = files[0]
        validFileUpload = vm.validFileUpload(file)
      }
      if (!validFileUpload) {
        return
      }
      if (vm.$refs.form.validate()) {
        if (vm.fileNameView) {
          vm.loadingAction = true
          let filter = {
            fileTemplateNo: vm.fileTemplateNoCreate ? vm.fileTemplateNoCreate.fileTemplateNo : '',
            status: 0,
            fileNo: vm.fileNo,
            fileName: vm.fileName,
            applicantIdNo: vm.index,
            applicantName: vm.applicantInfos.applicantName,
            govAgencyName: "",
            issueDate: "",
            expireDate: "",
            desciption: "",
            serviceCode: "",
            templateNo: "",
            dossierNo: ""
          }
          let param = {
            headers: {
              groupId: window.themeDisplay ? window.themeDisplay.getScopeGroupId() : '',
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
          let dataPost = new FormData()
          dataPost.append('method', 'POST')
          dataPost.append('url', '/applicantdatas')
          dataPost.append('data', JSON.stringify(filter))
          dataPost.append('file', vm.fileUpdate)
          dataPost.append('serverCode', 'SERVER_MOTCUA')
          axios.post('/o/rest/v2/proxy/multipart', dataPost, param).then(response => {
            vm.loadingAction = false
            toastr.success('Thêm mới tài liệu thành công')
            vm.dialog_createDocument = false
            vm.getApplicantDocument()
          }).catch(xhr => {
            vm.loadingAction = false
            toastr.error('Thêm mới thất bại. Vui lòng thử lại.')
          })
        } else {
          toastr.clear()
          toastr.error('Vui lòng đính kèm tài liệu')
        }
      }
    },
    updateDocument () {
      let vm = this
      let validFileUpload = true
      if (vm.updateFile) {
        let files = $('#documentFile')[0].files
        let file = files[0]
        validFileUpload = vm.validFileUpload(file)
      }
      if (!validFileUpload) {
        return
      }
      if (vm.$refs.form.validate()) {
        vm.loadingAction = true
        let filter = {
          fileTemplateNo: vm.fileTemplateNoCreate ? vm.fileTemplateNoCreate.fileTemplateNo : '',
          fileNo: vm.fileNo,
          fileName: vm.fileName,
          applicantIdNo: vm.applicantInfos.applicantIdNo,
          applicantName: vm.applicantInfos.applicantName,
          govAgencyName: "",
          issueDate: "",
          expireDate: "",
          desciption: "",
          serviceCode: "",
          templateNo: "",
          dossierNo: ""
        }
        let param = {
          headers: {
            groupId: window.themeDisplay ? window.themeDisplay.getScopeGroupId() : '',
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        let dataPost = new FormData()
        dataPost.append('method', 'PUT')
        dataPost.append('url', '/applicantdatas/' + vm.documentSelect.applicantDataId)
        dataPost.append('data', JSON.stringify(filter))
        dataPost.append('serverCode', 'SERVER_MOTCUA')
        if (vm.updateFile) {
          dataPost.append('file', vm.fileUpdate)
        } else {
          dataPost.append('file', '')
        }

        axios.post('/o/rest/v2/proxy/multipart', dataPost, param).then(response => {
          vm.loadingAction = false
          toastr.success('Cập nhật tài liệu thành công')
          vm.dialog_createDocument = false
          vm.getApplicantDocument()
        }).catch(xhr => {
          vm.loadingAction = false
          toastr.error('Cập nhật thất bại. Vui lòng thử lại.')
        })
      }
    },
    getDocumentTypeIcon (type) {
      let vm = this
      let typeDoc = 'doc,docx'
      let typeExcel = 'xls,xlsx'
      let typeImage = 'png,jpg,jpeg'
      if (type) {
        if (typeDoc.indexOf(type.toLowerCase()) >= 0) {
          return {
            icon: 'fas fa fa-file-word-o',
            color: 'blue',
            size: 14
          }
        } else if (typeExcel.indexOf(type.toLowerCase()) >= 0) {
          return {
            icon: 'fas fa fa-file-excel-o',
            color: 'green',
            size: 14
          }
        } else if (type.toLowerCase() === 'pdf') {
          return {
            icon: 'fa fa-file-pdf-o',
            color: 'red',
            size: 14
          }
        } else if (typeImage.indexOf(type.toLowerCase()) >= 0) {
          return {
            icon: 'fas fa fa-file-image-o',
            color: 'primary',
            size: 14
          }
        } else {
          return {
            icon: 'fas fa fa-paperclip',
            color: '',
            size: 14
          }
        }
      } else {
        return ''
      }
    },
    changeFilterSearch () {
      let vm = this
      vm.documentPage = 1
      setTimeout(function () {
        vm.getApplicantDocument()
      }, 200)
    },
    changePage (config) {
      let vm = this
      vm.documentPage = config.page
      vm.getApplicantDocument()
    },
    showEditDocument (item) {
      let vm = this
      vm.documentSelect = item
      vm.typeCreate = 'update'
      vm.fileNameView = item.filePath
      vm.fileTemplateNoCreate = vm.fileTemplateList.filter(function (items) {
        return items.fileTemplateNo === item.fileTemplateNo
      })[0]
      vm.statusCreate = item.status
      vm.fileName = item.fileName
      vm.fileNo = item.fileNo
      vm.dialog_createDocument = true
    },
    deleteDocument (item) {
      let vm = this
      let x = confirm('Bạn có chắc chắn xóa tài liệu này?')
      if (x) {
        let param = {
          headers: {
            groupId: window.themeDisplay.getScopeGroupId()
          }
        }
        let dataPost = new URLSearchParams()
        dataPost.append('method', 'DELETE')
        dataPost.append('url', '/applicantdatas/' + item.applicantDataId)
        dataPost.append('data', JSON.stringify({}))
        dataPost.append('serverCode', 'SERVER_MOTCUA')
        axios.post('/o/rest/v2/proxy', dataPost, param).then(function (response) { 
          toastr.success('Xóa tài liệu thành công')
          vm.getApplicantDocument()
        }, error => {
          toastr.error('Xóa tài liệu thất bại')
        })
      }
    },
    validFileUpload (file) {
      let vm = this
      let passed = true
      let getFileType = file.name ? file.name.split('.') : ''
      let fileType = getFileType ? getFileType[getFileType.length - 1] : ''
      let fileTypeAllow = vm.fileTemplateNoCreate && vm.fileTemplateNoCreate.fileType ? vm.fileTemplateNoCreate.fileType.toUpperCase().split(',') : ''
      let fileSizeAllow = vm.fileTemplateNoCreate && vm.fileTemplateNoCreate.size ? vm.fileTemplateNoCreate.size : vm.maxFileSize
      let fileTypeInput = fileTypeAllow ? fileTypeAllow.filter(function (item) {
        return item === fileType.toUpperCase()
      }) : ''
      if ((fileTypeInput && fileTypeInput.length > 0) || !fileTypeAllow) {
        if (Number(file.size) <= fileSizeAllow * 1048576 || !fileSizeAllow) {
          passed = true
        } else {
          passed = false
          toastr.clear()
          toastr.error('Tài liệu tải lên dung lượng tối đa là ' + fileSizeAllow + 'MB')
        }
      } else {
        passed = false
        toastr.clear()
        toastr.error('Tài liệu tải lên chỉ chấp nhận các định dạng ' + vm.fileTemplateNoCreate.fileType)
      }
      return passed
    },
    downloadDocument (item) {
      let vm = this
      vm.srcDownload = ''
      let url = item.filePath
      let filter = {
        applicantDataId: item.applicantDataId
      }
      vm.$store.dispatch('getFileAttachProxy', filter).then(function (result) {
        vm.srcDownload = result
        setTimeout(function () {
          document.getElementById('downloadFile').click()
        }, 100)
      }).catch(function () {
      })
    },
    viewDocument (item) {
      let vm = this
      vm.srcDownload = ''
      let url = item.filePath
      let filter = {
        applicantDataId: item.applicantDataId
      }
      vm.$store.dispatch('getFileAttachProxy', filter).then(function (result) {
        let fileType = item.fileExtension.toLowerCase()
        if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'pdf' || fileType === 'gif' ||
          fileType === 'tif' || fileType === 'tiff'
        ) {
          vm.dialogPDF = true
          document.getElementById('dialogPDFPreview').src = result
        } else {
          vm.srcDownload = result
          setTimeout(function () {
            document.getElementById('downloadFile').click()
          }, 100)
        }
      }).catch(function () {
      })
    },
    getApplicantType (item) {
      let vm = this
      if (item.applicantIdType === '') {
        vm.nameTitle = 'Tên công dân, tổ chức, doanh nghiệp'
        vm.creditTitle = 'Số CMND/ căn cước, mã số thuế doanh nghiệp'
      } else if (item.applicantIdType === 'citizen') {
        vm.nameTitle = 'Tên công dân'
        vm.creditTitle = 'Số CMND/ căn cước'
      } else if (item.applicantIdType === 'business') {
        vm.nameTitle = 'Tên doanh nghiệp'
        vm.creditTitle = 'Mã số thuế doanh nghiệp'
      } else {
        vm.nameTitle = 'Tên cơ quan, tổ chức'
        vm.creditTitle = 'Mã cơ quan, tổ chức'
      }
    },
    getStatus (val) {
      if (String(val) === '0') {
        return 'Yêu cầu số hóa'
      } else if (String(val) === '1') {
        return 'Có hiệu lực'
      } else if (String(val) === '2') {
        return 'Hết hiệu lực'
      } else if (String(val) === '3') {
        return 'Hủy'
      }
    },
    goBack () {
      window.history.back()
    }
  }
}
</script>
