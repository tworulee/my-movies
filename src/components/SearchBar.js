import { Component } from "react";

class SearchBar extends Component {
  

  handleSubmit = (event)=>{
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row mb-5 mt-5">
          <div className="col-12">
            <input
              onChange={
               this.props.searchMovieProp
              }
              type="text"
              className="form-control"
              placeholder="Search movie"
             
            ></input>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
