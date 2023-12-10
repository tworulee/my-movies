import { Component } from "react";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  

  handleSubmit = (event)=>{
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row mb-5 mt-5">
          <div className="col-9">
            <input
              onChange={
               this.props.searchMovieProp
              }
              type="text"
              className="form-control"
              placeholder="Search movie"
             
            ></input>
          </div>
          <div className="col-3">
                        <Link 
                                to ="/add"
                                type="button" 
                                className="btn btn-md btn-danger"
                                style={{float:'end'}}>Add Movie
                        </Link>
                    </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
