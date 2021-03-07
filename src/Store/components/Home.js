import React from 'react';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined';
import { makeStyles } from '@material-ui/core/styles';
import '../css/Home.css';
import { useHistory } from 'react-router-dom';

function Home() {
    const history = useHistory();

    function iconStyles() {
        return {
          icon: {
            color: '#9D9D9D',
          }
        }
      }
    
    const colors = makeStyles(iconStyles)();

    return (
        <div className="home">
            <div className="home__collection">
                <div className="home__collection-text">
                    <p className="home__collection-text-weak">NEW COLLECTION</p>
                    <p className="home__collection-text-strong">SPRING <span className="home__collection-date">2021</span></p>
                    <button onClick={() => history.push("/women")} className="home__collection-text-button" style={{marginRight: "2rem"}}>Women</button>
                    <button onClick={() => history.push("/men")} className="home__collection-text-button">&nbsp;&nbsp;&nbsp;Men&nbsp;&nbsp;&nbsp;</button>
                </div>
                
                <img className="home__collection-model" src="./images/home-1-3.png"/>
            </div>

            <div className="home-details"> 
                <div className="home-details-item">
                    <StoreOutlinedIcon className={colors.icon} style={{ fontSize: 50 }}/>
                    <p className="home-details-item-text">Free returns with pick-up service</p>
                </div>
                <div className="home-details-item">
                    <LocalShippingOutlinedIcon className={colors.icon} style={{ fontSize: 50 }}/>
                    <p className="home-details-item-text">Fast shipping</p>
                </div>
                <div className="home-details-item">
                    <PaymentOutlinedIcon className={colors.icon} style={{ fontSize: 50, color: colors.icon }}/>
                    <p className="home-details-item-text">Duties included in final price</p>
                </div>
            </div>
        </div>
    )
}

export default Home
