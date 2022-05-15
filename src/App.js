import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import "./assets/scss/global.scss"
import { AppHeader } from "./cmps/AppHeader"
import { Home } from './pages/Home'
import { About } from "./pages/About"


function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main>
          <Switch>
            <Route path="/about" component={About}></Route>
            <Route path="/" component={Home} ></Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
