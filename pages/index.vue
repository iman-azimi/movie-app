<template>
  <div class="container">
    <search-box @search="searchByDate"/>
    <section class="grid grid-cols-3 gap-x-20 gap-y-5 mt-32 ">

      <app-card v-for="item in movieList" :key="item.i" class="col-span-1" :movie="item" :genres="genreList"/>

      <div v-for="i in 20" :key="i" >
        <card-skeleton v-if="movieList.length === 0"/>
      </div>
      
    </section>
    <Pagination :page="currentPage" @next="nextPage" @previous="previousPage"/>
  </div>
</template>

<script>
import AppCard from '~/components/AppCard'
import SearchBox from '~/components/SearchBox'
import Pagination from '~/components/common/Pagination'
import CardSkeleton from '~/components/CardSkeleton'

export default {
  name: 'IndexPage',
  components: {
    AppCard,
    SearchBox,
    Pagination,
    CardSkeleton
  },
  data() {
    return {
      currentPage: 1,
      movieList: [],
      genreList: []
    }
  },
  async fetch() {
    const genres = await this.$appDataManager.fetchGenreList()
    this.genreList = genres.data.genres

    
    const movies = await this.$appDataManager.fetchMovieList(this.currentPage)
    this.movieList = movies.data.results
    
  },
  methods: {
    searchByDate(date) {
      const start = this.$moment(date.startDate).format('YYYY-MM-DD')
      const end = this.$moment(date.endDate).format('YYYY-MM-DD')

      
       this.movieList = this.movieList.filter((obj)=>{
        if (obj.release_date >= start && obj.release_date <= end) {
          return obj
        }
      })

    },
    nextPage() {
      this.currentPage = this.currentPage + 1
      this.movieList = []
      this.fetchMovieList()
    },
    previousPage() {
      this.currentPage = this.currentPage - 1
      this.movieList = []
      this.fetchMovieList()
    },
    fetchMovieList() {
      this.$appDataManager.fetchMovieList(this.currentPage)
      .then((res) => {
        this.movieList = res.data.results
      })
    }
  }
}
</script>
