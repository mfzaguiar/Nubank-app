import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Main from '~/pages/Main';
import New from '~/pages/New';

const Routes = createAppContainer(createSwitchNavigator({Main, New}));

export default Routes;
