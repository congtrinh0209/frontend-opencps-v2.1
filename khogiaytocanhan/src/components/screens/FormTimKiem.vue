<template>
  <div id="form-search">
    <v-card-text class="px-0 pt-0 pb-0">
        <v-row>
          <v-layout wrap class="mt-0">
            <v-flex class="px-0 xs12 md12">
              <div class="mb-1">Cơ quan ban hành</div>
              <v-autocomplete
                :items="donViList"
                v-model="dataSearch['govAgencyCode']"
                ref="autocomplete1"
                :loading="loadingDonVi"
                :search-input.sync="keywordSearchDonVi"
                item-text="TenGoi"
                item-value="MaDinhDanh"
                clearable
                solo
                flat
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
            </v-flex>
            <v-flex xs12 md12 class="px-0">
              <div class="mb-1">Mẫu giấy tờ</div>
              <v-autocomplete
                :items="fileTemplateList"
                v-model="dataSearch['fileTemplateNo']"
                ref="autocomplete"
                :loading="loading"
                :search-input.sync="keywordSearchSelect"
                item-text="TenMuc"
                item-value="MaMuc"
                clearable
                solo
                flat
              >
                <template slot="selection" slot-scope="{ item }">
                  <b class="labelCodeItemSelect">{{item.MaMuc}}</b>&nbsp;-&nbsp;{{item.TenMuc}}
                </template>
                <template slot="item" slot-scope="{ item }">
                  <b>{{item.MaMuc}}</b>&nbsp;-&nbsp;{{item.TenMuc}}
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
            <v-flex xs12 md3 class="">
              <div class="mb-1">Ngày ban hành</div>
              <v-menu
                ref="menuDate1"
                v-model="menuDate1"
                :close-on-content-click="true"
                transition="scale-transition"
                offset-y
                full-width
              >
                <v-text-field
                label="Từ ngày"
                slot="activator"
                class="search-input-appbar input-search"
                v-model="fromReceiveDateFormatted"
                persistent-hint
                append-icon="event"
                @blur="fromReceiveDate = parseDate(fromReceiveDateFormatted)"
                hide-details
                solo
                flat
                height="32"
                min-height="32"
                append-outer-icon="remove"
                >
                  <template slot='append-outer'>
                    <v-icon color="primary">remove</v-icon>
                  </template>
                </v-text-field>
                <v-date-picker :max="currentDate()" v-model="fromReceiveDate" locale="vi" :first-day-of-week="1" no-title @input="changeDate('1')"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 md3 class="pl-2 pr-3">
              <div class="mb-1" style="height: 20px;"></div>
              <v-menu
                ref="menuDate2"
                v-model="menuDate2"
                :close-on-content-click="true"
                transition="scale-transition"
                offset-y
                full-width
              >

                <v-text-field
                slot="activator"
                label="Đến ngày"
                class="search-input-appbar input-search"
                v-model="toReceiveDateFormatted"
                persistent-hint
                append-icon="event"
                @blur="toReceiveDate = parseDate(toReceiveDateFormatted)"
                hide-details
                solo
                flat
                height="32"
                min-height="32"
                ></v-text-field>
                <v-date-picker :min="fromReceiveDateFormatted ? getMinMax(fromReceiveDateFormatted) : null" :max="currentDate()" v-model="toReceiveDate" locale="vi" :first-day-of-week="1" no-title @input="changeDate('2')"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 md3 class="px-0">
              <!-- <div class="mb-1">Hiệu lực</div>
              <v-autocomplete
                :items="statusList"
                v-model="dataSearch['status']"
                item-text="TenMuc"
                item-value="MaMuc"
                clearable
                solo
                flat
              ></v-autocomplete> -->
              <div class="mb-1" style="height: 20px;"></div>
              <v-checkbox
                v-model="receiveDvcqg"
                label="Được lấy từ Cổng DVCQG"
                style="margin-top: 0px !important"
              ></v-checkbox>
            </v-flex>
            <!-- <v-flex xs12 md3 class="px-0">
              <div class="mb-1" style="height: 20px;"></div>
              <v-checkbox
                v-model="isDeleted"
                label="Đã xóa"
                style="margin-top: 0px !important"
              ></v-checkbox>
            </v-flex> -->
          </v-layout>
        </v-row>
        <v-flex class="text-right">
          <!-- <v-btn color="red" small class="mr-3 ml-0 white--text" @click="cancelSearch">
              <v-icon size="20">
              clear
              </v-icon> &nbsp;
              Thoát
          </v-btn> -->
          <v-btn color="#0072bc" small class="mx-0 white--text" @click="changeFilterSearch">
              <v-icon size="20">
              search
              </v-icon> &nbsp;
              Tìm kiếm
          </v-btn>
        </v-flex>
    </v-card-text>
    
  </div>
  
