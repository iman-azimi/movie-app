import movieRepository from '~/data/repositories/movieRepository'

export default (ctx, inject ) => {
  const repositories = {
    movie: movieRepository(ctx.$axios)
  }

  ctx.$axios.defaults.params = {}
  ctx.$axios.defaults.params['api_key'] = ctx.$config.apiKey

  const appDataManager = {

    fetchMovieList(page) {
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
  }

  inject('appDataManager', appDataManager)
}
