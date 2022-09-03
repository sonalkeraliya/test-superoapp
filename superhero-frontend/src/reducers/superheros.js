import {
    CREATE_SUPERHERO,
    RETRIEVE_FAV_SUPERHEROS,
    UPDATE_SUPERHERO,
    DELETE_SUPERHERO   
  } from "../actions/constant.types.js";
  const initialState = [];
  function superheroReducer(superheros = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case CREATE_SUPERHERO:
        return [...superheros, payload];
      case RETRIEVE_FAV_SUPERHEROS:
        return payload;
      case UPDATE_SUPERHERO:
        return superheros.map((superhero) => {
          if (superhero.id === payload.id) {
            return {
              ...superhero,
              ...payload,
            };
          } else {
            return superhero;
          }
        });
      case DELETE_SUPERHERO:
        return superheros.filter(({ id }) => id !== payload.id);
      default:
        return superheros;
    }
  };
  export default superheroReducer;