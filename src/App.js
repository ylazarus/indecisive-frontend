import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import "./assets/scss/global.scss"
import { AppHeader } from "./cmps/AppHeader"
import { Home } from './pages/Home'
import { About } from "./pages/About"
import { SearchRecipes } from "./pages/SearchRecipes"
import { DishResult } from "./pages/DishResult"
import { AddDish } from "./pages/AddDish"


function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main>
          <Switch>
            <Route path="/add/:id?" component={AddDish}></Route>
            <Route path="/result" component={DishResult}></Route>
            <Route path="/search" component={SearchRecipes}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/" component={Home} ></Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
