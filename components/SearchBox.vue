<template>
  <app-box>
    <div class="ml-20 flex justify-between">
      <div class="flex items-center">
        <p class="mr-7">Search by release date:</p>
        <date-range @change="changeDate" />
      </div>
      <button class="bg-primary text-white rounded-full px-3 py-1.5 mr-16" @click="search">Search</button>
    </div>
  </app-box>
</template>

<script>
import AppBox from '~/components/common/AppBox'
import DateRange from '~/components/DateRange.vue'

  export default {
    components: {
        AppBox,
        DateRange
    },
    data() {
      return {
        date: null
      }
    },
    methods: {
      changeDate(val) {
        this.date = val
      },
      search() {
        if (this.date) {
          this.$emit('search', this.date)
        }
      }
    }
    
}
</script>
