import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import OrderDetails from './OrderDetails';
import PersonalInfo from './PersonalInfo';
import { useHistory, useLocation } from 'react-router-dom';
import { useStateValue } from "../../StateProvider";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonAuto() {
  const location = useLocation();
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if(user === null) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    if(path === "my-orders") {
      setValue(1);
    }
    else {
      setValue(0);
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="account__details" style={{margin: "30px 0"}}>
      <AppBar position="static" color="default" style={{boxShadow: "none", backgroundColor: "#FAF9F7", fontSize: '2rem'}}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          
        >
          <Tab label="Personal Info" {...a11yProps(0)} style={{fontSize: '1.6rem'}}/>
          <Tab label="Order History" {...a11yProps(1)} style={{fontSize: '1.6rem'}}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} style={{backgroundColor: "#FAF9F7"}}>
        <PersonalInfo />
      </TabPanel>
      <TabPanel value={value} index={1} style={{backgroundColor: "#FAF9F7"}}>
        <OrderDetails />
      </TabPanel>
    </div>
  );
}