import {combineReducers} from 'redux';
import { blogReducer } from './reducer/blog';
import { customerReducer } from './reducer/customer';
import {loginReducer} from './reducer/login/Login';
import { questionsReducer } from './reducer/questions';
import { testsReducer } from './reducer/tests';
import { cityReducer } from './reducer/city';
import { coffeeReducer } from './reducer/coffee';

export const rootReducer = combineReducers({
  login: loginReducer,
  customer: customerReducer,
  blog: blogReducer,
  tests: testsReducer,
  questions: questionsReducer,
  city: cityReducer,
  coffeeShops: coffeeReducer,
});
