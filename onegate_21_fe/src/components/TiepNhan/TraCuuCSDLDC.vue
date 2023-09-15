<template>
  <v-card-text class="py-1">
    <v-form ref="formLgsp" v-model="valid" class="py-3 px-0 grid-list" v-if="reRender">
      <v-layout row wrap class="px-0 py-0">
        <v-flex xs12>
          <v-text-field id="soCanCuocTraCuu" label="Số CCCD hoặc số CMND" v-model="applicantIdNoLgsp"
            box clearable :rules="[rules.required, rules.credit]">
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Họ và tên" v-model="applicantNameLgsp" :rules="[rules.required]" box clearable></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-menu
            ref="menuApplicantIdDate"
            :close-on-content-click="false"
            v-model="menuApplicantIdDate"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              label="Ngày sinh"
              :rules="[rules.required]"
              box
              slot="activator"
              v-model="applicantBirthDate"
              append-icon="event"
              @blur="ngaysinh = parseDate(applicantBirthDate)"
              placeholder="dd/mm/yyyy"
              mask="##/##/####"
            ></v-text-field>
            <v-date-picker min="1900-01-01" :max="getMaxdate()" ref="picker"
            :first-day-of-week="1" locale="vi" v-model="ngaysinh" no-title @input="menuApplicantIdDate = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 class="text-right">
          <v-btn color="primary"
            @click="searchLgspCongDan"
            :loading="loadingSearchLgsp"
            :disabled="loadingSearchLgsp"
            class="mx-0 my-0"
          >
            <v-icon size="20">search</v-icon>
            &nbsp;
            Tra cứu CSDL dân cư
            <span slot="loader">Đang tải...</span>
          </v-btn>
        </v-flex>
        
      </v-layout>
    </v-form>
    <div>
      <div v-if="applicantLgspInfomation !== ''" class="mx-1 flex mb-3">
        <v-alert outline :color="lgspAlertColor" icon="warning" :value="true">
          {{messageLgsp}}
        </v-alert>
      </div>
      <v-layout wrap v-if="applicantLgspInfomation && lgspAlertColor == 'green'">
        <v-flex xs12 md6 class="pr-2">
          <div>
            <table class="datatable table my-3" style="border-top: 1px solid #dedede;">
              <tbody>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Họ và tên công dân</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.HoVaTen.Ten}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Số định danh cá nhân/ CCCD</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.SoDinhDanh}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Số chứng minh nhân dân</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.SoCMND}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Ngày sinh</span></td>
                  <td class="pt-2"><span>{{formatNgaySinh(applicantLgspInfomation.NgayThangNamSinh.NgayThangNam)}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Giới tính</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.GioiTinh == '1' ? 'Nam' : (applicantLgspInfomation.GioiTinh == '2' ? 'Nữ' : 'Chưa có thông tin')}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Quốc tịch</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.QuocTich == 'VN' ? 'Việt Nam' : applicantLgspInfomation.QuocTich}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Dân tộc</span></td>
                  <td class="pt-2"><span>{{getTenDanhMuc(applicantLgspInfomation.DanToc, 'dantoc')}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Tôn giáo</span></td>
                  <td class="pt-2"><span>{{getTenDanhMuc(applicantLgspInfomation.TonGiao, 'tongiao')}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Địa chỉ thường trú</span></td>
                  <td class="pt-2">
                    <span>{{applicantLgspInfomation.ThuongTru.ChiTiet}}</span>
                    <span>, {{diaChiThuongTruTraCuuQr}}</span>
                  </td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Nơi ở hiện tại</span></td>
                  <td class="pt-2">
                    <span>{{noiOHienTaiTraCuuQr}}</span>
                  </td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Nhóm máu</span></td>
                  <td class="pt-2"><span>{{getNhomMau(applicantLgspInfomation.NhomMau)}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Tình trạng hôn nhân</span></td>
                  <td class="pt-2"><span>{{getTinhTrangHonNhan(applicantLgspInfomation.TinhTrangHonNhan)}}</span></td>
                </tr>

                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Họ và tên vợ/ chồng</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.VoChong.HoVaTen}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Quốc tịch</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.VoChong.QuocTich == 'VN' ? 'Việt Nam' : applicantLgspInfomation.VoChong.QuocTich}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Số định danh cá nhân/ CCCD</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.VoChong.SoDinhDanh}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Số chứng minh nhân dân</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.VoChong.SoCMND}}</span></td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </v-flex>
        <v-flex xs12 md6 class="pl-2">
          <div>
            <table class="datatable table my-3" style="border-top: 1px solid #dedede;">
              <tbody>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Số sổ hộ khẩu</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.SoSoHoKhau}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Chủ hộ</span></td>
                  <td class="pt-2">
                    <p>{{applicantLgspInfomation.ChuHo.HoVaTen}}</p>
                    <p>Quan hệ: {{ applicantLgspInfomation.ChuHo.QuanHe }}</p>
                    <p>Số CMND: {{ applicantLgspInfomation.ChuHo.SoCMND }}</p>
                    <p>Số định danh: {{ applicantLgspInfomation.ChuHo.SoDinhDanh }}</p>
                  </td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Họ và tên cha</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.Cha.HoVaTen}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Quốc tịch</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.Cha.QuocTich == 'VN' ? 'Việt Nam' : applicantLgspInfomation.Cha.QuocTich}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Số định danh cá nhân/ CCCD</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.Cha.SoDinhDanh}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Số chứng minh nhân dân</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.Cha.SoCMND}}</span></td>
                </tr>
                
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Họ và tên mẹ</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.Me.HoVaTen}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Quốc tịch</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.Me.QuocTich == 'VN' ? 'Việt Nam' : applicantLgspInfomation.Me.QuocTich}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Số định danh cá nhân/ CCCD</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.Me.SoDinhDanh}}</span></td>
                </tr>
                <tr>
                  <td width="200" class="pt-2"><span class="text-bold">Số chứng minh nhân dân</span></td>
                  <td class="pt-2"><span>{{applicantLgspInfomation.Me.SoCMND}}</span></td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </v-flex>
      </v-layout>
      
      <v-flex xs12 class="text-right my-2" v-if="applicantLgspInfomation">
        <v-btn color="primary"
          @click="binDataCsdldc"
          class="mx-0 my-0 mr-2"
          v-if="applicantLgspInfomation"
        >
          <v-icon size="20">save_alt</v-icon>
          &nbsp;
          Lấy thông tin
        </v-btn>
      </v-flex>
    </div>
  </v-card-text>
