const MOVIE = 'movie'
const GENRE = 'genre'
const LIST = 'list'
const Credits = 'credits'
export default ($axios) => ({
  
  movieList(page) {
    return $axios.get(`discover/${MOVIE}?page=${page}`, )
  },

  movieDetail(id) {
    return $axios.get(`${MOVIE}/${id}`)
  },


  genreList() {
    return $axios.get(`${GENRE}/${MOVIE}/${LIST}`)
  },

  movieCredits(id) {
    return $axios.get(`${MOVIE}/${id}/${Credits}`, )
  },
  
  movieFilterByDate(page,start,end) {
    return $axios.get(`discover/${MOVIE}?page=${page}&primary_release_date.gte=${start}&primary_release_date.lte=${end}`)
  },
})
