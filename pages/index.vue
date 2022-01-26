<template>
  <div class="container">
    <search-box @search="searchByDate"/>
    <div v-if="startDate && endDate" class="px-2 py-1 bg-gray-150 mx-2 my-2 rounded inline-block text-sm">
      {{startDate}} - {{endDate}}  
      <span class="ml-2 text-red-500 cursor-pointer" @click="removeFilter()">remove</span>
    </div>
    <section class="grid grid-cols-3 gap-x-20 gap-y-5 mt-32 ">

      <app-card v-for="item in movieList" :key="item.i" class="col-span-1" :movie="item" :genres="genreList"/>

      <div v-for="i in 20" :key="i" >
        <card-skeleton v-if="movieList.length === 0"/>
      </div>
      
    </section>
    <Pagination v-if="totalPage > 1" :page="currentPage" @next="nextPage" @previous="previousPage"/>
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
      totalPage: 0,
      movieList: [],
      genreList: [],
      startDate: null,
      endDate: null
    }
  },
  async fetch() {
    await this.parseQuery()

    const genres = await this.$appDataManager.fetchGenreList()
    this.genreList = genres.data.genres

    if (this.startDate && this.endDate) {
      const movies = await this.$appDataManager.fetchFilterMovie(this.currentPage,this.startDate,this.endDate)
      this.movieList = movies.data.results
      this.totalPage = movies.data.total_pages
    }
    else {
      const movies = await this.$appDataManager.fetchMovieList(this.currentPage)
      this.movieList = movies.data.results
      this.totalPage = movies.data.total_pages
    }
    
  },
  methods: {

    searchByDate(date) {
      this.startDate = this.$moment(date.startDate).format('YYYY-MM-DD')
      this.endDate= this.$moment(date.endDate).format('YYYY-MM-DD')
      this.$router.push({ query: { startdate: this.startDate, enddate: this.endDate } })

      this.$appDataManager.fetchFilterMovie(this.currentPage,this.startDate,this.endDate)
      .then((res) => {
        this.movieList = res.data.results
        this.totalPage = res.data.total_pages
      })

    },

    nextPage() {
      this.currentPage = this.currentPage + 1
      this.movieList = []
      if (this.startDate && this.endDate) {
        this.fetchFilterMovie()
      }
      else {
        this.fetchMovieList()
      }
    },

    previousPage() {
      this.currentPage = this.currentPage - 1
      this.movieList = []
      if (this.startDate && this.endDate) {
        this.fetchFilterMovie()
      }
      else {
        this.fetchMovieList()
      }
    },

    fetchMovieList() {
      this.$appDataManager.fetchMovieList(this.currentPage)
      .then((res) => {
        this.movieList = res.data.results
         this.totalPage = res.data.total_pages
      })
    },
    
    fetchFilterMovie() {
      this.$appDataManager.fetchFilterMovie(this.currentPage,this.startDate,this.endDate)
      .then((res) => {
        this.movieList = res.data.results
         this.totalPage = res.data.total_pages
      })
    },

    removeFilter() {
      this.$router.push({ query: {} })
      this.startDate = null
      this.endDate = null
      this.fetchMovieList()
    },

    parseQuery() {
      const query = this.$route.query
      this.startDate = query.startdate
      this.endDate = query.enddate
    },
  }
}
</script>
