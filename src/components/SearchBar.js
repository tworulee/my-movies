import { Component } from "react";

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
                        <button type="button" 
                                className="btn btn-md btn-danger"
                                style={{float:'end'}}>Add Movie
                        </button>
                    </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
