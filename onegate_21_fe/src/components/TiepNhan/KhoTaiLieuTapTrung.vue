<template>
  <div style="padding: 0px 0px; max-width: 1500px; margin: 0px auto;border-radius: 12px" class="pb-3" id="top-header">
    <v-layout wrap>
      <v-flex class="px-2">
        <v-card v-if="!showDetail" class="px-3 py-3" style="width: 100%; background: #ffffff;">
          <v-layout wrap>
            <v-flex>
            </v-flex>
            <v-flex style="width: 500px">
              <v-text-field
                solo
                v-model="keywordSearch"
                label="Nhập từ khóa tìm kiếm..."
                append-icon="search"
                @keyup.enter="searchKeyword"
                @click:append="searchKeyword"
              ></v-text-field>
            </v-flex>
            <v-flex style="max-width: 170px; text-align: right;padding-top: 2px;">
              <v-btn color="#0072bc" small class="mx-0 white--text my-0" @click.stop="showTimKiem" style="">
                <v-icon size="20">
                  filter_list
                </v-icon> &nbsp;
                Tìm kiếm nâng cao
              </v-btn>
            </v-flex>
          </v-layout>
          <v-card-text class="px-0 pb-0 pt-0" v-if="showAdvanceSearch">
            <tim-kiem ref="timkiem" :inputSearch="inputSearch" v-on:trigger-search="searchGiayToSoHoa" v-on:trigger-cancel="cancelSearchGiayToSoHoa"></tim-kiem>
          </v-card-text>
          <div v-if="totalDocument" class="mb-2">Tổng số <span class="text-bold primary--text">{{totalDocument}}</span> giấy tờ. </div>
          <v-data-table
            :headers="documentListHeader"
            :items="documentApplicantList"
            hide-actions
            class="table-landing table-bordered mt-2"
            style="border-left: 1px solid #dedede"
          >
            <v-progress-linear v-if="loadingTable" slot='progress' color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr v-bind:class="{'active': props.index%2==1}" style="cursor: pointer;" @click="viewThongTinGiayTo(props.item)">
                <td class="text-xs-center py-2" style="width:50px;height:36px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{ (documentPage + 1) * numberPerPage - numberPerPage + props.index + 1 }}</span>
                  </div>
                </td>
                <td class="text-xs-left py-2" style="height:36px; min-width:250px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{props.item.TenGiayTo }}</span>
                  </div>
                </td>
                <td class="text-xs-left py-2" style="height:36px;min-width: 120px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{props.item.SoHieuVanBan}}</span>
                  </div>
                </td>
                <td class="text-xs-center py-2" style="height:36px;min-width: 120px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>{{ convertDate(props.item.NgayBanHanh) }}</span>
                  </div>
                </td>
                <td class="text-xs-left py-2" style="height:36px;min-width: 150px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <div class="mb-1">
                      <b>{{props.item.ChuHoSo['TenGoi']}}</b>
                    </div>
                    <span>{{props.item.ChuHoSo['MaDinhDanh']}}</span>
                  </div>
                </td>
                <td class="text-xs-center py-2" style="height:36px;min-width:100px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <div v-else>
                    <span>
                      {{props.item.HieuLucVanBan['TenMuc']}}
                    </span>
                  </div>
                </td>
                <td class="text-center py-2" style="height:36px;min-width:110px">
                  <content-placeholders v-if="loadingTable">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-tooltip top v-if="!loadingTable" class="mr-2">
                    <v-btn title="Xem chi tiết" @click.stop="viewThongTinGiayTo(props.item)" color="#0072bc" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon size="22">visibility</v-icon>
                    </v-btn>
                    <span>Xem chi tiết</span>
                  </v-tooltip>
                  <!-- <v-tooltip top v-if="!loadingTable && props.item.fileEntryId" class="mr-2">
                    <v-btn @click.stop="downloadDocument(props.item)" color="#0072bc" title="Tải xuống" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon size="22">fas fa fa-download</v-icon>
                    </v-btn>
                    <span>Tải xuống</span>
                  </v-tooltip> -->
                  <v-tooltip top v-if="!loadingTable" class="mr-2">
                    <v-btn title="Sử dụng giấy tờ này" @click.stop="$emit('trigger-attach', props.item)" color="#0072bc" slot="activator" flat icon class="mx-0 my-0">
                      <v-icon size="22">fas fa fa-cloud-download</v-icon>
                    </v-btn>
                    <span>Sử dụng giấy tờ này</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
            <template slot="no-data">
              <div class="text-xs-center mt-2">
                Không có giấy tờ
              </div>
            </template>
          </v-data-table>

          <div class="my-2" v-if="totalDocument > numberPerPage">
            <div class="text-xs-right layout wrap" style="position: relative;">
              <div class="flex pagging-table"> 
                <pagination :total="totalDocument" :page="documentPage + 1" :numberPerPage="numberPerPage" nameRecord="giấy tờ" custom-class="custom-tiny-class" 
                  @tiny:change-page="changePage" ></pagination> 
              </div>
            </div>
          </div>
        </v-card>
        <v-card v-else class="px-3 py-3" style="width: 100%; min-height: 450px; background: #ffffff;">
          <div class="headline mb-0" style="font-size: 20px!important;">
            <span style="text-transform: uppercase; font-size: 20px;color: #0072bc;font-weight: 500;">THÔNG TIN GIẤY TỜ</span>
          </div>
          <v-card-text class="py-2 px-0" style="font-size: 14px;">
            <v-flex class="xs12 sm12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Tên giấy tờ: </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px);"> {{documentSelect.TenGiayTo}}</v-flex>
            </v-flex>
            <v-flex class="xs12 sm12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Số hiệu giấy tờ: </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px);"> {{documentSelect.SoHieuVanBan}}</v-flex>
            </v-flex>
            <v-flex class="xs12 sm12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Cơ quan ban hành: </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px);"> {{documentSelect.CoQuanBanHanh['TenGoi']}}</v-flex>
            </v-flex>
            <v-flex class="xs12 sm12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Ngày ban hành: </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px);"> {{convertDate(documentSelect.NgayBanHanh)}}</v-flex>
            </v-flex>
            <v-flex class="xs12 sm12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Mẫu giấy tờ: </v-flex>
              <v-flex class="pl-0" style="width: calc(100% - 160px);"> {{documentSelect.MaMauGiayTo['MaMuc']}} - {{documentSelect.MaMauGiayTo['TenMuc']}}</v-flex>
            </v-flex>
            <v-flex class="xs12 sm12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Mã hồ sơ: </v-flex>
              <v-flex class="pl-0 " style="width: calc(100% - 160px);"> {{documentSelect.HoSoDichVuCong['MaDinhDanh']}}</v-flex>
            </v-flex>
            <v-flex class="xs12 sm12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Người thụ hưởng: </v-flex>
              <v-flex class="pl-0 mr-2" style="width: calc(100% - 160px);"> {{documentSelect.ChuHoSo['TenGoi']}}</v-flex>
            </v-flex>
            <v-flex class="xs12 sm12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold" style="width: 150px;">Số CCCD/CMND, MST: </v-flex>
              <v-flex class="pl-0 " style="width: calc(100% - 160px);">{{documentSelect.ChuHoSo['MaDinhDanh']}}</v-flex>
            </v-flex>
            <v-flex class="xs12 sm12 pb-2 layout wrap" style="padding: 10px 0; border-bottom: 1px dashed #dadada;align-items: center;">
              <v-flex class="pr-2 text-bold " style="width: 150px;">Hiệu lực giấy tờ: </v-flex>
              <v-flex class="pl-0 "  style="width: calc(100% - 160px);"> {{documentSelect.HieuLucVanBan['TenMuc']}}</v-flex>
            </v-flex>
            <div class="xs12 sm12 py-2" v-if="documentSelect &&documentSelect.TepDuLieu && documentSelect.TepDuLieu.length">
              <span class="pr-2 text-bold ">Tệp giấy tờ: </span>
              <div v-for="(itemFileView, indexFile) in documentSelect.TepDuLieu" :key="indexFile" class="my-2">
                <span v-on:click.stop="viewDocument(itemFileView)" class="ml-1" style="cursor: pointer;text-decoration: underline;">
                  <v-icon class="mr-1" :color="getDocumentTypeIcon(itemFileView.Ext)['color']"
                    :size="getDocumentTypeIcon(itemFileView.Ext)['size']">
                    {{getDocumentTypeIcon(itemFileView.Ext)['icon']}}
                  </v-icon>
                  {{itemFileView.TenTep}}.{{itemFileView.Ext}}
                </span>
                <v-btn class="my-0" title="Xem tệp" flat icon color="indigo" :loading="loadingPdf" :disabled="loadingPdf"
                  @click.stop="viewDocument(itemFileView, index)"
                >
                  <v-icon size="22">visibility</v-icon>
                </v-btn>
                <v-btn title="Tải xuống" color="indigo" flat icon class="mx-0 my-0" :loading="loadingPdf" :disabled="loadingPdf"
                  v-on:click.stop="downloadDocument(itemFileView)"
                >
                  <v-icon size="14" color="primary">fas fa fa-download</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="xs12 sm12 pb-2">
              <v-btn class="mx-0" color="red" dark @click.native="showDetail = false">
                <v-icon>reply</v-icon>&nbsp;
                Quay lại
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
        <v-dialog v-model="dialogPDF" fullscreen transition="fade-transition">
          <v-card>
            <v-toolbar flat dark color="primary">
              <v-toolbar-title>Tệp dữ liệu</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click.native="dialogPDF = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <iframe id="dialogPDFPreview" src="" type="application/pdf" width="100%" height="100%" style="overflow: auto;min-height: 600px;" frameborder="0">
            </iframe>
          </v-card>
        </v-dialog>
        <div style="display:none">
          <a id="downloadFile" :href="srcDownload" download></a>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Vue from 'vue'
  import toastr from 'toastr'
  import Pagination from '../pagging/opencps_pagination.vue'
  import Search from './FormTimKiem.vue'
  Vue.use(toastr)

  toastr.options = {
    'positionClass': 'toast-top-center',
    'timeOut': '5000'
  }
  export default {
    components: {
      'tim-kiem': Search,
      'pagination': Pagination
    },
    props: ['index', 'thongTinChuHoSo'],
    data: () => ({
      valid: false,
      donViList: [],
      menuActive: 0,
      loaiVanBanList: [],
      loaiVanBanCreate: '',
      cmndNguoiThuHuong: '',
      tenNguoiThuHuong: '',
      maHoSoDvc: '',
      keywordSearch: '',
      applicantNameCreate: '',
      applicantIdNoCreate: '',
      govAgencyCreate: '',
      createDate: '',
      expireDate: '',
      showDetail: false,
      fileTemplateList: [],
      statusCreate: 1,
      fileTemplateNoCreate: '',
      fileName: '',
      fileNo: '',
      fileUpdate: '',
      fileNameUpdate: '',
      documentSelect: '',
      loadingAction: false,
      showAdvanceSearch: false,
      showApplicantInfo: false,
      inputSearch: {
        applicantName: '',
        applicantIdNo: '',
        fileTemplateNo: '',
        status: '',
        keywordSearch: '',
        fileNoSearch: '',
        name: ''
      },
      dataInputSearch: '',
      loadingTable: false,
      documentApplicantList: [],
      totalDocument: 0,
      documentPage: 0,
      numberPerPage: 15,
      pathNameFileESign: '',
      dialogPDF: false,
      isDvc: false,
      maxFileSize: 100,
      typeCreate: 'create',
      fileNameView: '',
      srcDownload: '',
      fileEntryESign: '',
      hasEsign: false,
      statusList: [],
      applicantInfos: '',
      documentListHeader: [
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
          text: 'Số hiệu giấy tờ',
          align: 'center',
          sortable: false
        },
        {
          text: 'Ngày ban hành',
          align: 'center',
          sortable: false
        },
        {
          text: 'Người thụ hưởng',
          align: 'center',
          sortable: false
        },
        {
          text: 'Hiệu lực giấy tờ',
          align: 'center',
          sortable: false
        },
        {
          text: 'Thao tác',
          align: 'center',
          sortable: false
        }
      ],


      loading: false,
      itemsSelectBox: [],
      selected: "",
      keywordSearchSelect: "",
      pageSelectBox: 0,
      totalItemsSelectBox: 0,
      timeOutSearch: "",
      loadingPdf: false
    }),
    computed: {
      originality () {
        var vm = this
        return vm.getOriginality()
      },
    },
    beforeDestroy () {
    },
    mounted () {
     let vm = this
    },
    beforeCreate() {
    },
    created () {
      let vm = this
      let currentQuery = vm.$router.history.current.query
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        let vm = this
        let currentQuery = newRoute.query
        vm.showApplicantInfo = false
        vm.getDanhSachGiayToSoHoa()
      },
      showDetail (val) {
        let vm = this
        setTimeout(function () {
          if (!val && vm.showAdvanceSearch && vm.$refs.timkiem) {
            let myElements = document.querySelectorAll(".v-menu__content")
            for (let i = 0; i < myElements.length; i++) {
              myElements[i].style.position = 'fixed'
            }
          }
        }, 300)
      },
      showAdvanceSearch (val) {
        let vm = this
        setTimeout(function () {
          if (val) {
            let myElements = document.querySelectorAll(".v-menu__content")
            for (let i = 0; i < myElements.length; i++) {
              myElements[i].style.position = 'fixed'
            }
          } else {
            let myElements = document.querySelectorAll(".v-menu__content")
            for (let i = 0; i < myElements.length; i++) {
              myElements[i].style.position = 'absolute';
            }
          }
        }, 300)
      },
      // ----
      keywordSearchSelect(val) {
        let vm = this
        if (vm.itemsSelectBox.length) {
          if (val && val !== vm.selected) {
            if (vm.timeOutSearch) {
              clearTimeout(vm.timeOutSearch);
            }
            vm.timeOutSearch = setTimeout(function () {
              let exits = vm.itemsSelectBox.find(function (item) {
                return String(item.fileName).toLowerCase().includes(String(val).toLowerCase())
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
      }
      // ----
    },
    methods: {
      initData () {
        let vm = this
        vm.showDetail = false
        vm.inputSearch = {
          applicantIdNo: vm.index 
        }
        vm.searchGiayToSoHoa(vm.inputSearch)
        vm.showAdvanceSearch = true
      },
      viewThongTinGiayTo (item) {
        let vm = this
        let filter = {
          primKey: item.primKey,
          collection: vm.originality == 3 ? 'giaytoluutruso' : 'giaytocanhantochuc'
        }

        vm.$store.dispatch('getChiTietGiayToCaNhan', filter).then(function (result) {
          vm.documentSelect = result.resp
          vm.showDetail = true
          vm.typeCreate = 'view'
        }).catch(function () {
        })
      },
      showTimKiem () {
        this.showAdvanceSearch = !this.showAdvanceSearch
      },
      changeMenu (index) {
        let vm = this
        vm.menuActive = index
        vm.showDetail = false
      },
      uploadFile () {
        let vm = this
        vm.hasEsign = false
        document.getElementById('documentFile').value = ''
        document.getElementById('documentFile').click()
      },
      searchGiayToSoHoa (data) {
        let vm = this
        let dataSearch = Object.assign(data ? data : {}, {keyword: vm.keywordSearch })
        console.log('dataInputSearch', dataSearch)
        vm.dataInputSearch = dataSearch
        vm.documentPage = 0
        vm.totalDocument = 0
        vm.getDanhSachGiayToSoHoa(dataSearch)
      },
      searchKeyword () {
        let vm = this
        let dataFormSearch = {}
        if (vm.$refs.timkiem) {
          dataFormSearch = vm.$refs.timkiem.getDataOutPut()
        }
        let dataSearch = Object.assign(dataFormSearch, {keyword: vm.keywordSearch})
        console.log('dataInputSearch', dataSearch)
        vm.dataInputSearch = dataSearch
        vm.documentPage = 0
        vm.totalDocument = 0
        vm.getDanhSachGiayToSoHoa(dataSearch)
      },
      cancelSearchGiayToSoHoa (data) {
        let vm = this
        console.log('dataInputSearch2', data)
        vm.showAdvanceSearch = false
        // vm.dataInputSearch = data
        // vm.documentPage = 1
        // vm.totalDocument = 0
        // vm.getDanhSachGiayToSoHoa(data)
      },
      changePage (config) {
        let vm = this
        vm.documentPage = config.page - 1
        vm.getDanhSachGiayToSoHoa(vm.dataInputSearch)
      },
      getDanhSachGiayToSoHoa (dataSearch) {
        let vm = this
        let filter = {
          page: vm.documentPage,
          size: vm.numberPerPage,
          keyword: dataSearch ? dataSearch.keyword : '',
          coQuanBanHanh_MaDinhDanh: dataSearch ? dataSearch.govAgencyCode : '',
          mauGiayTo_MaMuc: dataSearch ? dataSearch.fileTemplateNo : '',
          ngayBanHanh_TuNgay: dataSearch ? dataSearch.fromReceiveDateFormatted : '',
          ngayBanHanh_DenNgay: dataSearch ? dataSearch.toReceiveDateFormatted : '',
          hieuLucGiayTo_MaMuc: dataSearch ? dataSearch.status : '',
          orderFields: 'ThoiGianTao',
          orderType: 'desc',
          cccd: dataSearch ? dataSearch.applicantIdNo : '',
          collection: 'giaytocanhantochuc',
          trangThaiChiaSe: vm.originality == 3 ? '1,2' : ''
        }

        vm.loadingTable = true
        vm.$store.dispatch('getGiayToKhoCaNhan', filter).then(function (result) {
          vm.documentApplicantList = result.content
          vm.totalDocument = result['totalElements']
          vm.loadingTable = false
        }).catch(function () {
          vm.loadingTable = false
          vm.documentApplicantList = []
          vm.totalDocument = 0
        })
      },
      downloadDocument (item) {
        let vm = this
        if (vm.loadingPdf) {
          return
        }
        vm.srcDownload = ''
        let filter = {
          id: item.MaDinhDanh,
          collection: 'giaytoluutruso'
        }
        vm.loadingPdf = true
        vm.$store.dispatch('getTepDuLieu', filter).then(function (result) {
          vm.loadingPdf = false
          vm.srcDownload = result
          setTimeout(function () {
            document.getElementById('downloadFile').click()
          }, 100)
        }).catch(function () {
          vm.loadingPdf = false
        })
      },
      viewDocument (item) {
        let vm = this
        if (vm.loadingPdf) {
          return
        }
        vm.srcDownload = ''
        let filter = {
          id: item.MaDinhDanh,
          collection: 'giaytoluutruso'
        }
        vm.loadingPdf = true
        vm.$store.dispatch('getTepDuLieu', filter).then(function (result) {
          vm.loadingPdf = false
          let fileType = item.Ext.toLowerCase()
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
          vm.loadingPdf = false
        })
      },
      cloneMyStorage (item) {
        let vm = this
      },
      formatDate () {
        let vm = this
        let lengthDate = String(vm.createDate).trim().length
        let splitDate = String(vm.createDate).split('/')
        if (lengthDate && lengthDate > 4 && splitDate.length === 3 && splitDate[2]) {
          vm.createDate = vm.translateDate(vm.createDate)
        } else if (lengthDate && lengthDate === 8) {
          let date = String(vm.createDate)
          vm.createDate = date.slice(0,2) + '/' + date.slice(2,4) + '/' + date.slice(4,8)
        } else {
          vm.createDate = ''
        }     
      },
      formatExpireDate () {
        let vm = this
        let lengthDate = String(vm.expireDate).trim().length
        let splitDate = String(vm.expireDate).split('/')
        if (lengthDate && lengthDate > 4 && splitDate.length === 3 && splitDate[2]) {
          vm.expireDate = vm.translateDate(vm.expireDate)
        } else if (lengthDate && lengthDate === 8) {
          let date = String(vm.expireDate)
          vm.expireDate = date.slice(0,2) + '/' + date.slice(2,4) + '/' + date.slice(4,8)
        } else {
          vm.expireDate = ''
        }     
      },
      translateDate (date) {
        if (!date) return null
        const [day, month, year] = date.split('/')
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
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
      convertDate (date) {
        if (!date) {
          return ''
        }
        let date1 = new Date(date)
        return `${date1.getDate().toString().padStart(2, '0')}/${(date1.getMonth() + 1).toString().padStart(2, '0')}/${date1.getFullYear()}`
      },
      convertMaDinhDanh (mdd) {
        if (!mdd) {
          return ""
        }
        let cccd = mdd.split(":")[1]
        return cccd
      },
      getDocumentTypeIcon (type) {
        let typeDoc = 'doc,docx'
        let typeExcel = 'xls,xlsx'
        let typeImage = 'png,jpg,jpeg'
        if (type) {
          if (typeDoc.indexOf(String(type).toLowerCase()) >= 0) {
            return {
              icon: 'fas fa fa-file-word-o',
              color: 'blue',
              size: 14
            }
          } else if (typeExcel.indexOf(String(type).toLowerCase()) >= 0) {
            return {
              icon: 'fas fa fa-file-excel-o',
              color: 'green',
              size: 14
            }
          } else if (String(type).toLowerCase() === 'pdf') {
            return {
              icon: 'fa fa-file-pdf-o',
              color: 'red',
              size: 14
            }
          } else if (typeImage.indexOf(String(type).toLowerCase()) >= 0) {
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
    }
  }
</script>

