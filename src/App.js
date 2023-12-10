import React from "react";
import { Component } from "react";
import SearchBar from "./components/SearchBar";
import Movies from "./components/Movies";
import EditMovie from "./components/EditMovie";
import AddMovie from "./components/AddMovie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

class App extends Component {
  state = {
    movies: [],
    searchQuery: "",
  };

  componentDidMount() {
    this.getMovies();
}

async getMovies() {
    const response = await axios.get("http://localhost:3002/movies");
    this.setState({ movies: response.data })
}




// DELETE MOVIE
deleteMovie = async (movie) => {

    axios.delete(`http://localhost:3002/movies/${movie.id}`)
    const newMovieList = this.state.movies.filter(
        m => m.id !== movie.id
    );
    this.setState(state => ({
        movies: newMovieList
    }))
}


// SEARCH MOVIE
searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value })
}


// ADD MOVIE
addMovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie)
    this.setState(state => ({
        movies: state.movies.concat([movie])
    }))

    this.getMovies();
}

    // EDIT MOVIE
    editMovie = async (id, updatedMovie) => {
        await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
        this.getMovies();
    }
  render() {
    let filteredMovies = this.state.movies
      .filter((movie) => {
        return (
          movie.name
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });

    return (
      <div className="container">
        <div className="row">
          <Router>
            <div className="container">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <div className="col-lg-12">
                        <SearchBar searchMovieProp={this.searchMovie} />
                      </div>
                      <Movies
                        movies={filteredMovies}
                        deleteMovie={this.deleteMovie}
                      />
                    </>
                  }
                />

                <Route
                  path="/add"
                  element={<AddMovie onAddMovie={this.addMovie} />}
                />
               <Route path="/edit/:id" element={<EditMovie onEditMovie={this.editMovie} />} />

              </Routes>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
