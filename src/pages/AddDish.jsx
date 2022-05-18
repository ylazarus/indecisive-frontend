import React, { useEffect, useState } from "react"
import { useForm } from "../hooks/useForm"
import { recipeService } from "../services/recipeService"

export const AddDish = (props) => {
  const [hasSaved, setHasSaved] = useState(null)

  const [dish, handleChange, setDish] = useForm(null)

  useEffect(() => {
    loadDish()
  }, [])

  const loadDish = async () => {
    setHasSaved(false)
    const id = props.match.params.id
    const dish = id
      ? await recipeService.getById(id)
      : recipeService.getEmptyRecipe()
    setDish(dish)
  }

  const onSaveDish = async (ev) => {
    ev.preventDefault()
    await recipeService.save({ ...dish })
    setHasSaved(true)
  }

  const onBack = () => {
    props.history.push("/search")
  }

  if (hasSaved)
    return (
      <section>
        <div>Your entry has been saved, thanks!</div>
        <button onClick={onBack}>Back to Search</button>
        <button onClick={loadDish}>Add Another Recipe</button>
      </section>
    )
  if (!dish) return <div>Loading...</div>

  return (
  <section>
      <h1>Add a new dish!</h1>
      <form onSubmit={onSaveDish}>
        <section>
            <label htmlFor="title">Title</label>
            <input onChange={handleChange} value={dish.title} type="text" name="title" id="title" />
        </section>
        <section>
          <label htmlFor="type">Type</label>
          <select name="type" id="type" onChange={handleChange} value={dish.type}>
            <option disabled value="">Select Type</option>
            <option value="Main">Main</option>
            <option value="Vegetable side">Vegetable Side</option>
            <option value="Starch side">Starch Side</option>
            <option value="Soup">Soup</option>
            <option value="Salad">Salad</option>
            <option value="Dessert">Dessert</option>
          </select>
        </section>
        <section>
          <label htmlFor="kosherStatus">Kosher Status</label>
          <select name="kosherStatus" id="kosherStatus" onChange={handleChange} value={dish.kosherStatus}>
            <option value="">All</option>
            <option value="Meat">Meat</option>
            <option value="Dairy">Dairy</option>
            <option value="Parve">Parve</option>
          </select>
        </section>
        <section>
          <label htmlFor="onePot">Is it a one pot meal?</label>
          <select name="onePot" id="onePot" onChange={handleChange} value={dish.onePot}>
            <option value="false">No, needs something else</option>
            <option value="true">Yes!</option>
          </select>
        </section>
        <section>
          <label htmlFor="difficult">Is it easy to make?</label>
          <select name="difficult" id="difficult" onChange={handleChange} value={dish.difficult}>
            <option value="false">Easy peasy!</option>
            <option value="true">Kinda hard</option>
          </select>
        </section>
        <section>
            <label htmlFor="time">How many minutes does it take to make?</label>
            <input onChange={handleChange} value={dish.time} type="number" name="time" id="time" />
        </section>
        <button>Save Recipe</button>
        </form>
  </section>
  )
}
