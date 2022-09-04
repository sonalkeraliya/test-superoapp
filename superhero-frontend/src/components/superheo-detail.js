import '../assets/superhero.css';
import React, { Component } from "react";
import SuperHeroDataService from "../services/superhero.service";

export default class superHero extends Component {
    constructor(props) {
        super(props);
        this.addToFavList = this.addToFavList.bind(this);
        this.onChangeIntelligence = this.onChangeIntelligence.bind(this);
        this.onChangeDurability = this.onChangeDurability.bind(this);
        this.onChangePower = this.onChangePower.bind(this);
        this.onChangeCombat = this.onChangeCombat.bind(this);
        this.updateSuperHero = this.updateSuperHero.bind(this);
        this.state = {
          id: null,
          gradArray : ['p-1','p-2','p-3','p-4','p-5','p-6'],
          submitted: null,
          intelligence: null,         
          durability: null,
          power: null,
          combat : null
        };
      }
     
    componentDidMount() {
        const { intelligence,durability, power, combat } = this.props.details.powerstats
        this.setState({ intelligence,durability, power, combat  })
        const id = this.props.is_fav ? this.props.details._id :  this.props.details.id;
        this.setState({
            id: id
          });
     }
     onChangeIntelligence(e) { this.setState({ intelligence: e.target.value }); }
     onChangeDurability(e) { this.setState({ durability: e.target.value }); }
     onChangePower(e) { this.setState({ power: e.target.value }); }
     onChangeCombat(e) { this.setState({ combat: e.target.value }); }
      addToFavList() {
        var data = {
            name: this.props.details.name,
            _id: this.state.id,
            image: {
                url:this.props.details.image.url
            },
            powerstats: {
                intelligence: this.state.intelligence,
                durability: this.state.durability,
                power: this.state.power,                
                combat: this.state.combat
            }
        };
    
        SuperHeroDataService.create(data)
          .then(response => {
            this.setState({
              intelligence: response.data.powerstats.intelligence,
              durability: response.data.powerstats.durability,
              power: response.data.powerstats.power,                
              combat: response.data.powerstats.combat,
              submitted: true
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
      updateSuperHero() {
        var data = {
            name: this.props.details.name,
            _id: this.state.id,
            image: {
                url:this.props.details.image.url
            },
            powerstats: {
                intelligence: this.state.intelligence,
                durability: this.state.durability,
                power: this.state.power,                
                combat: this.state.combat
            }
        };
        console.log(data);
        SuperHeroDataService.update(
            this.props.details._id,data
        )
          .then(response => {
            alert("Updated SuccessFully")
            this.setState({
              intelligence: response.data.hero.powerstats.intelligence,
              durability: response.data.hero.powerstats.durability,
              power: response.data.hero.powerstats.power,                
              combat: response.data.hero.powerstats.combat,
              submitted: true
            });
            
          })
          .catch(e => {
            console.log(e);
          });
      }

  render() {
    return (
        
        <div className="Superhero">
        <h1>{this.props.details.name}</h1>
        {this.state.submitted ? "Update SuccessFully" : '' }
        <button type='button'  onClick={this.props.is_fav ?  this.updateSuperHero : this.addToFavList} >{this.props.is_fav ? 'Update SuperHero ' : 'Add To Fav'}</button>
         <img src={this.props.details.image.url} alt={this.props.details.name} /> 
        <h2>Powerstats</h2>
        <div className="quality">
           
           
            <div>
                 <h3>Intelligence</h3>
                 <div className='stats-holder'>
                    <div className={`Powerstats p-1`}>{this.state.intelligence}</div>
                    <input   type="text" className="form-control" id="intelligence"   required  value={this.state.intelligence}
                            onChange={this.onChangeIntelligence}    name="intelligence" />
                  </div>
            </div>
                     
            <div>
                 <h3>Durability</h3>
                 <div className='stats-holder'>
                    <div className={`Powerstats p-2`}>{this.state.durability}</div>
                    <input   type="text" className="form-control" id="durability"   required  value={this.state.durability}
                            onChange={this.onChangeDurability}    name="durability" />
                  </div>
            </div>
            <div>
                 <h3>Power</h3>
                 <div className='stats-holder'>
                    <div className={`Powerstats p-3`}>{this.state.power}</div>
                    <input   type="text" className="form-control" id="power"  required  value={this.state.power}
                            onChange={this.onChangePower}    name="power" />
                  </div>
            </div>
            <div>
                 <h3>Combat</h3>
                 <div className='stats-holder'>
                    <div className={`Powerstats p-4`}>{this.state.combat}</div>
                    <input   type="text" className="form-control" id="combat"   required  value={this.state.combat}
                            onChange={this.onChangeCombat}    name="combat" />
                  </div>
            </div>            
         </div>
        </div>
    );
  }
}