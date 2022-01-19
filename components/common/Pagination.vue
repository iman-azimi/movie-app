<template>
  <div class="mt-40 mb-24">
    <div class="flex items-center justify-center font-bold">
      <div :class="[page > 1 ? 'text-primary' : '','cursor-pointer']" @click="prePage()">
        Previous Page
      </div>
      <div class="w-px h-10 bg-gray-300 mx-8"></div>
      <div class="text-primary cursor-pointer" @click="nextPage()">Next Page</div>
    </div>
    <div class="text-center m-3.5">
      Showing results {{start}} - {{end}}
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'page'
    ],
    data() {
      return {
        start: 0,
        end: 20
      }
    },
    methods: {
      nextPage() {
        this.start = this.start + 20
        this.end = this.end + 20
        this.$emit('next')
      },
      prePage() {
        if (this.page > 1) {
          this.start = this.start - 20
          this.end = this.end - 20
          this.$emit('previous')
        }
      }
    }
  }
</script>
