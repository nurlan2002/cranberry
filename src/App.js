import './App.css';
import Header from './Store/components/Header';
import Home from './Store/components/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Store from './Store/components/Store';
import Slider from './Store/components/Slider';
import Admin from './Admin/Admin';
import Checkout from './Store/components/Checkout';
import AccountForm from './Store/components/AccountForm';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Wishlist from './Store/components/Wishlist';
import Checkout2Step from './Store/components/Checkout2Step';
import { MyCheckoutContext } from './Store/CheckoutStateProvider';
import AccountDetails from './Store/components/AccountDetails';
import PaymentFinish from './Store/components/PaymentFinish';
import Loader from './Common/Loader';

function App() { 
  const [{loading}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      }
      else {
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });
  }, []);


  return (
    <Router>
      <Loader loading={loading} />
      <div className="App" style={{opacity: loading ? 0.15 : 1}}>
        <Switch>
          <Route path="/admin">
            <Admin />        
          </Route>
          <Route path="/account-details">
            <Slider/>
            <main id="main">
              <Header/>
              <AccountDetails />
            </main>      
          </Route>
          <Route path="/account">
            <Slider/>
            <main id="main">
              <Header/>
              <AccountForm />   
            </main>      
          </Route>
          <Route path="/wishlist">
            <Slider/>
            <main id="main">
              <Header/>
              <Wishlist />
            </main>      
          </Route>
          <Route exact path="/checkout-finished">
            <Slider/>
            <PaymentFinish />                 
          </Route>
          <Route exact path="/checkout-proceeded">
            <Slider/>
            <MyCheckoutContext>
              <Checkout2Step />  
            </MyCheckoutContext>                
          </Route>
          <Route exact path="/checkout">
            <Slider/>
            <Checkout />      
          </Route>
          <Route path="/women">
            <Slider/>
            <main id="main">
              <Header/>
              <Store gender={"Women"}/>
            </main>            
          </Route>
          <Route path="/men">
            <Slider/>
            <main id="main">
              <Header/>
              <Store gender={"Men"}/>
            </main>
          </Route>
          <Route path="/">
            <Slider/>
            <main id="main">
              <Header/>
              <Home/>
            </main>
          </Route>
        </Switch>
        
      </div>
    </Router>
    
  );
}

export default App;
