import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRandomInt } from "../services/utilService"
import { loadRecipes } from "../store/actions/recipeActions"

export const DishResult = (props) => {
  let [currPosition, setCurrPosition] = useState(0)
  let [outOfRecipes, setOutOfRecipes] = useState(false)

  const { recipes } = useSelector((state) => state.recipeModule)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadRecipes())
  }, [])

  const onShowMeAnother = () => {
    const numOfResults = recipes.length
    if (currPosition === numOfResults - 1) setOutOfRecipes(true)
    setCurrPosition(++currPosition)
    console.log(currPosition, "is current position")
  }

  const onSearchAgain = () => {
    props.history.push("/search")
  }

  const onAddDish = () => {
    props.history.push("/add")
  }
  const onEditDish = () => {
    props.history.push(`/add/${recipes[currPosition]._id}`)
  }

  if (!recipes) return <div className="card-display">Loading...</div> 
    if (!recipes.length) 
    return (
    <section className="card-display">
      <h1>Aw Snap!</h1>
      <p>Looks like no dishes match your search :(</p>
      <p>Please modify your search or, better yet, add your own dish!</p>
      <button className="myButton" onClick={onSearchAgain}>Search Again</button>
      <button className="myButton" onClick={onAddDish}>Add a new dish</button>

    </section>
    )
  if (outOfRecipes)
    return (
      <section className="card-display">
        <h3>No more recipes to display!</h3>
        <p>Start a new search if you still can't decide!</p>
        <button className="myButton" onClick={onSearchAgain}>Search Again</button>
      </section>
    )
  return (
    <section className="card-display">
      <div className="dish-info flex column auto-center">
        <h1>Dish Result</h1>
        <h3>Name: {recipes[currPosition].title || ""}</h3>
        <p>Type: {recipes[currPosition].type || ""}</p>
        <p>Is it a Full Meal? {recipes[currPosition].one_pot ? "Yes" : "No"}</p>
        <p>Kosher Status: {recipes[currPosition].kosher_status || ""}</p>
        <p>
          Difficulty Level:{" "}
          {recipes[currPosition].difficult ? "Challenging" : "Easy"}
        </p>
        <p>
          Approx. Cooking Time: {recipes[currPosition].time || ""} minutes
        </p>
      </div>
      <div className="another-option flex column auto-center">
        <button className="myButton" onClick={onShowMeAnother}>Show me another option</button>
        <span> (You have {recipes.length - currPosition - 1} tries left)</span>
      </div>
      <div className="other-options flex column justify-center">

      <button className="myButton" onClick={onSearchAgain}>Search Again</button>
      <button className="myButton" onClick={onAddDish}>Add a new dish</button>
      <button className="myButton" onClick={onEditDish}>Edit this dish</button>
      </div>
    </section>
  )
}
