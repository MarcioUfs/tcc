import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExitToApp from '@material-ui/icons/ExitToApp';
import StorageIcon from '@material-ui/icons/Storage';
import People from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import { logout } from '../../../services/auth';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import AddToQueueIcon from '@material-ui/icons/AddToQueue';
// import PeopleIcon from '@material-ui/icons/People';
// import BarChartIcon from '@material-ui/icons/BarChart';
import Person from '@material-ui/icons/Person';
// import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
// import PersonSearchIcon from '@material-ui/icons/PersonSearch';
// import ManageSearchIcon from '@material-ui/icons/ManageSearch';

export const mainListItems = (
  <div>
    {/* <ListItem button component="a" href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="" />
    </ListItem>
    <ListItem button component="a" href="/">
      <ListItemIcon>
        <AirlineSeatIndividualSuiteIcon />
      </ListItemIcon>
      <ListItemText primary="Casos Monitorados" />
    </ListItem>
    <ListItem button component="a" href="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários" />
    </ListItem>
    <ListItem button component="a" href="\admin">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Dados" />
    </ListItem> */}
    <ListItem button component="a" href="/tabulador">
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Pesquisa tabulador" />
    </ListItem>
    <ListItem button component="a" href="/search">
      <ListItemIcon>
      <LocationSearchingIcon />
      </ListItemIcon>
      <ListItemText primary="Pesquisa livre" />
    </ListItem>
    <ListItem button component="a" href="/dados">
      <ListItemIcon>
      <StorageIcon />
      </ListItemIcon>
      <ListItemText primary="Enviar base" />
    </ListItem>
    <ListItem button component="a" href="/user">
      <ListItemIcon>
      <Person />
      </ListItemIcon>
      <ListItemText primary="Minha conta" />
    </ListItem>
    <ListItem button component="a" href="/person">
      <ListItemIcon>
      <People />
      </ListItemIcon>
      <ListItemText primary="Administrar usuários" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button onClick={()=>logout()} component="a" href="/">
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);