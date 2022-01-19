<template>
  <date-range-picker
    v-model="dateRange"
    :date-format="dateFormat"
    :autoApply="true"
  >
  </date-range-picker>
</template>

<script>
  export default {
    data () {
      return {
        dateRange: {
          startDate: '2022-1-01',
          endDate: '2022-1-05',
        },
      }
    },
    watch: {
      dateRange(val){
        this.$emit('change', val)
      }
    },
    methods: {
      dateFormat (classes) {
        return classes
      }
    }
  }
</script>


<style scoped>
.slot {
  background-color: #aaa;
  padding: 0.5rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-black {
  color: #000;
}
</style>