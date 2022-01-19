<template>
  <div class="w-full bg-gray-150 border border-gray-160 rounded cursor-pointer px-1 py-0.5" @click="showDetail(movie.id)">
    <div class="flex">
      <img :src="$config.imageBaseUrl + movie.poster_path" width="125px" class="rounded-l">
      <div class="m-3.5 mt-4 flex flex-col justify-between w-full">
        <div>
          <span class="font-bold"> {{ movie.original_title}}</span>
        </div>
        <div>
          <div>{{movie.release_date}}</div>
          <ul class=" text-xs text-gray-800 mt-4">
            <li v-for="(item, index) in findGenres(movie.genre_ids)" :key="index" class="mr-2 inline-block">
              <div v-if="index !== 0" class="w-1 h-1 rounded-full bg-gray-600 inline-block align-middle mr-2" />
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      movie:{
        type: Object,
        required: true,
        default: {}
      },
      genres:{
        type: Array,
        required: true,
        default: () => []
      }
    },
    methods: {
      findGenres(genreId) {
        let genreList = []
        for (let i = 0; i < genreId.length; i++) {
          const item = this.genres.find(item => item.id == genreId[i]);
          genreList.push(item)
        }
        return genreList
      },
      showDetail(id) {
        this.$router.push(`/details/${id}`)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>