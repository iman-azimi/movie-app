<template>
  <app-box>
    <div class="ml-20 flex justify-between">
      <div class="flex items-center">
        <p class="mr-7">Search by release date:</p>
        <date-range-picker v-model="dateRange" :autoApply="true" :showDropdowns="true"/>
      </div>
      <button class="bg-primary text-white rounded-full px-3 py-1.5 mr-16" @click="search">Search</button>
    </div>
  </app-box>
</template>

<script>
import AppBox from '~/components/common/AppBox'

import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

  export default {
    components: {
        AppBox,
        DateRangePicker
    },
    data() {
      return {
        dateRange: {
          startDate: this.$moment(),
          endDate: this.$moment()
        }
      }
    },
    async fetch() {
      await this.parseQuery()
    },
    methods: {
      search() {
        if (this.dateRange.startDate && this.dateRange.endDate) {
          this.$emit('search', this.dateRange)
        }
      },
      parseQuery() {
        const query = this.$route.query
        this.dateRange.startDate = query.startdate
        this.dateRange.endDate = query.enddate
      },
    }
    
}
</script>
