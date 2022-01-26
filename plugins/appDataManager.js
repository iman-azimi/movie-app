import movieRepository from '~/data/repositories/movieRepository'

export default (ctx, inject ) => {
  const repositories = {
    movie: movieRepository(ctx.$axios)
  }

  ctx.$axios.defaults.params = {}
  ctx.$axios.defaults.params['api_key'] = ctx.$config.apiKey

  const appDataManager = {

    fetchMovieList(page,start,end) {
      return repositories.movie.movieList(page)
    },

    fetchMovieDetail(id) {
      return repositories.movie.movieDetail(id)
    },

    fetchGenreList() {
      return repositories.movie.genreList()
    },

    fetchMovieCredits(id) {
      return repositories.movie.movieCredits(id)
    },
    fetchFilterMovie(page,start,end) {
      return repositories.movie.movieFilterByDate(page,start,end)
    },
  }

  inject('appDataManager', appDataManager)
}
