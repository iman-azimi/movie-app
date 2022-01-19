<template>
  <div class="container">
    <app-box>
      <div>
        <nuxt-link class="bg-primary text-white rounded-full px-3 py-1.5 mr-16" to="/">
          back
        </nuxt-link>
        <div class="ml-16 text-lg inline-block align-middle">
          <div class="font-bold">{{info.title}}</div>
          <div>{{info.tagline}}</div>
        </div>
      </div>
    </app-box>
    <section class=" mt-32 ">
      <div class="flex">
        <img :src="$config.imageBaseUrl + info.poster_path" :alt="info.title" width="330px" class="rounded-xl mr-16">
        <div class="w-full">
          <movie-info :info="info"/>
        </div>
      </div>
      <div class="mt-14">
        <p>
          {{info.overview}}
        </p>
      </div>
      <div class="my-20">
        <div class="text-lg font-bold">Credit:</div>
        <ul>
          <li v-for="(creadit, index) in getCreadits" :key="index"  class="inline-block">
            {{creadit.name}} 
            <span v-if="index < 8">,</span>
          </li>
          <li class="inline-block">
            <span>and {{creadits.length - 10}} more</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import AppBox from '~/components/common/AppBox'
import MovieInfo from '~/components/details/MovieInfo'

export default {
  components: {
    AppBox,
    MovieInfo
  },
  data() {
    return {
      info: {},
      creadits: []
    }
  },
  computed: {
    getCreadits() {
      return this.creadits.slice(0, 9)
    }
  },
  async fetch() {
    const id = this.$route.params.id
    const info = await this.$appDataManager.fetchMovieDetail(id)
    this.info = info.data

    const creadits = await this.$appDataManager.fetchMovieCredits(id)
    this.creadits = creadits.data.cast
  },
}
</script>