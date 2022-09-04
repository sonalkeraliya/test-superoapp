import React, { Component } from "react";
import SuperHeroDataService from "../services/superhero.service";
import '../assets/main.css';
import SuperheroList from './superheros-list.component';

export default class MainSearchBar extends Component {
   
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
      
        this.state = {
            superheros: [],
            searchName: "",
            datafound:false
        };
        
    }
   
    onChangeSearchName(e) {
        const searchName1 = e.target.value;
        this.setState({
        searchName: searchName1
        });         
    }
  
    retrieveFavSuperHeros = () => {
      console.log("sdf");
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
        
  searchName = () => {
   
       SuperHeroDataService.findByName(this.state.searchName)
          .then(response => {
            if (response.data.results === undefined) {
              this.setState({
                superheros: [],
                datafound: true
              });
            }else{
              this.setState({
                datafound: false
              });
            }
            
           
            
          })
          .catch(e => {
            console.log(e);
          });
      }
      
  render() {
   
    const { searchName, superheros } = this.state;
   

    return (
        <React.Fragment>
        <div className={'Home'}>
            <h1><a href="https://superheroapi.com/">SuperHero-Finder</a></h1>
            
                <input    onChange={this.onChangeSearchName} value={searchName} id='superhero-name' name='superhero-name' placeholder='Enter Superhero Name' autoComplete="off"/>
                <button type='button'  onClick={this.searchName} >Go</button>
                <button type='button'  onClick={this.retrieveFavSuperHeros} >My favourites</button>
           
             <SuperheroList superheroData = {this.state.superheroData} cardClick = {this.cardClickHandler}/>
        </div>
        
      </React.Fragment>
      
    );
  }
} 