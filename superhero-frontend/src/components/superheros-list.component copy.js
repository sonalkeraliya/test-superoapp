import React, { Component } from "react";
import SuperHeroDataService from "../services/superhero.service";
import { Link } from "react-router-dom";

export default class SuperHerosList11 extends Component {
 
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveSuperHeros = this.retrieveSuperHeros.bind(this);
    this.setActiveSuperHero = this.setActiveSuperHero.bind(this);
    

    this.state = {
      superheros: [],
      currentSuperHero: null,
      currentIndex: -1,
      searchName: ""
    };
    
  }
  componentDidMount() {
    this.retrieveSuperHeros();
  }
  onChangeSearchName(e) {
  
    const searchName = e.target.value;
     this.setState({
      searchName: searchName
    });
  }
  retrieveSuperHeros() {
    SuperHeroDataService.getAll()
      .then(response => {
        this.setState({
          superheros: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  SuperHeroDataService(superhero, index) {
    this.setState({
      currentSuperHero: superhero,
      currentIndex: index
    });
  }
  setActiveSuperHero(superhero, index) {
    this.setState({
      currentSuperHero: superhero,
      currentIndex: index
    });
  }

  searchName = () => {
    this.setState({
      currentSuperHero: null,
      currentIndex: -1
    });
    
    SuperHeroDataService.findByName(this.state.searchName)
      .then(response => {
        if (response.data.results === undefined) {
          this.setState({
            superheros: []
          });
        }else{
          this.setState({
            superheros: response.data.results
          });
        }
       
       
        
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchName, superheros, currentSuperHero, currentIndex } = this.state;

    return (
      
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>

          <div className="col-md-6">
          <h4>SuperHeros List</h4>
          <ul className="list-group">
            {superheros &&
              superheros.map((superhero, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSuperHero(superhero, index)}
                  key={index}
                >
                  {superhero.name}
                </li>
              ))}
          </ul>
          </div>
          <div className="col-md-6">
          {currentSuperHero ? (
            <div>
              <h4>Super Hero</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentSuperHero.name}
              </div>
              
              
              <Link
                to={"/superheros/" + currentSuperHero.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}