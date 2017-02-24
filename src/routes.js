/**
 * Imports
 */
import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {IntlProvider} from 'react-intl';

// Required components
import Application from './components/pages/Application/Application';
import NotFound from './components/pages/NotFound/NotFound';

import Homepage from './components/pages/Homepage/Homepage';
import Checkout from './components/pages/Checkout/Checkout';
import CollectionProductsPage from './components/pages/Collections/CollectionProductsPage';
import ProductListingPage from './components/pages/Products/ProductListingPage';
import ProductPage from './components/pages/Products/ProductPage';

import Account from './components/pages/Account/Account';
import AccountBase from './components/pages/Account/AccountBase';
import AccountOrderDetailsPage from './components/pages/Account/AccountOrderDetailsPage';
import Login from './components/pages/Account/Login';
import Logout from './components/pages/Account/Logout';
import Register from './components/pages/Account/Register';
import RegisterConfirm from './components/pages/Account/RegisterConfirm';
import Reset from './components/pages/Account/Reset';
import ResetConfirm from './components/pages/Account/ResetConfirm';

import StoresPage from './components/pages/StaticContent/StoresPage';
import InfoPage from './components/pages/StaticContent/InfoPage';

import ArticlesListingPage from './components/pages/Articles/ArticlesListingPage';
import ArticlePage from './components/pages/Articles/ArticlePage';

import CorporatePage from './components/pages/Corporate/CorporatePage';

import PharmacyPage from './components/pages/Pharmacy/PharmacyPage';


import Admin from './components/pages/Admin/Admin';
import AdminCollections from './components/pages/Admin/Collections/AdminCollections';
import AdminCollectionsEdit from './components/pages/Admin/Collections/AdminCollectionsEdit';
import AdminContents from './components/pages/Admin/Contents/AdminContents';
import AdminContentsEdit from './components/pages/Admin/Contents/AdminContentsEdit';
import AdminCustomers from './components/pages/Admin/Customers/AdminCustomers';
import AdminDashboard from './components/pages/Admin/Dashboard/AdminDashboard';
import AdminOrders from './components/pages/Admin/Orders/AdminOrders';
import AdminOrdersEdit from './components/pages/Admin/Orders/AdminOrdersEdit';
import AdminProducts from './components/pages/Admin/Products/AdminProducts';
import AdminProductsEdit from './components/pages/Admin/Products/AdminProductsEdit';

/**
 * Application's Routes
 */
const routes = (
    <Route name="app" path="/" component={Application}>
      <IndexRoute name="homepage" component={Homepage} />
      <Route name="pharmacy" component={PharmacyPage} />
      <Route name="corporate" component={CorporatePage} />
      <Route name="login" component={Login} />
      <Route name="logout" component={Logout} />
      <Route name="register" component={Register} />
      <Route name="register-confirm" path="register/confirm/:token" component={RegisterConfirm} />
      <Route name="reset" component={Reset} />
      <Route name="reset-confirm" path="reset/confirm/:token" component={ResetConfirm} />
      <Route name="account" component={AccountBase}>
          <IndexRoute component={Account} />
          <Route name="account-order-details" path="orders/:orderId/?" component={AccountOrderDetailsPage} />
      </Route>
      <Route name="collection" path="collections/:collectionId/?" component={CollectionProductsPage} />
      <Route name="collection-slug" path="collections/:collectionId/:collectionSlug/?" component={CollectionProductsPage} />
      <Route name="products" path="products/?" component={ProductListingPage} />
      <Route name="product" path="products/:productId/?" component={ProductPage} />
      <Route name="product-slug" path="products/:productId/:productSlug/?" component={ProductPage} />
      <Route name="checkout" component={Checkout} />
      <Route name="stores" component={StoresPage} />
      <Route name="info" component={InfoPage} />
      <Route name="articles" path="articles/?" handler={ArticlesListingPage} />
      <Route name="article" path="articles/:contentId/?" handler={ArticlePage} />
      <Route name="article-slug" path="articles/:contentId/:contentSlug/?" handler={ArticlePage} />
      <Route name="adm" component={Admin}>
        <IndexRoute name="adm-dashboard" component={AdminDashboard} />
        <Route name="adm-collections" path="collections" component={AdminCollections} />
        <Route name="adm-collection-edit" path="collections/:collectionId/?" component={AdminCollectionsEdit} />
        <Route name="adm-contents" path="contents" component={AdminContents} />
        <Route name="adm-content-edit" path="contents/:contentId/?" component={AdminContentsEdit} />
        <Route name="adm-customers" path="customers" component={AdminCustomers} />
        <Route name="adm-orders" path="orders" component={AdminOrders} />
        <Route name="adm-order-edit" path="orders/:orderId/?" component={AdminOrdersEdit} />
        <Route name="adm-products" path="products" component={AdminProducts} />
        <Route name="adm-product-edit" path="products/:productId/?" component={AdminProductsEdit} />
      </Route>
      <Route path="*" name="not-found" component={NotFound} />
    </Route>
);

/**
 * Exports
 */
export default routes;
