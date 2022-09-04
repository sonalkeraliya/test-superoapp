import React from "react";
import '../assets/superherolist.css';

const superheroList = (props) => {

  const superheroItems = props.superheroData.map(superhero =>{ 
      if(superhero === null){
          return <div>ss</div>
      }
      
      return (   
         
        <div className= "SuperheroList" key={superhero.id}>
          
        <img src={superhero.image.url} onClick = {(e) => props.OnClickSuperHero(e)} id={props.is_fav ? superhero._id : superhero.id} alt=""/>
        <h2>{superhero.name}</h2>
    </div>
      
  )});


  return (
      <React.Fragment>
          {superheroItems}
      </React.Fragment>
)}
export default superheroList;
 