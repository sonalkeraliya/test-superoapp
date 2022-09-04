import React, { Component } from "react";
import SuperHeroDataService from "../services/superhero.service";
import '../assets/main.css';
import SuperheroList from './superheros-list.component';
import Superhero  from './superheo-detail';
import Modal from '../UI/Modal/Modal';

export default class MainSearchBar extends Component {
   
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
      
        this.state = {
            superheros: [],
            searchName: "",
            datafound:true,
            is_fav : false,
            showDetails: false,
            superheroDetails: null,
        };
        
    }
   
    onChangeSearchName(e) {
        const searchName1 = e.target.value;
        this.setState({
        searchName: searchName1
        });         
    }
  
    retrieveFavSuperHeros = () => {
         SuperHeroDataService.getAll()
          .then(response => {
           if (response.data.length > 0) { 
              this.setState({
                superheros: response.data,
                is_fav : true,
                searchName : '',
                datafound: true,
              });            
             
            }else{
              this.setState({
                superheros: response.data,
                is_fav : true,
                searchName : '',
                datafound: false,

              });
            }
            
           
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
                datafound: false,
                is_fav : false
              });
            }else{
              this.setState({
                superheros: response.data.results ,
                datafound: true,
                is_fav : false
              });
            }         
         })
          .catch(e => {
            console.log(e);
          });
      }
    
      OnClickSuperHeroHandler = (e) => {
     
        for(let i = 0; i<this.state.superheros.length; i++){
          const id = this.state.is_fav ? this.state.superheros[i]._id : this.state.superheros[i].id;
            if(id === e.target.id){
              this.setState({superheroDetails: this.state.superheros[i], showDetails:true});           
            }
        }
        
       
        window.scroll({
            top:0,
            left:0,
            behavior:"smooth"
        })       
      }
      modalCloseHandler = () => {
        this.setState({superheroDetails:null, showDetails:false});
    }
  render() {
   
    const { searchName, superheros ,datafound,is_fav,superheroDetails} = this.state;
   

    return (
        <React.Fragment>
        <div className={'Home'}>
            <h1><a href="https://superheroapi.com/">SuperHero-Finder</a></h1>
            
                <input    onChange={this.onChangeSearchName} value={searchName} id='superhero-name' name='superhero-name' placeholder='Enter Superhero Name' autoComplete="off"/>
                <button type='button'  onClick={this.searchName} >Go</button>
                <button type='button'  onClick={this.retrieveFavSuperHeros} class="my-fav" >My favourites</button>
                
                {(!datafound) && 
                 <h1 style={{color:'white', backgroundColor:"rgba(0,0,0,0.5)"}}>Superhero data not present!</h1>
                }
                {  (is_fav && datafound) &&
                     <h1 style={{color:'white', backgroundColor:"rgba(0,0,0,0.5)"}}>My Favourite List!</h1>
                 }
                 {  ((!is_fav) && superheros.length>0) &&
                     <h1 style={{color:'white', backgroundColor:"rgba(0,0,0,0.5)"}}>My Search List!</h1>
                 }
                 {(superheros.length > 0 ) &&  
                    <SuperheroList superheroData = {superheros} is_fav={is_fav}   OnClickSuperHero = {this.OnClickSuperHeroHandler}/>
                 }
              
                  <Modal show={this.state.showDetails} modalClosed={this.modalCloseHandler}>
                    {(this.state.showDetails) && <div><Superhero details={superheroDetails} is_fav={is_fav}/> </div> }
                  </Modal>
             
        </div>
        
      </React.Fragment>
      
    );
  }
} 