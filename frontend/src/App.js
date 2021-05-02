import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Products from './screen/product/Products';
import Home from './screen/Home';
import Login from './screen/Login';
import SignUp from './screen/SignUp';
import { useSelector } from 'react-redux';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <>
      <Header></Header>
      <Switch>
        <Route path='/home' component={Home} />
        {userInfo ? <Route path='/productlist' component={Products} /> : null}
        <Route path='/login' component={Login} />
        <Route path='/register' component={SignUp} />
        <Route path="/" exact component={Home} />

      </Switch>
    </>
  );
}

export default App;
