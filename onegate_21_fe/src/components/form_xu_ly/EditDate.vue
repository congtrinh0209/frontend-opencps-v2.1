<template>  
  <div class="phancong" style="background-color: white;width:100%">
    <v-expansion-panel :value="[true]" expand  class="expansion-pl">
      <v-expansion-panel-content>
        <div slot="header">
          <div class="background-triangle-small"> 
            <v-icon size="18" color="white">star_rate</v-icon> 
          </div>Ngày hẹn trả
        </div>
        <v-card >
          <v-card-text>
            <v-layout wrap class="pl-2">
              <v-icon color="primary" class="hover-pointer" @click="showDatePicker">event</v-icon>
              <!-- <vue-ctk-date-time-picker
                ref="datepicker" 
                style="width:auto!important"
                class="ml-2"
                v-model="dueDateInput" 
                format="YYYY-MM-DDTHH:mm"
                time-format="HH:mm"
                :without-header="true"
                formatted="DD/MM/YYYY HH:mm"
                :label="dueDateInput ? '' : 'Chọn ngày'"
                :min-date="minDate"
                locale="vi"
              ></vue-ctk-date-time-picker> -->
              <v-text-field
                v-model="dueDateInput"
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
  // components: {
  //   'vue-ctk-date-time-picker': datePicker
  // },
  props: ['dueDateEdit'],
  data: () => ({
    dueDateInput: '',
    minDate: null
  }),
  created () {
    var vm = this
    vm.dueDateInput = vm.dueDateEdit ? vm.formatDateInput(vm.dueDateEdit) : ''
    console.log('dueDateInput', vm.dueDateInput)
  },
  watch: {},
  mounted () {
    this.dueDateInput = this.dueDateEdit ? this.formatDateInput(this.dueDateEdit) : ''
    console.log('dueDateInput', this.dueDateInput)
    this.minDate = this.getCurentDateTime('date')
  },
  methods: {
    getDateInput () {
      var vm = this
      console.log('vm.dueDateInput', vm.dueDateInput)
      // let date = vm.dueDateInput ? (new Date(vm.dueDateInput)).getTime() : ''
      let [day, month, year] = vm.dueDateInput.split('/')
      let d = vm.dueDateInput ? `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}` : ''
      let valueEdit = d && (new Date(d)).getTime() ? (new Date(d)).getTime() : ''
      return valueEdit
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
