<template>  
  <div style="background-color: white;width:100%">
    <v-expansion-panel :value="[true]" expand  v-if="type === 'overdue' || type === 'preoverdue'" class="expansion-pl">
      <v-expansion-panel-content>
        <div slot="header" v-if="type === 'overdue'">
          <div class="background-triangle-small"> <v-icon size="18" color="white">star_rate</v-icon> </div>
          <span>Lý do chậm hạn trả</span><span style="color:red"> *</span>
        </div>
        <div slot="header" v-else>
          <div class="background-triangle-small"> <v-icon size="18" color="white">star_rate</v-icon> </div>
          <span>Lý do</span><span style="color:red"> *</span>
        </div>
        <v-card>
          <v-card-text class="py-2 px-2">
            <v-layout wrap>
              <v-flex xs12 class="mx-3">
                <v-form v-model="valid" ref="delayNoteForm">
                  <v-text-field
                    box
                    v-model="delayNote"
                    multi-line
                    :rows="3"
                    :rules="() => delayNote !== '' || 'Trường dữ liệu bắt buộc'"
                  ></v-text-field>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel :value="[true]" expand  class="expansion-pl">
      <v-expansion-panel-content>
        <div slot="header">
          <div class="background-triangle-small"> 
            <v-icon size="18" color="white">star_rate</v-icon> 
          </div>
          <span v-if="type === 'overdue' || type === 'preoverdue'">Ngày hẹn lại</span>
          <span v-if="type === 'betimes'">Ngày hẹn trả sớm</span>
        </div>
        <v-card >
          <v-card-text>
            <v-layout wrap class="pl-2">
              <v-icon color="blue" class="hover-pointer" @click="showDatePicker">event</v-icon>
              <!-- <vue-ctk-date-time-picker
                ref="datepicker" 
                style="width:auto!important"
                class="ml-2"
                v-model="extendDateInput" 
                format="YYYY-MM-DDTHH:mm"
                time-format="HH:mm"
                :without-header="true"
                formatted="DD/MM/YYYY HH:mm"
                :label="extendDateInput ? '' : 'Chọn ngày'"
                :min-date="minDate"
                locale="vi"
              ></vue-ctk-date-time-picker> -->
              <v-text-field
                v-model="extendDateInput"
                label=""
                placeholder="dd/mm/yyyy"
                @blur="formatDate()"
                box
                clearable
                prepend-inner-icon="event"
              ></v-text-field>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    
  </div>
</template>
<script>
// let datePicker = window.VueCtkDateTimePicker ? window.VueCtkDateTimePicker.default : window['vue-ctk-date-time-picker']
export default {
  components: {
    // 'vue-ctk-date-time-picker': datePicker
  },
  props: ['extendDateEdit', 'type'],
  data: () => ({
    extendDateInput: '',
    minDate: null,
    delayNote: ''
  }),
  created () {
    var vm = this
  },
  watch: {},
  mounted () {
    this.extendDateInput = this.extendDateEdit ? this.parseCurrentDate(this.extendDateEdit) : this.formatDateInput(new Date())
    console.log('extendDateInput', this.extendDateInput)
    this.minDate = this.getCurentDateTime('date')
  },
  methods: {
    doExport () {
      let vm = this
      let [day, month, year] = vm.extendDateInput.split('/')
      let d = vm.extendDateInput ? `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}` : ''
      let date = d && (new Date(d)).getTime() ? (new Date(d)).getTime() : ''
      var exportData
      if (vm.type === 'overdue' || vm.type === 'preoverdue') {
        exportData = {
          text: vm.delayNote,
          extendDate: date,
          valid: vm.$refs.delayNoteForm.validate()
        }
      } else {
        exportData = {
          text: vm.delayNote,
          extendDate: date,
          valid: true
        }
      }
      return exportData
    },
    getCurentDateTime (type) {
      let date = new Date()
      if (type === 'datetime') {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} | ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
      } else if (type === 'date') {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
      }
    },
    formatDateInput (date) {
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
    },
    showDatePicker () {
      this.$refs.datepicker.showDatePicker()
    },
    parseCurrentDate (date) {
      if (!date) {
        return null
      }
      let [day1, time] = date.split(' ')
      let [day2, month, year] = `${day1}`.split('/')
      let [hh, mm, ss] = `${time}`.split(':')
      return `${day2.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
    },
    formatDate() {
      let vm = this;
      let lengthDate = String(vm.dueDateInput).trim().length;
      let splitDate = String(vm.dueDateInput).split("/");
      if (
        lengthDate &&
        lengthDate > 4 &&
        splitDate.length === 3 &&
        splitDate[2]
      ) {
        vm.dueDateInput = vm.translateDate(vm.dueDateInput);
      } else if (lengthDate && lengthDate === 8) {
        let date = String(vm.dueDateInput);
        vm.dueDateInput = date.slice(0, 2) + "/" + date.slice(2, 4) + "/" + date.slice(4, 8);
      } else {
        vm.dueDateInput = "";
      }
    },
    translateDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    },
  }
}
</script>
