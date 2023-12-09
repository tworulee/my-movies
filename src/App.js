import React from "react";
import { Component } from "react";
import SearchBar from "./components/SearchBar";
import Movies from "./components/Movies";
import AddMovie from "./components/AddMovie";
import { BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom";
import axios from "axios";


class App extends Component {
  state = {
    movies: [],
    searchQuery: "",
  };

  deleteMovie = async (movie) => {
    const baseUrl = `http://localhost:3002/movies/${movie.id}`;
    await fetch(baseUrl, {
      method: "DELETE",
    });

    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);
    this.setState({
      movies: newMovieList,
    });

    /* this.setState(state=>({
         movies:newMovieList
        }))  yukardakiyle aynı isi yapıyor  */
  };

  async componentDidMount() {
    const baseUrl = "http://localhost:3002/movies";
    const response = await fetch(baseUrl);
    const data = await response.json();
    this.setState({ movies: data });
  }

  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  addMovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie)
    this.setState( state => ( {
        movies:state.movies.concat([movie])
    }))
   
}

  render() {
    let filteredMovies = this.state.movies.filter((movie) => {
      return (
        movie.name
          .toLowerCase()
          .indexOf(this.state.searchQuery.toLocaleLowerCase()) !== -1
      );
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
               
                <Route path="/add" element={<AddMovie onAddMovie={this.addMovie} />} />
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
