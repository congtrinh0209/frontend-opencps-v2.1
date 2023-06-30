<template>
  <div>
    <v-layout row wrap class="mx-2 py-2" id="contentFaq">
      <v-flex xs12 :style="!isMobile ? 'padding-right: 16px' : 'padding-right: 6px'">
        <div>
          <h3 class="text-bold mb-2" style="color:#034687">
            <v-btn flat class="ml-0 px-0" color="#0167d3">CÂU HỎI THƯỜNG GẶP TẠI TỈNH HẬU GIANG</v-btn>
            <v-btn flat class="ml-3" @click="redirectFaq()">CÂU HỎI THƯỜNG GẶP TRÊN TOÀN QUỐC</v-btn>
          </h3>
        </div>

        <div>
          <div v-if="questionList.length > 0">
            <v-expansion-panel v-for="(itemQuestion, indexQuestion) in questionList"
              :key="indexQuestion" class="mb-2" style="border: 1px solid #ddd;border-radius:5px;position:relative;">
              <v-expansion-panel-content :key="indexQuestion" style="border-radius:5px">
                <v-icon slot="actions" color="primary" style="position:absolute;right:5px;top:10px">$vuetify.icons.expand</v-icon>
                <div class="ml-2" slot="header" >
                  <span class="text-bold primary--text">Câu hỏi {{indexQuestion + 1}}: </span>
                  <div class="primary--text" v-html="String(itemQuestion.content).replace(/\</g, '&lt;').replace(/\>/g, '%gt;')"></div>
                </div>
                <div >
                  <v-card flat>
                    <div class="ml-2 py-1">
                      <span class="green--text text-bold">Trả lời: </span>
                    </div>
                    <v-card-text class="mx-2 my-0 py-0">
                      <div class="mb-2">
                        <div style="position:relative">
                          <div class="" v-html="itemQuestion.answer"></div>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </div>
          <div class="px-0 py-2" v-else>
            <v-alert outline color="warning" icon="priority_high" :value="true">
              Không có {{titleData}} nào
            </v-alert>
          </div>
        </div>
        <!-- <div v-if="totalQuestion > 0" class="text-xs-right layout wrap mt-4" style="position: relative;">
          <div class="flex pagging-table"> 
            <tiny-pagination :total="totalQuestion" :page="questionPage" custom-class="custom-tiny-class" 
              @tiny:change-page="paggingData" ></tiny-pagination> 
          </div>
        </div> -->
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import Vue from 'vue'
import $ from 'jquery'
import toastr from 'toastr'
import TinyPagination from './Pagination.vue'
Vue.use(toastr)

toastr.options = {
  'closeButton': true,
  'timeOut': '5000'
}
export default {
  props: [],
  components: {
    'tiny-pagination': TinyPagination
  },
  data: () => ({
    questionList: [],
    phanAnhKienNghi: false,
    titleData: 'câu hỏi',
    agencyList: [],
    lvdsList: [],
    lvttList: [],
    dialog_addQuestion: false,
    agencyCodeSiteExits: '',
    agencySelected: '',
    lvdsSelected: '',
    lvdsFilterSelected: '',
    lvttFilterSelected: '',
    agencyFilterSelected: '',
    keyword: '',
    answerList: [],
    content: '',
    contentAddQuestion: '',
    contentAnswer: '',
    loadingAnswer: false,
    config: {},
    captchaActive: false,
    valid: false,
    validAnswer: false,
    address: '',
    contactEmail: '',
    contactTelNo: '',
    questionType: '',
    fullName: '',
    titleQuestion: '',
    answers: [
    ],
    questionSelected: '',
    openQuestion: '',
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    originality () {
      var vm = this
      return vm.getOriginality()
    },
    isMobile () {
      return this.$store.getters.getIsMobile
    }
  },
  created () {
    var vm = this
    vm.$nextTick(function () {
      try {
        vm.questionList = danhSachCauHoi
      } catch (error) {
        vm.questionList = []
      }
    })
  },
  updated () {
    var vm = this
    vm.$nextTick(function () {
    })
  },
  mounted () {
    let vm = this
    $('.v-expansion-panel__header').css('background', '#f1f1f1')
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      let vm = this
      let currentParams = newRoute.params
      let currentQuery = newRoute.query
    }
  },
  methods: {
    redirectFaq () {
      window.open("https://dichvucong.gov.vn/p/home/dvc-cau-hoi-pho-bien.html", "_blank")
    },
  },
  filters: {
  }
}
</script>
<style lang="scss" scoped>
  $font-size: 14px;
  $line-height: 1.5;
  $lines-to-show: 7;
  .content-question {
    text-align: justify;
    display: block;
    display: -webkit-box;
    height: $font-size*$line-height*$lines-to-show;
    margin: 0 auto;
    font-size: $font-size;
    line-height: $line-height;
    -webkit-line-clamp: $lines-to-show;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
