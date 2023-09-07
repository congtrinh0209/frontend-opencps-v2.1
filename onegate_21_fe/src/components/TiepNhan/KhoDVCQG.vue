<template>
    <div>
      <v-card>
        <v-card-text class="px-0 pt-0 mt-3">
          <v-layout wrap class="mt-0" v-if="thongTinChuHoSo">
            <v-flex xs12 sm5 class="pr-2">
              <div class="xs12 sm12 pb-1 mb-1">
                <span class="pr-2">Tên công dân/ tổ chức/ doanh nghiệp: </span>
                <span class="pl-0 text-bold"> {{thongTinChuHoSo.applicantName}}</span>
              </div>
            </v-flex>
            <v-flex xs12 sm7 class="mb-1">
              <div class="xs12 sm12 pb-1">
                <span class="pr-2">Số định danh: </span>
                <span class="pl-0 text-bold"> {{thongTinChuHoSo.applicantIdNo}}</span>
              </div>
            </v-flex>
            <v-flex xs12 sm5 class="pr-2 mb-1">
              <div class="xs12 sm12 pb-1">
                <span class="pr-2">Điện thoại: </span>
                <span class="pl-0 text-bold"> {{thongTinChuHoSo.contactTelNo}} </span>
              </div>
            </v-flex>
            <v-flex xs12 sm7 class="mb-1">
              <div class="xs12 sm12 pb-1">
                <span class="pl-0">Thư điện tử: </span>
                <span class="pl-0 text-bold"> {{thongTinChuHoSo.contactEmail}} </span>
              </div>
            </v-flex>
            <v-flex xs12 class="mb-1">
              <div class="xs12 sm12 pb-1">
                <span class="pl-0">Thủ tục hành chính: </span>
                <span class="pl-0 text-bold"> {{thanhPhanHoSo.serviceCodeKQ}} - {{serivceInfo.serviceName}} </span>
              </div>
            </v-flex>
            <v-flex xs12 class="mb-1">
              <div class="xs12 sm12 pb-1">
                <span class="pl-0">Loại giấy tờ: </span>
                <span class="pl-0 text-bold"> 
                  {{thanhPhanHoSo.fileTemplateNoKQ}} - {{ thanhPhanHoSo.partName }}
                </span>
              </div>
            </v-flex>
          </v-layout>
          <v-data-table
            :headers="documentListHeaderDvcqg"
            :items="documentApplicantList"
            hide-actions
            class="table-landing table-bordered mt-4"
            style="border-left: 1px solid #dedede"
          >
            <template slot="items" slot-scope="props">
              <tr v-bind:class="{'active': props.index%2==1}" style="cursor: pointer;">
                <td class="text-xs-center py-3" style="width:50px;height:36px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{  props.index + 1 }}</span>
                  </div>
                </td>
                <td class="text-xs-left py-3" style="height:36px; min-width:350px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span style="word-break: break-word;">{{props.item.hasOwnProperty('TenGiayTo') ? props.item.TenGiayTo : ''}}</span>
                  </div>
                </td>
                <td class="text-xs-left py-3" style="height:36px;min-width:150px;max-width: 300px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span style="word-break: break-word;">{{props.item.hasOwnProperty('SoKyHieu') ? props.item.SoKyHieu : ''}}</span>
                  </div>
                </td>
                <!-- <td class="text-xs-center py-3" style="height:36px;min-width: 100px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-tooltip top v-if="!loadingTable" class="mr-2">
                    <v-btn @click="viewDocumentDvcqg(props.item)" color="blue" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon>visibility</v-icon>
                    </v-btn>
                    <span>Xem trước</span>
                  </v-tooltip>
                  <v-tooltip top v-if="!loadingTable && !applicantId" class="mr-2">
                    <v-btn @click="$emit('trigger-attach-dvcqg', props.item)" color="blue" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon>fas fa fa-download</v-icon>
                    </v-btn>
                    <span>Sử dụng</span>
                  </v-tooltip>
                </td> -->
  
                <td class="text-xs-center py-3" style="height:36px;min-width: 150px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div>
                    <div v-for="(itemFileView, indexFile) in props.item.DanhSachTepDinhKem" :key="indexFile">
                      <span v-on:click.stop="viewDocumentDvcqg(itemFileView)" class="ml-1" style="cursor: pointer;text-decoration: underline;">
                        <v-icon class="mr-1" color="primary" :size="16">
                          fas fa fa-paperclip
                        </v-icon>
                        <span style="font-size: 14px">{{itemFileView.TenTep}}</span>
                      </span>
                      <!-- <v-btn title="Tải xuống" color="indigo" flat icon class="mx-0 my-0 mr-1" :loading="loadingPdf" :disabled="loadingPdf"
                        v-on:click.stop="viewDocumentDvcqg(itemFileView)"
                      >
                        <v-icon size="14" color="primary">fas fa fa-download</v-icon>
                      </v-btn> -->

                      <v-btn title="Sử dụng giấy tờ này" color="primary" class="mx-0 my-0" flat icon :loading="loadingPdf" :disabled="loadingPdf"
                        v-on:click.stop="$emit('trigger-attach', itemFileView)"
                      >
                        <v-icon size="14" color="primary">fas fa fa-cloud-download</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <template slot="no-data">
              <v-progress-linear v-if="loadingTable" :indeterminate="true"></v-progress-linear>
              <div v-else class="text-xs-center mt-2">
                Không có tài liệu
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-dialog v-model="dialogPDF" max-width="1200" transition="fade-transition">
        <v-card>
          <v-toolbar flat dark color="primary">
            <v-toolbar-title>Tài liệu đính kèm</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click.native="dialogPDF = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <iframe id="dialogPDFPreview" :src="srcPdf" type="application/pdf" width="100%" height="100%" style="overflow: auto;min-height: 600px;" frameborder="0">
          </iframe>
        </v-card>
      </v-dialog>
      <div style="display:none">
        <a id="downloadFile-dvcqg" :href="srcDownload" download></a>
      </div>
    </div>
  </template>
  
  <script>
  
  import Vue from 'vue'
  import toastr from 'toastr'
  import TinyPagination from '../../components/pagging/opencps_pagination'
  Vue.use(toastr)
  export default {
    props: ['index', 'status', 'thongTinChuHoSo', 'serivceInfo', 'thanhPhanHoSo'],
    components: {
      'tiny-pagination': TinyPagination
    },
    data: () => ({
      loading: false,      
      applicantInfos: '',
      nameTitle: '',
      creditTitle: '',
      documentApplicantList: '',
      totalDocument: 0,
      documentPage: 1,
      numberPerPage: 15,
      fileTemplateNo: '',
      fileNo: '',
      fileNoSearch: '',
      keySearch: '',
      loadingAction: false,
      loadingTable: false,
      dialogPDF: false,
      srcPdf: '',
      valid: false,
      documentListHeaderDvcqg: [
        {
          text: 'STT',
          align: 'center',
          sortable: false
        },
        {
          text: 'Tên giấy tờ',
          align: 'center',
          sortable: false
        },
        {
          text: 'Mã số',
          align: 'center',
          sortable: false
        },
        {
          text: 'Tệp đính kèm',
          align: 'center',
          sortable: false
        }
      ],
      maxFileSize: 100,
      documentSelect: '',
      fileNameView: '',
      srcDownload: '',
      applicantIdNo: '',
      serviceInfoList: [],
      serviceInfoSearch: '',
      optionListSearch: [],
      optionSearch: '',
      fileTemplateListSearch: [],
      fileTemplateNo: '',
      dossierNoSearch: ''
    }),
    computed: {
      originality () {
        let vm = this
        return vm.getOriginality()
      }
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        let vm = this
        let currentParams = newRoute.params
        let currentQuery = newRoute.query
      },
      index (val) {
        this.applicantIdNo = val
        console.log('thongtinchuhoso', this.thongTinChuHoSo)
      }
    },
    created () {
      let vm = this
      vm.$nextTick(function () {
        let current = vm.$router.history.current
        let query = vm.$router.history.current.query
        vm.applicantIdNo = vm.index
      })
    },
    mounted () {
      let vm = this
      vm.applicantIdNo = vm.index
    },
    methods: {
      initData () {
        let vm = this
        console.log('vm.thanhPhanHoSo', vm.thanhPhanHoSo)
        vm.getDanhSachGiayToDvcqg()
      },
      getDanhSachGiayToDvcqg () {
        let vm = this
        let filter = {
          danhSachDanhMucKetQua: [{"MaKetQua": vm.thanhPhanHoSo.fileTemplateNoKQ, "SoKyHieu": ""}],
          cccd: vm.applicantIdNo ? vm.applicantIdNo : '',
          maThuTuc: vm.thanhPhanHoSo.serviceCodeKQ
        }
  
        vm.loadingTable = true
        let endPoint = 'getGiayToDvcqg'
        if (vm.originality == 3) {
          endPoint = 'getGiayToDvcqgProxy'
        }
        vm.$store.dispatch(endPoint, filter).then(function (result) {
          // console.log('result', result)
          vm.documentApplicantList = result.result['DanhSachGiayToKetQua']
          vm.totalDocument = result.result['DanhSachGiayToKetQua'].length
          vm.loadingTable = false
        }).catch(function () {
          vm.loadingTable = false
          vm.documentApplicantList = []
          vm.totalDocument = 0
        })
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
          vm.getDanhSachGiayToDvcqg()
        }, 200)
      },
      changePage (config) {
        let vm = this
        vm.documentPage = config.page
        vm.getDanhSachGiayToDvcqg()
      },
      viewDocumentDvcqg (item, view) {
        let vm = this
        if (view) {
          let filter = {
            "url": item.DuongDan,
          }
          vm.$store.dispatch('getTepDvcqg', filter).then(function (result) {
            vm.srcPdf = result
            vm.dialogPDF = true
          }).catch(function () {
          })
        } else {
          vm.srcDownload = item.DuongDan
          setTimeout(function () {
            document.getElementById('downloadFile-dvcqg').click()
          }, 100)
        }
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
        if (String(val) === '1') {
          return 'Có hiệu lực'
        } else if (String(val) === '2') {
          return 'Hết hiệu lực'
        } else {
          return 'Chưa duyệt'
        }
      },
      goBack () {
        window.history.back()
      }
    }
  }
  </script>
  