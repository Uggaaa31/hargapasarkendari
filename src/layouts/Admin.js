// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/Footer/Footer.js';
// Layout components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes.js';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// Custom Chakra theme
import theme from 'theme/theme.js';
// Custom components
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import PanelContent from '../components/Layout/PanelContent';

import PrivateRoute from 'components/Auth/PrivateRoute';

export default function Dashboard(props) {
    const { ...rest } = props;

    const [ sidebarVariant, setSidebarVariant ] = useState('transparent');
    const [ fixed, setFixed ] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        setIsLoggedIn(!!token);

        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem('userToken'));
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const getRoute = () => {
        return window.location.pathname !== '/admin/full-screen-maps';
    };
    const getActiveRoute = (routes) => {
        let activeRoute = 'Default Brand Text';
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse) {
                let collapseActiveRoute = getActiveRoute(routes[i].views);
                if (collapseActiveRoute !== activeRoute) {
                    return collapseActiveRoute;
                }
            } else if (routes[i].category) {
                let categoryActiveRoute = getActiveRoute(routes[i].views);
                if (categoryActiveRoute !== activeRoute) {
                    return categoryActiveRoute;
                }
            } else {
                if (routes[i].layout && routes[i].path && window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                    return routes[i].name;
                }
            }
        }
        return activeRoute;
    };
    const getActiveNavbar = (routes) => {
        let activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].category) {
                let categoryActiveNavbar = getActiveNavbar(routes[i].views);
                if (categoryActiveNavbar !== activeNavbar) {
                    return categoryActiveNavbar;
                }
            } else {
                if (routes[i].layout && routes[i].path && window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                    if (routes[i].secondaryNavbar) {
                        return routes[i].secondaryNavbar;
                    }
                }
            }
        }
        return activeNavbar;
    };

    const getRoutes = (routesList) => {
        return routesList.map((prop, key) => {

            if (prop.collapse) {
                return getRoutes(prop.views);
            }
            if (prop.category) {
                return getRoutes(prop.views);
            }
            
            if (prop.layout === '/admin' || prop.layout === '/auth') {
                if (prop.private) {
                    return (
                        <PrivateRoute path={prop.layout + prop.path} key={key}>
                            <Route path={prop.layout + prop.path} component={prop.component} />
                        </PrivateRoute>
                    );
                } else {
                    return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
                }
            }
            return null;
        });
    };

    document.documentElement.dir = 'ltr';

    return (
        <ChakraProvider theme={theme} resetCss={false}>
            <Sidebar
                routes={routes}
                logoText={'HARGA PASAR KENDARI'}
                display='none'
                sidebarVariant={sidebarVariant}
                isLoggedIn={isLoggedIn}
                {...rest}
            />
            <MainPanel
                w={{
                    base: '100%',
                    xl: 'calc(100% - 275px)'
                }}>
                <Portal>
                    <AdminNavbar
                        onOpen={onOpen}
                        logoText={'harga-pasar-kendari'}
                        brandText={getActiveRoute(routes)}
                        secondary={getActiveNavbar(routes)}
                        fixed={true}
                        {...rest}
                    />
                </Portal>
                {getRoute() ? (
                    <PanelContent>
                        <PanelContainer>
                            <Switch>
                                {getRoutes(routes)}
                                <Redirect from='/admin' to='/admin/dashboard' />
                            </Switch>
                        </PanelContainer>
                    </PanelContent>
                ) : null}
                <Footer />
            </MainPanel>
        </ChakraProvider>
    );
}