import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import DrawerLayout from 'react-native-drawer-layout';

const {
    PropTypes
} = React;

export default class Drawer extends DrawerLayout {
    
    /*** CONTEXT ***/
    static contextTypes = {drawer: PropTypes.object};
    static childContextTypes = {drawer: PropTypes.object};
    getChildContext = () => ({drawer: this});
    
    /*** END CONTEXT ***/
    
    shouldComponentUpdate (nextProps:any, nextState:any):boolean {
        return shallowCompare(this, nextProps, nextState);
    }
    
    _openDrawer () {
        this.openDrawer();
    }
    
    // This method is required by react-native-router-flux to show open drawer icon at top
    toggle = () => {
        this._openDrawer();
    }
}
