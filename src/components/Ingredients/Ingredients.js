import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([])

  const filteredIngredientsHandler = useCallback(
    filterIngredients => {
      setUserIngredients(filterIngredients)
    }, [])

  // useEffect(() => {
  //   fetch('https://react-hooks-test-9ea4d.firebaseio.com/ingredients.json')
  //     .then(response => response.json())
  //     .then(responseData => {
  //       console.log(responseData);
  //       const loadedIngredinet = [];
  //       for (const key in responseData) {
  //         loadedIngredinet.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount
  //         })
  //       }
  //       console.log(loadedIngredinet);
  //       setUserIngredients(loadedIngredinet)
  //     })
  // }, [])

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients)
  }, [userIngredients])



  const addIngredientHandler = ingredient => {

    fetch('https://react-hooks-test-9ea4d.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => [...prevIngredients,
      {
        id: responseData.name,
        ...ingredient
      }])
    })
  }

  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients => prevIngredients.filter(
      ingredient => ingredient.id !== ingredientId))
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}


export default Ingredients;
