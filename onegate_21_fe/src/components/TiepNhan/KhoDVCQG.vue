<template>
    <div>
      <v-card>
        <v-card-text class="px-0 pt-0 mt-4">
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
          </v-layout>
          <v-layout wrap class="mt-2">
            <v-flex xs12 md12 class="px-0">
              <v-autocomplete
                :items="serviceInfoList"
                v-model="serviceInfoSearch"
                ref="autocomplete"
                :loading="loading"
                :search-input.sync="keywordSearchSelect"
                item-text="serviceName"
                item-value="serviceCode"
                @change="changeService('search')"
                clearable
                label="Chọn thủ tục"
                box
              >
                <template slot="selection" slot-scope="{ item }">
                  <b class="labelCodeItemSelect">{{item.serviceCode}}</b>&nbsp;-&nbsp;{{item.serviceName}}
                </template>
                <template slot="item" slot-scope="{ item }">
                  <b>{{item.serviceCode}}</b>&nbsp;-&nbsp;{{item.serviceName}}
                </template>
                <template v-slot:append-item>
                  <div class="py-2" v-if="isShow"
                    v-observe-visibility="{
                      callback: visibilityChanged
                    }"
                  >
                  </div>
                </template>
              </v-autocomplete>
            </v-flex>
            <v-flex xs12 md6 class="px-0 pr-2">
              <v-autocomplete
                :items="optionListSearch"
                v-model="optionSearch"
                label="Chọn trường hợp"
                item-text="optionName"
                item-value="templateNo"
                return-object
                :hide-selected="true"
                box
                clearable
                @change="changeOptionSearch"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 class="px-0 pl-2">
              <v-autocomplete
                :items="fileTemplateListSearch"
                v-model="fileTemplateNo"
                label="Chọn loại giấy tờ"
                item-text="partName"
                item-value="fileTemplateNo"
                :hide-selected="true"
                clearable
                box
              ></v-autocomplete>
            </v-flex>
            <v-flex class="text-right">
              <v-btn color="primary" small class="mx-0 white--text" @click.stop="changeFilterSearch">
                  <v-icon size="20" style="color: #fff !important">
                  search
                  </v-icon> &nbsp;
                  Tìm kiếm
              </v-btn>
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
    props: ['index', 'status', 'thongTinChuHoSo', 'serverCode', 'thanhPhanHoSo', 'serivceCodeProps'],
    components: {
      'tiny-pagination': TinyPagination
    },
    data: () => ({
      loading: false,
      keywordSearchSelect: "",
      pageSelectBox: 1,
      totalItemsSelectBox: 0,
      timeOutSearch: "",
      isShow: true,
      
      applicantInfos: '',
      nameTitle: '',
      creditTitle: '',
      documentApplicantList: '',
      totalDocument: 0,
      documentPage: 1,
      numberPerPage: 15,
      fileTemplateNoCreate: '',
      fileTemplateList: [],
      fileTemplateNo: '',
      fileNo: '',
      fileNoSearch: '',
      keySearch: '',
      dialog_createDocument: false,
      updateFile: false,
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
      serviceCodeDvcqg: '',
      optionListSearch: [],
      optionSearch: '',
      fileTemplateListSearch: [],
      fileTemplateNo: '',
      dossierNoSearch: '',
      ortherFileTemplate: {
        fileTemplateNo: 'GIAY_TO_KHAC',
        partName: 'Giấy tờ dùng chung'
      },
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
      },
      keywordSearchSelect(val) {
        let vm = this
        if (vm.serviceInfoList.length) {
          if (val && val !== vm.serviceInfoSearch) {
            if (vm.timeOutSearch) {
              clearTimeout(vm.timeOutSearch);
            }
            vm.timeOutSearch = setTimeout(function () {
              let exits = vm.serviceInfoList.find(function (item) {
                return String(item.serviceName).toLowerCase().includes(String(val).toLowerCase())
              })
              if (!exits) {
                vm.searchItems()
              }
            }, 1000)
          }
        } else {
          if (vm.timeOutSearch) {
            clearTimeout(vm.timeOutSearch);
          }
          vm.timeOutSearch = setTimeout(function () {
            vm.searchItems()
          }, 1000)
        }     
      },
    },
    created () {
      let vm = this
      try {
        if (ortherFileTemplateConfig) {
          vm.ortherFileTemplate = ortherFileTemplateConfig
        }
      } catch (error) {
      }
      vm.$nextTick(function () {
        let current = vm.$router.history.current
        let query = vm.$router.history.current.query
        // vm.serviceCodeDvcqg = vm.serivceCodeProps
        vm.applicantIdNo = vm.index
        // if (vm.thanhPhanHoSo) {
        //   vm.fileTemplateNo = vm.thanhPhanHoSo.hasOwnProperty('fileTemplateNoDVCQG') ? vm.thanhPhanHoSo.fileTemplateNoDVCQG : vm.thanhPhanHoSo.fileTemplateNo
        // }
      })
    },
    mounted () {
      let vm = this
      vm.applicantIdNo = vm.index
    },
    methods: {
      searchItems() {
        this.serviceInfoList = [];
        this.pageSelectBox = 1;
        this.loadMoreItems();
      },
      visibilityChanged(e) {
        e && this.loadMoreItems();
      },
      loadMoreItems() {
        let vm = this
        if (vm.serviceInfoList.length < vm.totalItemsSelectBox || vm.pageSelectBox == 1) {
          // vm.loading = true;
          vm.isShow = false
          let filter1 = {
            start: vm.pageSelectBox * 10 - 10,
            end: vm.pageSelectBox * 10,
            keyword: vm.keywordSearchSelect ? vm.keywordSearchSelect : ''
          }
          vm.$store.dispatch('getServiceConfigs', filter1).then(results => {
            let resp1 = results.hasOwnProperty('data') ? results['data'] : []
            vm.serviceInfoList = vm.serviceInfoList.concat(resp1);
            vm.isShow = true
            vm.pageSelectBox++;
            let total1 = results.hasOwnProperty('total') ? results['total'] : 0
            vm.totalItemsSelectBox = total1
            vm.loading = false
            if (vm.$refs.autocomplete) {
              vm.$refs.autocomplete.onScroll()
            }
          }).catch(xhr => {
            vm.loading = false
          })
        }
      },
      initData () {
        let vm = this
        // console.log('vm.thanhPhanHoSo', vm.thanhPhanHoSo)
        if (vm.thanhPhanHoSo) {
          vm.fileTemplateNo = vm.thanhPhanHoSo.hasOwnProperty('fileTemplateNoDVCQG') && vm.thanhPhanHoSo.fileTemplateNoDVCQG ? vm.thanhPhanHoSo.fileTemplateNoDVCQG : vm.thanhPhanHoSo.fileTemplateNo
        }
        vm.searchItems()
        vm.fileTemplateListSearch = [vm.ortherFileTemplate]
        // vm.getDanhSachGiayToDvcqg()
      },
      getDanhSachGiayToDvcqg () {
        let vm = this
        let filter = {
          danhSachDanhMucKetQua: vm.fileTemplateNo ? [{"MaKetQua": vm.fileTemplateNo, "SoKyHieu": ""}] : '',
          cccd: vm.applicantIdNo ? vm.applicantIdNo : '',
          maThuTuc: vm.serviceCodeDvcqg ? vm.serviceCodeDvcqg : ''
        }
  
        vm.loadingTable = true
        vm.$store.dispatch('getGiayToDvcqg', filter).then(function (result) {
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
        let filter = {
          start: vm.documentPage * vm.numberPerPage - vm.numberPerPage,
          end: vm.documentPage * vm.numberPerPage,
          applicantIdNo: vm.applicantIdNo,
          fileTemplateNo: vm.fileTemplateNo,
          status: vm.originality === 1 ? 1 : vm.status,
          keywordSearch: vm.keySearch,
          fileNoSearch: vm.fileNoSearch,
          dossierNoSearch: vm.dossierNoSearch,
          applicantDataType: '',
          serverCode: vm.serverCode
        }
        vm.loadingTable = true
        if (vm.originality === 1) {
          vm.$store.dispatch('getApplicantDocumentProxy', filter).then(function (result) {
            if (result.hasOwnProperty('data')) {
              vm.documentApplicantList = result.data
            } else {
              vm.documentApplicantList = []
            }
            vm.totalDocument = result['total']
            vm.loadingTable = false
          }).catch(function () {
            vm.loadingTable = false
            vm.documentApplicantList = []
            vm.totalDocument = 0
          })
        } else {
          vm.$store.dispatch('getApplicantDocument', filter).then(function (result) {
            if (result.hasOwnProperty('data')) {
              vm.documentApplicantList = result.data
            } else {
              vm.documentApplicantList = []
            }
            vm.totalDocument = result['total']
            vm.loadingTable = false
          }).catch(function () {
            vm.loadingTable = false
            vm.documentApplicantList = []
            vm.totalDocument = 0
          })
        }
        
      },
      getFileItems () {
        let vm = this
        let filter = {
          status: 1
        }
        if (vm.originality === 1) {
          vm.$store.dispatch('getFileItemsProxy', filter).then(function (result) {
            if (result.hasOwnProperty('data')) {
              vm.fileTemplateList = result.data
            } else {
              vm.fileTemplateList = []
            }
          }).catch(function () {
          })
        } else {
          vm.$store.dispatch('getFileItems', filter).then(function (result) {
            if (result.hasOwnProperty('data')) {
              vm.fileTemplateList = result.data
            } else {
              vm.fileTemplateList = []
            }
          }).catch(function () {
          })
        }
        
      },
      getServiceInfoItems () {
        let vm = this
        let filter = {
        }
        vm.$store.dispatch('getServiceInfoItems', filter).then(function (result) {
          if (result.hasOwnProperty('data')) {
            vm.serviceInfoList = result.data
          } else {
            vm.serviceInfoList = []
          }
          vm.optionList = []
          vm.optionCreate = ''
          vm.fileTemplateListSearch = [vm.ortherFileTemplate]
          vm.fileTemplateNoCreate = ''
        }).catch(function () {
        })
      },
      changeService () {
        let vm = this
        setTimeout(function () {
          if (vm.serviceInfoSearch) {
            console.log('vm.serviceInfoSearch', vm.serviceInfoSearch)
            let exits = vm.serviceInfoList.find(function (item) {
              return item.serviceCode === vm.serviceInfoSearch
            })
            let filter = {
              serviceConfigId: exits ? exits.serviceConfigId : ''
            }
            vm.$store.dispatch('getServiceOpionByProcess', filter).then(function (result) {
              if (result) {
                vm.optionListSearch = result
                vm.optionSearch = ''
              } else {
                vm.optionListSearch = []
              }
            }).catch(function () {
              vm.optionListSearch = []
            })
            // 
            let filer2 = {
              keyword: vm.serviceInfoSearch
            }
            vm.$store.dispatch('getServiceInfos', filer2).then(function (result) {
              let serviceList = result.data
              let service = serviceList.find(function (item) {
                return item.serviceCode == vm.serviceInfoSearch
              })
              vm.serviceCodeDvcqg = service['serviceCodeDVCQG'] ? service['serviceCodeDVCQG'] : vm.serviceInfoSearch
            }).catch(function () {
            })
            // 
          } else {
            vm.optionListSearch = []
            vm.optionSearch = ''
          }
        }, 200)
      },
      changeOptionSearch () {
        let vm = this
        setTimeout (function () {
          if (vm.optionSearch) {
            let filter = {
              dossierTemplateNo: vm.optionSearch.templateNo
            }
            vm.$store.dispatch('getDossierPart', filter).then(function (result) {
              if (result.hasOwnProperty('dossierParts')) {
                vm.fileTemplateListSearch = result.dossierParts
                vm.fileTemplateNo = null
              } else {
                vm.fileTemplateListSearch = []
              }
              vm.fileTemplateListSearch.push(vm.ortherFileTemplate)
            }).catch(function () {
            })
          } else {
            vm.fileTemplateList = []
            vm.fileTemplateListSearch = [vm.ortherFileTemplate]
            vm.fileTemplateNoCreate = ''
          }
        }, 200)
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
  