import { useDispatch } from "react-redux"
import { useForm } from "../hooks/useForm"
import { setSearchBy } from "../store/actions/recipeActions"

export const SearchRecipes = (props) => {

  const [searchBy, handleChange, setSearch] = useForm({kosherStatus: '', type: '',})


  // const { recipes } = useSelector((state) => state.recipeModule)
  const dispatch = useDispatch()

  const onSearch = async (ev) => {
    ev.preventDefault()
    await dispatch(setSearchBy(searchBy))
    props.history.push('/result')
    // dispatch(loadRecipes())
  }

  const onAddDish = () => {
    props.history.push('/add')
  }

  return (
    <section>
      <form onSubmit={onSearch}>
        <section>
          <label htmlFor="type">Type</label>
          <select name="type" id="type" onChange={handleChange} value={searchBy.type}>
            <option value="">All Types</option>
            <option value="main">Main</option>
            <option value="vegetable side">Vegetable Side</option>
            <option value="starch side">Starch Side</option>
            <option value="soup">Soup</option>
            <option value="salad">Salad</option>
            <option value="dessert">Dessert</option>
          </select>
        </section>
        <section>
          <label htmlFor="kosherStatus">Kosher Status</label>
          <select name="kosherStatus" id="kosherStatus" onChange={handleChange} value={searchBy.kosherStatus}>
            <option value="">All</option>
            <option value="meat">Meat</option>
            <option value="dairy">Dairy</option>
            <option value="parve">Parve</option>
          </select>
        </section>
        {/* <section>
          <input type="checkbox" id="quick" name="quick" onChange={handleChange} value={searchBy.quick} />
          <label htmlFor="quick">I'm in a rush</label>
        </section> */}
        {/* <section>
          <label htmlFor="tag">Tag</label>
          <select name="tag" id="tag" onChange={handleChange} value={searchBy.tag}>
            <option value="meat">Meat</option>
            <option value="chicken">Chicken</option>
            <option value="fish">Fish</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="shabbat">Shabbat</option>
            <option value="pasta">Pasta</option>
            <option value="leftovers">Leftovers</option>
            <option value="healthy">Healthy</option>
            <option value="kid-friendly">Kid Friendly</option>
          </select>
        </section> */}
        {/* kosherStatus: '', 
        quick: null, 
        type: '',
        tags: [], */}
        
        <button>Search!</button>
      </form>
      <button onClick={onAddDish}>Add a new dish</button>
    </section>
  )
}
