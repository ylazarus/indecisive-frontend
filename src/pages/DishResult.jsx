import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRandomInt } from '../services/utilService'
import { loadRecipes } from '../store/actions/recipeActions'

export const DishResult = (props) => {

  const [randPosition, setRandPosition] = useState(null)

  const {recipes} = useSelector(state => state.recipeModule)
  const dispatch = useDispatch()

  useEffect(  () => {
    dispatch(loadRecipes())
    const length = recipes.length
    setRand(length)
  },[])
  
  // useEffect( () =>{
  //   const length = recipes.length
  //   setRand(length)
  // }, [recipes])
 

  const setRand = (length) => {
    const randInt = getRandomInt(0, length)
    console.log(randInt);
    setRandPosition(randInt)
  }

  const onSearchAgain = () => {
    props.history.push('/search')
  }

  const onAddDish = () => {
    props.history.push('/add')
  }
  

if (!recipes || randPosition === null) return <div>Loading</div>
  return (
      <section>
          <h1>Dish Result</h1>
          <h3>Name of Dish: {recipes[randPosition].title  || ''}</h3>
          <p>Type: {recipes[randPosition].type  || ''}</p>
          <p>Full Meal? {recipes[randPosition].onePot? 'Yes' : 'No'}</p>
          <p>Kosher Status: {recipes[randPosition].kosherStatus || ''}</p>
          <p>Difficulty Level: {recipes[randPosition].difficult? 'Challenging':'Easy'}</p>
          <p>Approximate Cooking Time: {recipes[randPosition].time  || ''}</p>
          

          <button onClick={onSearchAgain}>Search Again</button>
          <button onClick={onAddDish}>Add a new dish</button>

      </section>
  )
}
