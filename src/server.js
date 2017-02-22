import React from 'react';
import express from 'express';
import {FluxibleComponent} from 'fluxible-addons-react';
import serialize from 'serialize-javascript';
import BaseHtml from './components/core/BaseHtml';
import ReactDOMServer from'react-dom/server';
import navigateAction from './actions/Application/navigate';
import webpackStats from '../webpack/stats';
import app from './app';
import config from './config';

// var express = require('express');
let favicon = require('serve-favicon');
// var serialize = require('serialize-javascript');
let renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;
// var renderToString = require('react-dom/server').renderToString;
let debug = require('debug')('Example');


/*
* Actions
*/
import clearRouteErrors from './actions/Application/clearRouteErrors';
import fetchAllCollections from './actions/Collections/fetchAllCollections';
import setLocale from './actions/Application/setLocale';
import setMobileBreakpoint from './actions/Application/setMobileBreakpoint';

// let FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');

import { match, RouterContext } from 'react-router';

/**
 * Helper methods
*/
function dispatchClearRouteErrors(context) {
    return new Promise(function (resolve, reject) {
        context.executeAction(clearRouteErrors, {}, function () { resolve(); });
    });
}
function dispatchFetchAllCollections(context) {
    return new Promise(function (resolve, reject) {
        context.executeAction(fetchAllCollections, {}, function () { resolve(); });
    });
}

function dispatchSetLocale(context, locale) {
    return new Promise(function (resolve, reject) {
        context.executeAction(setLocale, locale, function () { resolve(); });
    });
}
function dispatchSetMobileBreakpoint(context, isMobile) {
    return new Promise(function (resolve, reject) {
        context.executeAction(setMobileBreakpoint, isMobile, function () { resolve(); });
    });
}

/**
 * Express server
 */
let server = express();

// 1) Serve static files
server.use('/public', express['static'](__dirname + '/build'));
server.use('/robots.txt', express['static'](__dirname + '/../static/robots.txt'));

// 2) If requesting root URL, redirect to default locale
server.get('/', function (req, res, next) {
    let defaultLocale = config.app.locale.default || 'en';
    debug(`Redirecting to default locale: ${defaultLocale}`);
    return res.redirect(301, `/${defaultLocale}`);
});

server.use(function (req, res, next) {
    debug('Executing navigate action');
    match({
        routes: app.getComponent(),
        location: req.url
    }, function (error, redirectLocation, renderProps) {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            let context = app.createContext({config: config});
            console.log('CONTEXT!!!!!!', context, 'NAVIGATE!!!', navigateAction);
            context.executeAction(navigateAction, {path: req.url}, function () {
                debug('Exposing context state');
                let exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
                debug('Rendering Application component into html');
                console.log();
                let markupElement = React.createElement(
                        FluxibleComponent,
                        { context: context.getComponentContext() },
                        React.createElement(RouterContext, renderProps),
                    );
                let html = renderToStaticMarkup(
                    <BaseHtml
                        context={context.getComponentContext()}
                        state={exposed}
                        markup={ReactDOMServer.renderToString(markupElement)}
                        css={webpackStats.css}
                        scripts={webpackStats.scripts}
                        staticURL={'/static'}
                    />
                );

                debug('Sending markup');
                res.status(200).send(html);
            });
        } else {
            next();
        }
    })
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
