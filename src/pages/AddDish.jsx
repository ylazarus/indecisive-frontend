import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "../hooks/useForm"
import { recipeService } from "../services/recipeService"
import { userService } from "../services/user-service"
import { removeRecipe, addRecipe } from "../store/actions/recipeActions"

export const AddDish = (props) => {
  const [hasSaved, setHasSaved] = useState(null)
  const [alreadyInDB, setAlreadyInDB] = useState(false)
  const [currUser, setCurrUser] = useState(null)

  const [dish, handleChange, setDish] = useForm(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const currUser = userService.getLoggedinUser()
    setCurrUser(currUser)
    loadDish()
  }, [])

  const id = props.match.params.id

  const loadDish = async () => {
    setHasSaved(false)
    let dish
    if (id) {
      const dishes = await recipeService.getById(id)
      dish = dishes[0]
    } else dish = recipeService.getEmptyRecipe()
    setDish(dish)
  }

  const onSaveDish = async (ev) => {
    ev.preventDefault()
    if (!id) dish.addedById = currUser.id // updates only if it's a new dish
    console.log("dish to be saved: ", dish)
    try {
      await dispatch(addRecipe({ ...dish })) // handles both create and update in store / service

      setHasSaved(true)
    } catch (error) {
      console.log("failed to add dish")
      setHasSaved(true)
      setAlreadyInDB(true)
    }
  }

  const onDeleteDish = async () => {
    await dispatch(removeRecipe(id))
    props.history.push("/search")
  }

  const onBack = () => {
    props.history.push("/search")
  }

  const onToLogin = () => {
    props.history.push("/login")
  }

  if (hasSaved)
    return (
      <section className="card-display">
        <div>
          {alreadyInDB ? (
            <p>
              "Your dish was not saved, probably because that dish is already in
              the database! Please try adding another dish"
            </p>
          ) : (
            <p>"Your entry has been saved, thanks!"</p>
          )}
        </div>
        <button className="myButton" onClick={onBack}>
          Back to Search
        </button>
        <button className="myButton" onClick={loadDish}>
          Add Another Recipe
        </button>
      </section>
    )
  if (!dish) return <div>Loading...</div>
  if (!currUser)
    return (
      <section className="card-display">
        <h3>You must be logged in to {id ? "edit" : "add a dish"}</h3>
        <button onClick={onToLogin} className="myButton">
          To Login
        </button>
      </section>
    )

  return (
    <section className="card-display">
      {id ? <h1>Edit dish!</h1> : <h1>Add a new dish!</h1>}
      <form
        className="new-dish-info flex column p5"
        onSubmit={onSaveDish}
      >
        <section>
          <label htmlFor="title" className="bold">Title </label>
          <input
            onChange={handleChange}
            value={dish.title}
            type="text"
            name="title"
            id="title"
          />
        </section>
        <section>
          <label htmlFor="type" className="bold">Type </label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={dish.type}
          >
            <option disabled value="">
              Select Type
            </option>
            <option value="Main">Main</option>
            <option value="Vegetable side">Vegetable Side</option>
            <option value="Starch side">Starch Side</option>
            <option value="Soup">Soup</option>
            <option value="Salad">Salad</option>
            <option value="Dessert">Dessert</option>
          </select>
        </section>
        <section>
          <label htmlFor="kosherStatus" className="bold">Kosher Status </label>
          <select
            name="kosherStatus"
            id="kosherStatus"
            onChange={handleChange}
            value={dish.kosherStatus}
          >
            <option value="">All</option>
            <option value="Meat">Meat</option>
            <option value="Dairy">Dairy</option>
            <option value="Parve">Parve</option>
          </select>
        </section>
        <section>
          <label htmlFor="onePot" className="bold">One dish meal? </label>
          <select
            name="onePot"
            id="onePot"
            onChange={handleChange}
            value={dish.onePot}
          >
            <option value="false">No, needs something else</option>
            <option value="true">Yes!</option>
          </select>
        </section>
        <section>
          <label htmlFor="difficult" className="bold">Is it easy to make? </label>
          <select
            name="difficult"
            id="difficult"
            onChange={handleChange}
            value={dish.difficult}
          >
            <option value="false">Easy peasy!</option>
            <option value="true">Kinda hard</option>
          </select>
        </section>
        <section>
          <label htmlFor="time" className="bold">Num of minutes? </label>
          <input
            onChange={handleChange}
            value={dish.time}
            type="number"
            name="time"
            id="time"
          />
        </section>
        <button className="myButton m20">Save Recipe</button>
      </form>
      {id && currUser.is_admin && (
        <button className="myButton m20" onClick={onDeleteDish}>
          Delete Recipe
        </button>
      )}
    </section>
  )
}