</template>
  
  <script>
  
  import Vue from 'vue'
  import toastr from 'toastr'
  import support from '../../store/support.json'
  Vue.use(toastr)
  export default {
    props: ['applicantIdNoProps', 'applicantNameProps', 'detailDossier'],
    components: {
    },
    data: () => ({
      reRender: true,
      danhmuctongiao: support.danhmuctongiao,
      danhmucdantoc: support.danhmucdantoc,
      citys: support.danhMucTinhThanh,
      diaChiThuongTruTraCuuQr: '',
      noiOHienTaiTraCuuQr: '',
      applicantIdNoLgsp: '',
      applicantNameLgsp: '',
      menuApplicantIdDate: false,
      applicantBirthDate: null,
      ngaysinh: null,
      menuApplicantIdDate: false,
      loadingSearchLgsp: false,
      applicantLgspInfomation: '',
      messageLgsp: '',
      warningLgsp: false,
      lgspAlertColor: 'primary',
      valid: false,
      rules: {
        required: (value) => !!value || 'Thông tin bắt buộc',
        cmndHoChieu: (value) => {
          const pattern = /^(?![0-9]{4,12})[0-9a-zA-Z]{4,12}$/
          return pattern.test(value) || 'Gồm các ký tự 0-9, a-z và ít nhất 4-12 ký tự'
        },
        email: (value) => {
          value = value.trim()
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Địa chỉ Email không hợp lệ'
        },
        passWord: (value) => {
          const pattern = /^(?![0-9]{6,})[0-9a-zA-Z]{6,}$/
          return pattern.test(value) || 'Gồm các ký tự 0-9, a-z và ít nhất 6 ký tự'
        },
        telNo: (value) => {
          const pattern = /^([0-9]{0,})$/
          if(typeof value === 'string'){
            value = value.trim()
          }
          return pattern.test(value) || 'Gồm các ký tự 0-9'
        },
        credit: (value) => {
          if (value) {
            if (value.length === 9) {
              const pattern = /^(([0-9]{9,9}))$/
              return pattern.test(value) || 'Số CCCD, số CMND gồm 9 hoặc 12 ký tự 0-9'
            } else {
              const pattern = /^(([0-9]{12,12}))$/
              return pattern.test(value) || 'Số CCCD, số CMND gồm 9 hoặc 12 ký tự 0-9'
            }
          } else {
            return true
          }
        },
        varchar50: (val) => {
          if(val){
            val = String(val).trim()
            return val.length <= 50 ? true : 'Không được nhập quá 50 ký tự'   
          } else {
            return true
          }  
        },
        varchar100: (val) => {
          if(val){
            val = String(val).trim()
            return val.length <= 100 ? true : 'Không được nhập quá 100 ký tự'   
          } else {
            return true
          }
        },
        varchar255: (val) => {
          if(val){
            val = String(val).trim()
            return val.length <= 255 ? true : 'Không được nhập quá 255 ký tự'   
          } else {
            return true
          }  
        },
        varchar500: (val) => {
          if(val){
            val = String(val).trim()
            return val.length <= 500 ? true : 'Không được nhập quá 500 ký tự'   
          } else {
            return true
          }  
        },
        varchar5000: (val) => {
          if(val){
            val = String(val).trim()
            return val.length <= 5000 ? true : 'Không được nhập quá 5000 ký tự'   
          } else {
            return true
          }
        },
      },
    }),
    computed: {
      originality () {
        let vm = this
        return vm.getOriginality()
      },
      userLoginInfomation () {
        return this.$store.getters.getUserLogin
      },
      activeBindApplicantLgsp () {
        return this.$store.getters.activeBindApplicantLgsp
      },
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        let vm = this
        let currentParams = newRoute.params
        let currentQuery = newRoute.query
      },
      ngaysinh (val) {
        this.applicantBirthDate = this.formatDate(val)
      },
      menuApplicantIdDate (val) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    created () {
      let vm = this
      vm.$nextTick(function () {
        let current = vm.$router.history.current
        let query = vm.$router.history.current.query
      })
    },
    mounted () {
      let vm = this
    },
    methods: {
      initData () {
        let vm = this
        vm.reRender = false
        vm.applicantIdNoLgsp = vm.applicantIdNoProps
        vm.applicantNameLgsp = vm.applicantNameProps
        vm.applicantBirthDate = null
        vm.applicantLgspInfomation = ''
        vm.reRender = true
        setTimeout(function () {
          vm.$refs.formLgsp.resetValidation()
        }, 100)
      },
      searchLgspCongDan (event) {
        let vm = this
        if (vm.applicantIdNoLgsp && vm.applicantNameLgsp && String(vm.applicantIdNoLgsp).trim() && String(vm.applicantNameLgsp).trim() && vm.applicantBirthDate && String(vm.applicantBirthDate).length === 8) {
          let dateInput = ''
          if (String(vm.applicantBirthDate).indexOf('/') > 0) {
            let date = String(vm.applicantBirthDate).split('/')
            dateInput = date[2] + '-' + date[1] + '-' + date[0]
          } else {
            dateInput = String(vm.applicantBirthDate).substring(4,8) + '-' + String(vm.applicantBirthDate).substring(2,4) + '-' + String(vm.applicantBirthDate).substring(0,2)
          }
          let filter = {
            applicantIdNo: event === 'auto' ? String(vm.applicantIdNoProps).trim() : String(vm.applicantIdNoLgsp).trim(),
            applicantName: event === 'auto' ? vm.convertString((String(vm.applicantNameProps).trim())).toUpperCase() : vm.convertString(String(vm.applicantNameLgsp).trim()).toUpperCase(),
            birthDate: dateInput,
            StaffEmail : vm.userLoginInfomation && vm.userLoginInfomation.hasOwnProperty('employeeEmail') ? vm.userLoginInfomation.employeeEmail : '',
            GovAgencyCode: vm.detailDossier ? vm.detailDossier.govAgencyCode : '',
            MaDVC: vm.detailDossier ? vm.detailDossier.serviceCode : ''
          }
          vm.loadingSearchLgsp = true
          vm.$store.dispatch('searchLgspCongDan', filter).then(result => {
            vm.loadingSearchLgsp = false
            vm.applicantLgspInfomation = result
            vm.warningLgsp = false
            if (vm.applicantLgspInfomation && vm.applicantLgspInfomation.hasOwnProperty('SoLuongCongDan') && String(vm.applicantLgspInfomation["SoLuongCongDan"]) != '0') {
              vm.lgspAlertColor = 'green'
              vm.warningLgsp = true
              vm.messageLgsp = 'Số CCCD/ CMND: "' + vm.applicantIdNoLgsp + '", họ tên: "' + vm.applicantNameLgsp + '" có thông tin trên CSDL quốc gia về dân cư'
              // vm.dialog_searchLgsp = false
              // Lấy thông tin thường trú
              let dataThuongTru = {
                ThuongTruTinhThanh: '',
                ThuongTruQuanHuyen: '',
                ThuongTruXaPhuong: ''
              }
              let city = vm.citys.find(function (item) {
                return item.itemCode == vm.applicantLgspInfomation.ThuongTru.MaTinhThanh
              })
              dataThuongTru.ThuongTruTinhThanh = city ? city.itemName : ''
              if (city) {
                vm.$store.getters.getDictItems({
                  collectionCode: 'ADMINISTRATIVE_REGION',
                  level: 1,
                  parent: city.itemCode
                }).then(function (resultDistricts) {
                  let quanhuyen = resultDistricts.data.find(function (item) {
                    return item.itemCode == vm.applicantLgspInfomation.ThuongTru.MaQuanHuyen
                  })
                  dataThuongTru.ThuongTruQuanHuyen = quanhuyen ? quanhuyen.itemName : ''
                  if (quanhuyen) {
                    vm.$store.getters.getDictItems({
                      collectionCode: 'ADMINISTRATIVE_REGION',
                      level: 1,
                      parent: quanhuyen.itemCode
                    }).then(function (resultWards) {
                      let xaphuong = resultWards.data.find(function (item) {
                        return item.itemCode == vm.applicantLgspInfomation.ThuongTru.MaPhuongXa
                      })
                      dataThuongTru.ThuongTruXaPhuong = xaphuong ? xaphuong.itemName : ''
                      vm.diaChiThuongTruTraCuuQr = dataThuongTru.ThuongTruXaPhuong + ', ' + dataThuongTru.ThuongTruQuanHuyen + ', ' + dataThuongTru.ThuongTruTinhThanh
                      console.log('diaChiThuongTruTraCuuQr', vm.diaChiThuongTruTraCuuQr)
                    })
                  }
                })
              }

              let dataNoiOHienTai = {
                TinhThanh: '',
                QuanHuyen: '',
                XaPhuong: ''
              }
              let city1 = vm.citys.find(function (item) {
                return item.itemCode == vm.applicantLgspInfomation.NoiOHienTai.MaTinhThanh
              })
              dataNoiOHienTai.TinhThanh = city1 ? city1.itemName : ''
              if (city1) {
                vm.$store.getters.getDictItems({
                  collectionCode: 'ADMINISTRATIVE_REGION',
                  level: 1,
                  parent: city1.itemCode
                }).then(function (resultDistricts) {
                  let quanhuyen = resultDistricts.data.find(function (item) {
                    return item.itemCode == vm.applicantLgspInfomation.NoiOHienTai.MaQuanHuyen
                  })
                  dataNoiOHienTai.QuanHuyen = quanhuyen ? quanhuyen.itemName : ''
                  if (quanhuyen) {
                    vm.$store.getters.getDictItems({
                      collectionCode: 'ADMINISTRATIVE_REGION',
                      level: 1,
                      parent: quanhuyen.itemCode
                    }).then(function (resultWards) {
                      let xaphuong = resultWards.data.find(function (item) {
                        return item.itemCode == vm.applicantLgspInfomation.NoiOHienTai.MaPhuongXa
                      })
                      dataNoiOHienTai.XaPhuong = xaphuong ? xaphuong.itemName : ''
                      vm.noiOHienTaiTraCuuQr = vm.applicantLgspInfomation.NoiOHienTai.ChiTiet + ' ' + dataNoiOHienTai.XaPhuong + ', ' + dataNoiOHienTai.QuanHuyen + ', ' + dataNoiOHienTai.TinhThanh
                    })
                  }
                })
              }
              // 
            } else {
              // vm.dialog_searchLgsp = true
              vm.lgspAlertColor = 'red'
              vm.warningLgsp = true
              vm.messageLgsp = 'Số CCCD/ CMND: "' + vm.applicantIdNoLgsp + '", họ tên: "' + vm.applicantNameLgsp + '" không có thông tin trên CSDL quốc gia về dân cư'
            }
          }).catch(function (result) {
            vm.lgspAlertColor = 'red'
            vm.loadingSearchLgsp = false
            vm.applicantLgspInfomation = false
            vm.warningLgsp = true
            vm.messageLgsp = "Số CCCD/ CMND: " + String(vm.applicantIdNoLgsp).trim() + ", họ tên: " + String(vm.applicantNameLgsp).trim() + " không có thông tin trên CSDL quốc gia về dân cư"
            
            if (result.hasOwnProperty('errorCode')) {
              let errorCode = result.errorCode
              switch(errorCode) {
                case "004":
                  vm.messageLgsp = "Thủ tục chưa được cấp phép khai thác CSDL dân cư";
                  break;
                case "005":
                  vm.messageLgsp = "Tài khoản cán bộ không có quyền thao tác";
                  break;
                default:
                  vm.messageLgsp = "Số CCCD/ CMND: " + String(vm.applicantIdNoLgsp).trim() + ", họ tên: " + String(vm.applicantNameLgsp).trim() + " không có thông tin trên CSDL quốc gia về dân cư"
              }
            }
          })
        } else {
          toastr.error('Vui lòng nhập đầy đủ số CCCD/ CMND, họ tên và ngày sinh để tra cứu')
        }
      },
      binDataCsdldc () {
        let vm = this
        vm.$store.commit('setApplicantInfomationLgsp', vm.applicantLgspInfomation)
        setTimeout(function () {
          vm.$store.commit('setActiveBindApplicantLgsp', !vm.activeBindApplicantLgsp)
        }, 200)
      },
      getTinhTrangHonNhan(tinhtrang) {
        if (tinhtrang == '2') {
          return 'Đang có vợ/ chồng'
        } else if (tinhtrang == '1') {
          return 'Chưa kết hôn'
        } else if (tinhtrang == '3') {
          return 'Đã ly hôn hoặc góa vợ/ chồng'
        } else {
          return 'Chưa có thông tin'
        }
      },
      getTenDanhMuc (code, danhmuc) {
        let vm = this
        if (code !== null && code !== '') {
          if (danhmuc === 'tongiao') {
            let dm = vm.danhmuctongiao.find(function (item) {
              return Number(item.TONGIAO) == Number(code)
            })
            return dm ? dm.TENTONGIAO : ''
          } else if (danhmuc === 'dantoc') {
            let dm = vm.danhmucdantoc.find(function (item) {
              return Number(item.MADANTOC) == Number(code)
            })
            return dm ? dm.TENGOI : ''
          } else {
            return ''
          }
        } else {
          return ''
        }
      },
      getNhomMau(nhommau) {
        if (nhommau == '00') {
          return 'Chưa có thông tin'
        } else if (nhommau == '01') {
          return 'Nhóm máu A'
        } else if (nhommau == '02') {
          return 'Nhóm máu B'
        } else if (nhommau == '03') {
          return 'Nhóm máu AB'
        } else if (nhommau == '04') {
          return 'Nhóm máu O'
        } else {
          return 'Chưa có thông tin'
        }
      },
      convertString(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        str = str.replace(/đ/g, 'd')
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
        str = str.replace(/Đ/g, 'D')
        str = str.toLocaleLowerCase().replace(/\s/g, '')
        return str
      },
      parseDate(date) {
        if (!date) return null
        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      formatDate(date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      getMaxdate () {
        let date = new Date()
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
      },
      formatNgaySinh (date) {
        if (!date) {
          return ''
        }
        let dateStr = String(date)
        return dateStr.slice(6,8) + '/' + dateStr.slice(4,6) + '/' + dateStr.slice(0,4)
      }
    }
  }
  </script>
  