</template>

<script>
  export default {
    name: 'Search',
    props: ['form', 'inputSearch'],
    data () {
      return {
        donViList: [],
        fileTemplateList: [],
        statusList: [],
        dataSearch: {
          applicantName: '',
          applicantIdNo: '',
          fileTemplateNo: '',
          status: '',
          keywordSearch: '',
          fileNoSearch: '',
          name: '',
          dossierNo: '',
          govAgencyCode: '',
          fromReceiveDateFormatted: '',
          toReceiveDateFormatted: '',
          receiveDvcqg: false,
          isDeleted: false
        },
        isDvc: false,
        disableInput: false,
        menuDate1: false,
        menuDate2: false,
        fromReceiveDate: '',
        fromReceiveDateFormatted: '',
        toReceiveDate: '',
        toReceiveDateFormatted: '',

        loading: false,
        keywordSearchSelect: "",
        pageSelectBox: 0,
        totalItemsSelectBox: 0,
        timeOutSearch: "",
        isShow: true,

        loadingDonVi: false,
        keywordSearchDonVi: "",
        timeOutSearch1: "",
        isShowDonVi: false,
        pageSelectDonVi: 0,
        totalItemsSelectDonVi: 0

      }
    },
    created () {
      let vm = this
      if (vm.inputSearch) {
        vm.dataSearch = Object.assign(vm.dataSearch, vm.inputSearch)
      }
      vm.getDanhMucGiayTo()
      // vm.getDanhMucHieuLuc()
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        let vm = this
        let currentQuery = newRoute.query
        if (currentQuery.hasOwnProperty('applicantIdNo') && currentQuery.applicantIdNo) {
          vm.disableInput = true
        }
      },
      fromReceiveDateFormatted() {
        try {
          let vm = this
          vm.fromDate = vm.parseDate(vm.fromReceiveDateFormatted)
          vm.dataSearch['fromReceiveDateFormatted'] = vm.fromReceiveDateFormatted
        } catch (error) {
        }
      },
      toReceiveDateFormatted() {
        try {
          let vm = this
          vm.toDate = vm.parseDate(vm.toReceiveDateFormatted)
          vm.dataSearch['toReceiveDateFormatted'] = vm.toReceiveDateFormatted
        } catch (error) {
        }
      },
      keywordSearchSelect(val) {
        let vm = this
        if (vm.fileTemplateList.length) {
          if (val && val !== vm.dataSearch['fileTemplateNo']) {
            if (vm.timeOutSearch) {
              clearTimeout(vm.timeOutSearch);
            }
            vm.timeOutSearch = setTimeout(function () {
              let exits = vm.fileTemplateList.find(function (item) {
                return String(item.TenMuc).toLowerCase().includes(String(val).toLowerCase())
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
      keywordSearchDonVi(val) {
        let vm = this
        if (vm.donViList.length) {
          if (val && val !== vm.dataSearch['govAgencyCode']) {
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
    computed: {
    },
    methods: {
      getDataOutPut () {
        let vm = this
        return vm.dataSearch
      },
      resetForm () {
        let vm = this
        vm.dataSearch = {
          govAgencyCode: '',
          fileTemplateNo: '',
          status: '',
          fileNoSearch: '',
          fromReceiveDateFormatted: '',
          toReceiveDateFormatted: ''
        }
      },
      cancelSearch () {
        let vm = this
        vm.dataSearch = {
          applicantName: '',
          applicantIdNo: '',
          fileTemplateNo: '',
          status: '',
          keywordSearch: '',
          fileNoSearch: '',
          name: '',
          dossierNo: '',
          fromReceiveDateFormatted: '',
          toReceiveDateFormatted: ''
        },
        vm.$emit('trigger-cancel', vm.dataSearch)
      },
      changeFilterSearch () {
        let vm = this
        setTimeout(function () {
          vm.$emit('trigger-search', vm.dataSearch)
        }, 200)
      },
      getDanhMucGiayTo () {
        let vm = this
        let filter1 = {
          page: 0,
          size: 20,
          tenDanhMuc: 'mathanhphanhoso'
        }
        let filter2 = {
          page: 0,
          size: 20,
          tenDanhMuc: 'magiaytoketqua'
        }
        let req1 = vm.$store.dispatch('getDanhMuc', filter1)
        let req2 = vm.$store.dispatch('getDanhMuc', filter2)
        let arrAction = [req1, req2]
        Promise.all(arrAction).then(results => {
          let res = results[0]['content'].concat(results[1]['content'])
          vm.fileTemplateList = res
        }).catch(xhr => {
          vm.fileTemplateList = []
        })
      },
      getDanhMucHieuLuc () {
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
      parseDate(date) {
        if (!date) return ''
        if (String(date).indexOf('/') > 0) {
          const [day, month, year] = date.split('/')
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        } else if (String(date).indexOf('-') > 0) {
          const [day, month, year] = date.split('-')
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        } else {
          let date1 = new Date(Number(date))
          return `${date1.getFullYear()}-${(date1.getMonth() + 1).toString().padStart(2, '0')}-${date1.getDate().toString().padStart(2, '0')}`
        }
      },
      formatDate(date) {
        if (!date) return ''
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      currentDateFormat (date) {
        let date1 = date ? new Date(date) : new Date()
        return `${date1.getDate().toString().padStart(2, '0')}/${(date1.getMonth() + 1).toString().padStart(2, '0')}/${date1.getFullYear()}`
      },
      currentDate () {
        let date = new Date()
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
      },
      changeDate(index) {
        let vm = this
        vm.menuDate = vm.menuDate2 = false
        if (index === '1') {
          vm.fromReceiveDateFormatted = vm.formatDate(vm.fromReceiveDate)
        } else if (index === '2') {
          vm.toReceiveDateFormatted = vm.formatDate(vm.toReceiveDate)
        }
      },
      getMinMax (date) {
        if (!date) return null
        const [day, month, year] = date.split('/')
        return `${year}-${month}-${day}`
      },
      // -----
      visibilityChanged(e) {
        e && this.loadMoreItems();
      },
      visibilityChangedDonVi (e) {
        e && this.loadMoreItemsDonVi();
      },
      searchItems() {
        this.fileTemplateList = [];
        this.pageSelectBox = 0;
        this.loadMoreItems();
      },
      searchItemsDonVi() {
        this.donViList = [];
        this.pageSelectDonVi = 0;
        this.loadMoreItemsDonVi();
      },
      loadMoreItems() {
        let vm = this
        if (vm.fileTemplateList.length < vm.totalItemsSelectBox || vm.pageSelectBox == 0) {
          // vm.loading = true;
          vm.isShow = false
          let filter1 = {
            page: vm.pageSelectBox,
            size: 10,
            tenDanhMuc: 'mathanhphanhoso',
            keyword: vm.keywordSearchSelect ? vm.keywordSearchSelect : ''
          }
          let filter2 = {
            page: vm.pageSelectBox,
            size: 10,
            tenDanhMuc: 'magiaytoketqua',
            keyword: vm.keywordSearchSelect ? vm.keywordSearchSelect : ''
          }
          let req1 = vm.$store.dispatch('getDanhMuc', filter1)
          let req2 = vm.$store.dispatch('getDanhMuc', filter2)
          let arrAction = [req1, req2]
          Promise.all(arrAction).then(results => {
            let res = results[0]['content'].concat(results[1]['content'])
            vm.fileTemplateList = vm.fileTemplateList.concat(res);
            vm.isShow = true
            vm.pageSelectBox++;
            vm.totalItemsSelectBox = results[0]['totalElements'] + results[1]['totalElements']
            vm.loading = false
            if (vm.$refs.autocomplete) {
              vm.$refs.autocomplete.onScroll()
            }
          }).catch(xhr => {
            vm.loading = false
          })
        }
      },
      loadMoreItemsDonVi() {
        let vm = this
        if (vm.donViList.length < vm.totalItemsSelectDonVi || vm.pageSelectDonVi == 0) {
          // vm.loadingDonVi = true;
          vm.isShowDonVi = false
          let filter = {
            page: vm.pageSelectDonVi,
            size: 20,
            keyword: vm.keywordSearchDonVi ? vm.keywordSearchDonVi : ''
          }
          vm.$store.dispatch('getDonVi', filter).then(results => {
            let res = results['content']
            vm.donViList = vm.donViList.concat(res);
            vm.isShowDonVi = true
            vm.pageSelectDonVi++
            vm.totalItemsSelectDonVi = results['totalElements']
            vm.loadingDonVi = false
            if (vm.$refs.autocomplete1) {
              vm.$refs.autocomplete1.onScroll()
            }
          }).catch(xhr => {
            vm.loadingDonVi = false
          })
        }
      }
      // ------
    },
  }
</script>
<style lang="css" scoped>
  .v-data-table-header-mobile {
    display: none !important;
  }
</style>

