<template>
  <div class="mt-6">
    <div class="grid grid-cols-2">
      <div class="font-bold">
        <div v-for="detail in details" :key="detail" class="mt-5">
          {{detail}}
        </div>
      </div>
      <div class="text-right">
        <div class="mt-5">
          ${{numberSeprator(info.budget)}}
        </div>
        <div class="mt-5">
          ${{numberSeprator(info.revenue)}}
        </div>
        <div class="mt-5">
          {{info.release_date}}
        </div>
        <div class="mt-5">
          {{timeCal}}
        </div>
        <div class="mt-5">
          <ul class="flex justify-end">
            <li v-for="item in info.genres" :key="item.id" class="mr-2">
              {{item.name}},
            </li>
          </ul>
        </div>
        <div class="mt-5">
          <a :href="`https://www.imdb.com/title/${info.imdb_id}`" target="_blank" class="text-primary border-b border-primary">Link</a>
        </div>
        
        <div class="mt-5">
          <a :href="info.homepage" target="_blank" class="text-primary border-b border-primary">Link</a>
        </div>
        
        <div class="mt-3">
          <rate :length="5" :value="info.vote_average / 2" :readonly="true"/>
          {{info.vote_average}} ({{info.vote_count}})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        equired: true,
        default: {}
      }
    },
    data() {
      return {
        details: ['Budget','Revenue','Release Date','Runtime','Genres', 'IMDB Link', 'Homepage Link','Score']
      }
    },
    computed: {
      timeCal() {
        const h = Math.floor(this.info.runtime / 60)
        const m = Math.floor(this.info.runtime % 60)
        return h + 'h' + ' ' + m + 'm'
      }
    },
    methods: {
      numberSeprator(num){
        return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>