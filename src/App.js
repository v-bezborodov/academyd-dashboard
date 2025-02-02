import {Provider} from 'react-redux';
import {store} from './store/configureStore'
import './App.css';
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import LoginPage from "./screen/logIn";
import { ToastContainer } from 'react-toastify'
import Home from "./screen/HomePage";
import ChekTestPage from "./screen/CheckTestPage";
import BlogPage from "./screen/BlogPage";
import TestPage from "./screen/TestPage";
import CastomerPage from "./screen/CustomerPage";
import CityPage from './screen/CityPage';
import CoffeePage from './screen/CoffeeShopPage';
import CategoryPage from './screen/BlogPage/AddCategory';
import AddPostPage from './screen/BlogPage/AddPost';
import QuestionsPage from './screen/TestPage/Questions';
import QuestionsPageNew from './screen/TestPage/Questions/addQestions';
import AddPostTest from './screen/TestPage/addTest';
import CustomerEditPage from "./screen/CustomerEditPage";
import EventPage from "./screen/EventPage";
import EventEditPage from "./screen/EventEditPage";
import CalendarPage from "./screen/CalendarPage";

function App() {

    let history = useHistory()


  return (
      <Provider store={store}>
          <Router>
              <div className="App">
                  <div className="main">
                      <Switch>
                          <Route path="/" exact component={LoginPage}/>
                          <Route path="/home" exact component={Home}/>
                          <Route path="/chek-test" exact component={ChekTestPage}/>
                          <Route path="/blog" exact component={BlogPage}/>
                          <Route path="/all-test" exact component={TestPage}/>
                          <Route path="/all-questions" exact component={QuestionsPage}/>
                          <Route path="/all-customer" exact component={CastomerPage}/>
                          <Route path="/all-customer/:id" exact component={CustomerEditPage}/>
                          <Route path="/all-city" exact component={CityPage}/>
                          <Route path="/all-coffee" exact component={CoffeePage}/>
                          <Route path="/all-coffee/:id/calendar" exact component={CalendarPage}/>
                          <Route path="/blog/category" exact component={CategoryPage}/>
                          <Route path="/blog/newPost" exact component={AddPostPage}/>
                          <Route path="/all-questions/new" exact component={QuestionsPageNew}/>
                          <Route path="/all-test/new" exact component={AddPostTest}/>
                          <Route path="/event" exact component={EventPage}/>
                          <Route path="/event/:id" exact component={EventEditPage}/>
                      </Switch>
                  </div>
              </div>
          </Router>
          <ToastContainer />
      </Provider>
  );
}

export default App;
