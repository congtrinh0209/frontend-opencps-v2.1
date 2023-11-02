<template>
  <div style="padding: 0px 0px; max-width: 1500px; margin: 0px auto;border-radius: 12px" class="pb-3" id="top-header">
    <v-card-text class="py-1" style="background: #fff;">
      <v-form id="form-search" ref="formStorageKqxl" v-model="validFormStorageKqxl" lazy-validation class="py-3 px-0 grid-list">
        <v-layout row wrap class="px-0">
          <v-flex v-if="originality == 3" xs12 md6 class="py-0">
            <div class="mb-1">Mã định danh chủ sở hữu <span style="color: red"> (*)</span></div>
            <v-text-field
              v-model="applicantIdNoToStorage"
              solo
              flat
              height="32"
              min-height="32"
              clearable
              :rules="[v => !!v || 'Thông tin bắt buộc']"
              required
            ></v-text-field>
          </v-flex>
          <v-flex v-if="originality == 3" xs12 md6 class="py-0">
            <div class="mb-1">Tên chủ sở hữu <span style="color: red"> (*)</span></div>
            <v-text-field
              v-model="applicantNameToStorage"
              solo
              flat
              height="32"
              min-height="32"
              clearable
              :rules="[v => !!v || 'Thông tin bắt buộc']"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="py-0">
            <div class="mb-1">Tên giấy tờ <span style="color: red"> (*)</span></div>
            <v-text-field 
              v-model="tenGiayToStorage" solo flat
              :rules="[v => !!v || 'Thông tin bắt buộc']"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 :class="khoTaiLieuTapTrung ? 'py-0 md6' : 'py-0'">
            <div class="mb-1">Số hiệu giấy tờ <span style="color: red"> (*)</span></div>
            <v-text-field label="Số hiệu giấy tờ" v-model="soHieuGiayToStorage" solo flat
            :rules="[v => !!v || 'Thông tin bắt buộc']"
            required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 class="py-0" v-if="khoTaiLieuTapTrung">
            <div class="mb-1">Loại văn bản điện tử <span style="color: red"> (*)</span></div>
            <v-autocomplete
              :items="loaiVanBanList"
              v-model="loaiVanBanCreate"
              item-text="TenMuc"
              item-value="MaMuc"
              solo flat
              return-object
              :rules="[v => !!v || 'Thông tin bắt buộc']"
              required
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 class="py-0">
            <div class="mb-1">Cơ quan ban hành <span style="color: red"> (*)</span></div>
            <v-autocomplete
              v-if="khoTaiLieuTapTrung"
              :items="donViList"
              v-model="coQuanBanHanhStorage"
              ref="autocomplete1"
              :search-input.sync="keywordSearchDonVi"
              item-text="TenGoi"
              item-value="MaDinhDanh"
              return-object
              clearable
              solo flat
              :rules="[v => !!v || 'Thông tin bắt buộc']"
              required
            >
              <template v-slot:append-item>
                <div class="py-2" v-if="isShowDonVi"
                  v-observe-visibility="{
                    callback: visibilityChangedDonVi
                  }"
                >
                </div>
              </template>
            </v-autocomplete>
            <v-text-field v-else v-model="coQuanBanHanhStorage" solo flat
            :rules="[v => !!v || 'Thông tin bắt buộc']"
            required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 class="py-0">
            <div class="mb-1">Ngày ban hành</div>
            <v-text-field
              v-model="createDateStorage"
              placeholder="dd/mm/yyyy, ddmmyyyy"
              @blur="formatDate"
              solo flat
              clearable
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 class="py-0">
            <div class="mb-1">Ngày hết hạn</div>
            <v-text-field
              v-model="expireDateStorage"
              placeholder="dd/mm/yyyy, ddmmyyyy"
              @blur="formatExpireDate"
              solo flat
              clearable
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="py-0" v-if="khoTaiLieuTapTrung">
            <div class="mb-1">Hiệu lực giấy tờ <span style="color: red"> (*)</span></div>
            <v-autocomplete
              :items="statusList"
              v-model="statusCreate"
              item-text="TenMuc"
              item-value="MaMuc"
              solo flat
              return-object
              :rules="[v => !!v || 'Thông tin bắt buộc']"
              required
            ></v-autocomplete>
          </v-flex>
        </v-layout>
      </v-form>
      <v-flex class="mb-3">
        <v-btn v-if="khoTaiLieuTapTrung" class="" color="primary" @click.native="addKhoCaNhanTapTrung"
          :loading="loading"
          :disabled="loading"
        >
          <v-icon>save</v-icon> &nbsp;
          Đồng ý
        </v-btn>
        <v-btn v-else class="mr-3" color="primary" @click.native="addApplicantData"
          :loading="loading"
          :disabled="loading"
        >
          <v-icon>save</v-icon> &nbsp;
          Đồng ý
        </v-btn>
      </v-flex>
    </v-card-text>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import toastr from 'toastr'
  Vue.use(toastr)

  toastr.options = {
    'positionClass': 'toast-top-center',
    'timeOut': '5000'
  }
  export default {
    components: {},
    props: ['fileKhoGiayTo', 'partKhoGiayTo', 'thongTinHoSo'],
    data: () => ({
      validFormStorageKqxl: false,
      applicantIdNoToStorage: "",
      applicantNameToStorage: "",
      tenGiayToStorage: "",
      soHieuGiayToStorage: "",
      loaiVanBanList: [],
      loaiVanBanCreate: "",
      donViList: [],
      coQuanBanHanhStorage: "",
      keywordSearchDonVi: "",
      isShowDonVi: false,
      pageSelectDonVi: 0,
      totalItemsSelectDonVi: 0,
      timeOutSearch1: "",
      createDateStorage: "",
      expireDateStorage: "",
      statusList: [],
      statusCreate: "",
      loading: false,
      khoTaiLieuTapTrung: false
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
      try {
        vm.khoTaiLieuTapTrung = khoTaiLieuTapTrung
      } catch (error) {
      }
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        let vm = this
        let currentQuery = newRoute.query
      },
      keywordSearchDonVi(val) {
        let vm = this
        if (vm.donViList.length) {
          if (val && val !== vm.coQuanBanHanhStorage['TenGoi']) {
            if (vm.timeOutSearch1) {
              clearTimeout(vm.timeOutSearch1);
            }
            vm.timeOutSearch1 = setTimeout(function () {
              let exits = vm.donViList.find(function (item) {
                return String(item.TenGoi).toLowerCase().includes(String(val).toLowerCase())
              })
              if (!exits) {
                vm.searchItemsDonVi()
              }
            }, 1000)
          }
        } else {
          if (vm.timeOutSearch1) {
            clearTimeout(vm.timeOutSearch1);
          }
          vm.timeOutSearch1 = setTimeout(function () {
            vm.searchItemsDonVi()
          }, 1000)
        }     
      }
    },
    methods: {
      initData () {
        let vm = this
        vm.tenGiayToStorage = vm.partKhoGiayTo.partName
        vm.applicantIdNoToStorage = vm.thongTinHoSo['applicantIdNo']
        vm.applicantNameToStorage = vm.thongTinHoSo['applicantName']
        vm.keywordSearchDonVi = ''
        if (vm.khoTaiLieuTapTrung) {
          vm.searchItemsDonVi()
          vm.getLoaiGiayTo()
          vm.getHieuLuc()
        } else {
          vm.coQuanBanHanhStorage = vm.thongTinHoSo.govAgencyName
        }
      },
      validate () {
        return this.$refs.formStorageKqxl.validate()
      },
      exportData () {
        let vm = this
        let data = {
          applicantIdNoToStorage: vm.applicantIdNoToStorage,
          applicantNameToStorage: vm.applicantNameToStorage,
          tenGiayToStorage: vm.tenGiayToStorage,
          soHieuGiayToStorage: vm.soHieuGiayToStorage,
          loaiVanBanCreate: vm.loaiVanBanCreate,
          coQuanBanHanhStorage: vm.coQuanBanHanhStorage,
          createDateStorage: vm.createDateStorage,
          expireDateStorage: vm.expireDateStorage,
          statusCreate: vm.statusCreate,
        }
        return data
      },
      getLoaiGiayTo () {
        let vm = this
        let filter = {
          page: 0,
          size: 100,
          tenDanhMuc: 'loaivanbandientu'
        }
        vm.$store.dispatch('getDanhMuc', filter).then(function (result) {
          if (result.hasOwnProperty('content')) {
            vm.loaiVanBanList = result.content
          } else {
            vm.loaiVanBanList = []
          }
        }).catch(function () {
        })
      },
      getHieuLuc () {
        let vm = this
        let filter = {
          page: 0,
          size: 100,
          tenDanhMuc: 'hieulucvanban'
        }
        vm.$store.dispatch('getDanhMuc', filter).then(function (result) {
          if (result.hasOwnProperty('content')) {
            vm.statusList = result.content
          } else {
            vm.statusList = []
          }
        }).catch(function () {
        })
      },
      addApplicantData () {
        let vm = this
        console.log('vm.partKhoGiayTo', vm.partKhoGiayTo)
        console.log('vm.fileKhoGiayTo', vm.fileKhoGiayTo)
        vm.loading = true
        let param = {
          headers: {
            groupId: window.themeDisplay ? window.themeDisplay.getScopeGroupId() : '',
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        let dataCreateFile = new FormData()
        let url = '/o/rest/v2/applicantdatas'
        dataCreateFile.append('fileTemplateNo', vm.partKhoGiayTo.fileTemplateNo ? vm.partKhoGiayTo.fileTemplateNo : vm.partKhoGiayTo.templateFileNo)
        dataCreateFile.append('status', 1)
        dataCreateFile.append('fileNo', vm.soHieuGiayToStorage)
        dataCreateFile.append('fileName', vm.tenGiayToStorage)
        dataCreateFile.append('applicantIdNo', vm.applicantIdNoToStorage)
        dataCreateFile.append('file', '')
        dataCreateFile.append('fileEntryId', vm.fileKhoGiayTo.hasOwnProperty('fileEntryId') ? vm.fileKhoGiayTo.fileEntryId : '')
        dataCreateFile.append('applicantName', vm.applicantNameToStorage)
        dataCreateFile.append('govAgencyName', vm.coQuanBanHanhStorage)
        dataCreateFile.append('serviceCode', vm.thongTinHoSo['serviceCode'])
        dataCreateFile.append('templateNo', vm.partKhoGiayTo.fileTemplateNo ? vm.partKhoGiayTo.fileTemplateNo : vm.partKhoGiayTo.templateFileNo)
        dataCreateFile.append('issueDate', vm.createDateStorage)
        dataCreateFile.append('expireDate', vm.expireDateStorage)
        dataCreateFile.append('desciption', '')
        dataCreateFile.append('dossierNo', vm.thongTinHoSo.dossierNo)
          
        axios.post(url, dataCreateFile, param).then(result1 => {
          vm.loading = false
          if (vm.originality == 3) {
            toastr.success('Số hóa giấy tờ thành công')
          } else {
            toastr.success('Lưu giấy tờ vào kho thành công')
          }
          vm.$emit('callBackSoHoaGiayTo', result1.data)
        }).catch(xhr => {
          vm.loading = false
          if (vm.originality == 3) {
            toastr.error('Số hóa giấy tờ thất bại')
          } else {
            toastr.error('Lưu giấy tờ vào kho thất bại')
          }
        })
      },
      addKhoCaNhanTapTrung () {
        let vm = this
        let valid = vm.$refs.formStorageKqxl.validate()
        if (!valid) {
          return
        }
        let dataCreate = {
          "NguoiTaoLap": {
            "MaDinhDanh": vm.applicantIdNoToStorage,
            "TenGoi": vm.applicantNameToStorage
          },
          "dossierFileId": vm.fileKhoGiayTo.dossierFileId,
          "TenGiayTo": vm.partKhoGiayTo.partName,
          "SoHieuVanBan": String(vm.soHieuGiayToStorage).trim(),
          "NgayBanHanh": vm.convertDateIso(vm.createDateStorage),
          "ThoiHanHieuLuc": vm.convertDateIso(vm.expireDateStorage),
          "CoQuanBanHanh": {
            "MaDinhDanh": vm.coQuanBanHanhStorage ? vm.coQuanBanHanhStorage['MaDinhDanh'] : '',
            "TenGoi": vm.coQuanBanHanhStorage ? vm.coQuanBanHanhStorage['TenGoi'] : ''
          },
          "HieuLucVanBan": {
            "MaMuc": vm.statusCreate ? vm.statusCreate['MaMuc'] : '',
            "TenMuc": vm.statusCreate ? vm.statusCreate['TenMuc'] : ''
          },
          "MaMauGiayTo": {
            "MaMuc": vm.partKhoGiayTo.fileTemplateNo ? vm.partKhoGiayTo.fileTemplateNo : vm.partKhoGiayTo.templateFileNo,
            "TenMuc": vm.partKhoGiayTo.partName
          },
          "ChuHoSo": {
            "MaDinhDanh": "",
            "TenGoi": ""
          },
          "LoaiVanBanDienTu": {
            "MaMuc": vm.loaiVanBanCreate ? vm.loaiVanBanCreate['MaMuc'] : '',
            "TenMuc": vm.loaiVanBanCreate ? vm.loaiVanBanCreate['TenMuc'] : ''
          },
          "ChuKhoLuuTru": {
            "MaDinhDanh": "",
            "TenGoi": ""
          },
          "TrangThaiChiaSe": 0,
          "TepDuLieu": [],
          "MaDinhDanh": "",
          "HoSoDichVuCong": {
            "MaDinhDanh": vm.thongTinHoSo.dossierNo
          },
          "SoLanTaiSuDung": 0,
          "TenLoaiVanBan": {
            "MaMuc": "",
            "TenMuc": ""
          },
          "TrichYeuVanBan": "",
          "HoSoLuuTruSo": {
            "MaDinhDanh": ""
          },
          "SoThuTu": 0,
          "ThuMucLuuTru": {
            "MaDinhDanh": "",
            "TenThuMuc": ""
          },
          "TrangThaiDuLieu": {
            "MaMuc": "",
            "TenMuc": ""
          },
          "PhanVungDuLieu": {
            "MaMuc": "",
            "TenMuc": ""
          }
        }
        if (vm.originality == 3) {
          dataCreate = {
            "dossierFileId": vm.fileKhoGiayTo.dossierFileId,
            "MaDinhDanh": "",
            "TenGiayTo": vm.partKhoGiayTo.partName,
            "MaThamChieu": "",
            "TenLoaiVanBan": {
              "MaMuc": "",
              "TenMuc": ""
            },
            "TrichYeuVanBan": "",
            "SoHieuVanBan": String(vm.soHieuGiayToStorage).trim(),
            "NgayBanHanh": vm.convertDateIso(vm.createDateStorage),
            "ThoiHanHieuLuc": vm.convertDateIso(vm.expireDateStorage),
            "CoQuanBanHanh": {
              "MaDinhDanh": vm.coQuanBanHanhStorage ? vm.coQuanBanHanhStorage['MaDinhDanh'] : '',
              "TenGoi": vm.coQuanBanHanhStorage ? vm.coQuanBanHanhStorage['TenGoi'] : ''
            },
            "HieuLucVanBan": {
              "MaMuc": vm.statusCreate ? vm.statusCreate['MaMuc'] : '',
              "TenMuc": vm.statusCreate ? vm.statusCreate['TenMuc'] : ''
            },
            "LoaiGiayToLuuTru": {
              "MaMuc": "01",
              "TenMuc": "Kết quả thủ tục hành chính"
            },
            "TepDuLieu": [],
            "ChuKhoLuuTru": {
              "MaDinhDanh": "",
              "TenGoi": ""
            },
            "HoSoLuuTruSo": {
              "MaDinhDanh": ""
            },
            "SoThuTu": 0,
            "ThuMucLuuTru": {
              "MaDinhDanh": "",
              "TenThuMuc": ""
            },
            "ChiaSeTaiKhoan": [],
            "ChiaSeVaiTro": [],
            "GiayToCaNhanToChuc": {
              "MaDinhDanh": "",
              "MaMauGiayTo": {
                "MaMuc": vm.partKhoGiayTo.fileTemplateNo ? vm.partKhoGiayTo.fileTemplateNo : vm.partKhoGiayTo.templateFileNo,
                "TenMuc": vm.partKhoGiayTo.partName
              },
              "ChuHoSo": {
                "MaDinhDanh": vm.applicantIdNoToStorage,
                "TenGoi": vm.applicantNameToStorage
              },
              "HoSoDichVuCong": {
                "MaDinhDanh": vm.thongTinHoSo.dossierNo
              },
              "TenGiayTo": "",
              "TenLoaiVanBan": {
                "MaMuc": "",
                "TenMuc": ""
              },
              "TrichYeuVanBan": "",
              "SoHieuVanBan": "",
              "NgayBanHanh": "",
              "ThoiHanHieuLuc": "",
              "TepDuLieu": [],
              "LoaiGiayToLuuTru": {
                "MaMuc": "01",
                "TenMuc": "Kết quả thủ tục hành chính"
              },
              "CoQuanBanHanh": {
                "MaDinhDanh": "",
                "TenGoi": ""
              },
              "HieuLucVanBan": {
                "MaMuc": "",
                "TenMuc": ""
              }
            },
            "TrangThaiDuLieu": {
              "MaMuc": "",
              "TenMuc": ""
            },
            "PhanVungDuLieu": {
              "MaMuc": "",
              "TenMuc": ""
            }
          }
        }
        console.log('dataCreate', dataCreate)
        let filter = {
          data: dataCreate,
          collection: vm.originality == 1 ? 'giaytocanhantochuc' : 'giaytoluutruso'
        }
        let data = JSON.stringify(filter.data)
        let config = {
          method: 'post',
          url: `/o/systemintegration/${filter.collection}`,
          headers: { 
            'groupId': window.themeDisplay.getScopeGroupId(),
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Token': Liferay.authToken
          },
          data : data
        };
        vm.loading = true
        axios.request(config)
        .then((response) => {
          if (vm.originality == 3) {
            toastr.success('Số hóa giấy tờ thành công')
            vm.$emit('callBackSoHoaGiayTo', response.data.resp)
          } else {
            toastr.success('Lưu giấy tờ vào kho thành công')
          }
          vm.loading = false
        })
        .catch((error) => {
          vm.loading = false
          if (vm.originality == 3) {
            toastr.error('Số hóa giấy tờ thất bại')
          } else {
            toastr.error('Lưu giấy tờ vào kho thất bại')
          }
        })
      },
      visibilityChangedDonVi (e) {
        e && this.loadMoreItemsDonVi();
      },
      searchItemsDonVi() {
        this.donViList = [];
        this.pageSelectDonVi = 0;
        this.loadMoreItemsDonVi();
      },
      loadMoreItemsDonVi() {
        let vm = this
        if (vm.donViList.length < vm.totalItemsSelectDonVi || vm.pageSelectDonVi == 0) {
          vm.isShowDonVi = false
          let filter = {
            page: vm.pageSelectDonVi,
            size: 20,
            keyword: vm.keywordSearchDonVi ? vm.keywordSearchDonVi : ''
          }
          vm.$store.dispatch('getDonVi', filter).then(results => {
            let res = results.hasOwnProperty('content') ? results['content'] : []
            vm.donViList = vm.donViList.concat(res);
            if (results.hasOwnProperty('content') && results['content'].length) {
              vm.isShowDonVi = true
              vm.pageSelectDonVi++
            }
            let total = results.hasOwnProperty('totalElements') ? results['totalElements'] : 0
            vm.totalItemsSelectDonVi = total
            if (vm.$refs.autocomplete1) {
              vm.$refs.autocomplete1.onScroll()
            }
          }).catch(xhr => {
          })
        }
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
      convertDateIso (dateString) {
        if (!dateString) {
          return ''
        }
        let parts = dateString.split('/')
        let day = parts[0]
        let month = parts[1]
        let year = parts[2]
        let date = new Date(`${year}-${month}-${day}`)
        let isoDate = date.toISOString()
        return isoDate
      },
    }
  }
</script>
  
  