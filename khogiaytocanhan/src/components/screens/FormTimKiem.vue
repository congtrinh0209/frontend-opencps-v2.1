<template>
  <div id="form-search">
    <v-card-text class="px-0 pt-0">
        <v-row v-if="form !== 'danhmuc'">
          <v-layout wrap class="mt-0">
            <v-flex xs12 sm6 class="px-0 pr-3">
              <div class="mb-1">Cơ quan ban hành</div>
              <v-autocomplete
                :items="donViList"
                v-model="dataSearch['govAgencyCode']"
                item-text="name"
                item-value="value"
                :hide-selected="true"
                clearable
                solo
                flat
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 class="px-0">
              <div class="mb-1">Mẫu giấy tờ</div>
              <v-autocomplete
                :items="fileTemplateList"
                v-model="dataSearch['fileTemplateNo']"
                item-text="name"
                item-value="fileTemplateNo"
                :hide-selected="true"
                clearable
                solo
                flat
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm3 class="">
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
            <v-flex xs12 sm3 class="pl-2 pr-3">
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
            <v-flex xs12 sm6 class="px-0">
              <div class="mb-1">Hiệu lực</div>
              <v-autocomplete
                :items="statusList"
                v-model="dataSearch['status']"
                item-text="text"
                item-value="value"
                :hide-selected="true"
                clearable
                solo
                flat
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-row>
        <v-flex class="text-right">
          <v-btn color="red" small class="mr-3 ml-0 white--text" @click="cancelSearch">
              <v-icon size="20">
              clear
              </v-icon> &nbsp;
              Thoát
          </v-btn>
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
        statusList: [
          {text: 'Yêu cầu số hóa', value: 0},
          {text: 'Có hiệu lực', value: 1},
          {text: 'Hết hiệu lực', value: 2},
          {text: 'Hủy', value: 3}
        ],
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
          toReceiveDateFormatted: ''
        },
        isDvc: false,
        disableInput: false,
        menuDate1: false,
        menuDate2: false,
        fromReceiveDate: '',
        fromReceiveDateFormatted: '',
        toReceiveDate: '',
        toReceiveDateFormatted: '',
      }
    },
    created () {
      let vm = this
      if (vm.inputSearch) {
        vm.dataSearch = Object.assign(vm.dataSearch, vm.inputSearch)
      }
      vm.getDanhMucGiayTo()
      let currentQuery = vm.$router.history.current.query
      if (currentQuery.hasOwnProperty('applicantIdNo') && currentQuery.applicantIdNo) {
        vm.disableInput = true
      }
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
      }
    },
    computed: {
    },
    methods: {
      getDataOutPut () {
        let vm = this
        return vm.dataSearch
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
        let filter = {
          status: 1
        }
        if (vm.isDvc) {
          vm.$store.dispatch('getFileItemsFromDvc', filter).then(function (result) {
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
      getMinFromDate30 (date) {
        let vm = this
        let toDate = (new Date(vm.parseDate(date))).getTime() - 30*86400000
        return vm.parseDate(toDate)
      },
      getMaxToDate30 (date) {
        let vm = this
        let toDate = (new Date(vm.parseDate(date))).getTime() + 30*86400000
        if (toDate > (new Date()).getTime()) {
          return vm.parseDate((new Date()).getTime())
        } else {
          return vm.parseDate(toDate)
        }
        
      },
    },
  }
</script>
<style lang="css" scoped>
  .v-data-table-header-mobile {
    display: none !important;
  }
</style>

