<template>
      <v-dialog v-model="dialogState" persistent max-width="500">
      <v-card>
        <v-card-title>
          <p style="font-size: 16px; color: #0072bc">
           {{ payloadDialogs.title }}
          </p>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#FF5252"
            small
            class="white--text"
            variant="text"
            @click="handleCloseDialog"
          >
            Hủy
          </v-btn>
          <v-btn
            color="#0072bc"
            small
            class="white--text"
            variant="text"
            @click="handleClick"
          >
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["fnCancel"],

    data() {
        return {
            
        };
    },

    mounted() {
        const vm = this
        console.log("props: ", vm.payloadDialogs)
    },

    computed: {
        ...mapState(["dialogState", "payloadDialogs"]),
    },

    methods: {
        handleClick() {
            const vm = this
            vm.payloadDialogs.cb()
            vm.$store.commit("CLOSE_DIALOG");
        },
        handleCloseDialog() {
            const vm = this
            vm.fnCancel()
            vm.$store.commit("CLOSE_DIALOG");
        }
    },
};
</script>

<style lang="scss" scoped>

</style>