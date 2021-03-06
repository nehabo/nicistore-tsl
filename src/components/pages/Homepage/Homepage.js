/**
 * Imports.
 */
import React from 'react';
import async from 'async';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

import {slugify} from '../../../utils/strings';

// Flux
import CollectionsStore from '../../../stores/Collections/CollectionsStore';
import ContentsListStore from '../../../stores/Contents/ContentsListStore';
import IntlStore from '../../../stores/Application/IntlStore';
import ProductsHomepageStore from '../../../stores/Products/ProductsHomepageStore';
import ProductsListStore from '../../../stores/Products/ProductsListStore';
import SearchStore from '../../../stores/Search/SearchStore';

import fetchContents from '../../../actions/Contents/fetchContents';
import fetchHomepageProducts from '../../../actions/Products/fetchHomepageProducts';
import fetchProducts from '../../../actions/Products/fetchProducts';
import handleInput from '../../../actions/Search/handleInput';
import handleSelect from '../../../actions/Search/handleSelect';
import handleRemove from '../../../actions/Search/handleRemove';
import handleCheckout from '../../../actions/Search/handleCheckout';

// Required components
import ArticleSummary from '../../common/articles/ArticleSummary';
import Carousel from '../../common/images/Carousel';
import ProductList from '../../common/products/ProductList';

import Selection from '../../common/utils/selection';
import Cart from './cart';
import headers from './headers';

import HomepageFeaturedCollection from './HomepageFeaturedCollection';

// Translation data for this component
import intlData from './Homepage.intl';

/**
 * Component.
 */
 // require('./styles.scss');
class Homepage extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired,
    };

    //*** Required Data ***//

    static fetchData = function (context, params, query, done) {
        async.parallel([
            function (callback) {
                context.executeAction(fetchContents, {tags: 'homepage'}, callback);
            },
            function (callback) {
                context.executeAction(fetchHomepageProducts, {}, callback);
            }
        ], done);
    };

    //*** Initial State ***//

    state = {
        banners: this.context.getStore(ContentsListStore).getOrderedContentsOfType('banner', ['homepage'], true),
        articles: this.context.getStore(ContentsListStore).getOrderedContentsOfType('article', ['homepage'], true),
        collections: this.context.getStore(CollectionsStore).getOrderedCollections(['homepageFeatured'], true, 'homepageFeaturedOrder'),
        featuredCategories: this.context.getStore(CollectionsStore).getCollections(['category', 'homepage']),
        featuredCollections: this.context.getStore(CollectionsStore).getCollections(['collection', 'homepage']),
        featuredProducts: this.context.getStore(ProductsHomepageStore).getProducts(),
        options: this.context.getStore(SearchStore).getOptionsList(),
        selected: this.context.getStore(SearchStore).getSelectedItems(),
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Homepage.scss');
        this.context.executeAction(fetchProducts, {perPage: 200, sort: 'sku'});
        console.log('inside moutned comp', this.state.options);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            banners: nextProps._banners,
            articles: nextProps._articles,
            collections: nextProps._collections,
            featuredProducts: nextProps._featuredProducts,
            featuredCategories: nextProps._featuredCategories,
            featuredCollections: nextProps._featuredCollections,
            options: nextProps._options,
            selected: nextProps._selected,
        });
    }
    onInput = (userInput) => {
      // this.getSearchData();
      context.getComponentContext().executeAction(handleInput, userInput);
    }

    handleSelect = (item) => {
      console.log('im selected', item);
      context.getComponentContext().executeAction(handleSelect, item);
    }

    handleRemove = (item) => {
      context.getComponentContext().executeAction(handleRemove, item);
    }

    handleCheckout = () => {
      // context.getComponentContext().executeAction(navigateAction,
      //   { url: '/patient' });
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);

        // Base route params
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()};

        // Featured Collections
        let featuredCollections = [null, null, null, null];
        for (let i=0; i<4; i++) {
            if (this.state.collections[i]) {
                let collection = this.state.collections[i];
                featuredCollections[i] = {
                    name: collection.name,
                    link: {
                        to: 'collection-slug',
                        params: ({
                            collectionId: collection.id,
                            collectionSlug: slugify(intlStore.getMessage(collection.name))
                        }, routeParams)
                    }
                };
                if (collection.images && collection.images.length > 0) {
                    featuredCollections[i].img = {
                        src: `//${collection.images[0].url}`,
                        alt: intlStore.getMessage(collection.name)
                    };
                }
            }
        }

        // Featured Products SideMenu
        let productFilters = () => {
            if (this.state.featuredCategories.length > 0 || this.state.featuredCollections.length > 0) {
                return [
                    {
                        name: {en: 'Categories', pt: 'Categorias'},
                        collections: this.state.featuredCategories
                    },
                    {
                        name: {en: 'Collections', pt: 'Colecções'},
                        collections: this.state.featuredCollections
                    }
                ];
            }
        };

        // Fetaured Products Title Component
        let featuredProductsTitle = function() {
            return <FormattedMessage
                       message={intlStore.getMessage(intlData, 'productsList')}
                       locales={intlStore.getCurrentLocale()} />;
        };

        //
        // Return
        //
        return (
            <div className="homepage">
                <div className="homepage__cta">
                    <div className="homepage__featured">
                        <div className="homepage__featured-block">
                            <HomepageFeaturedCollection feature={featuredCollections[0]} />
                            <HomepageFeaturedCollection feature={featuredCollections[1]} />
                        </div>
                        <div className="homepage__featured-block">
                            <HomepageFeaturedCollection feature={featuredCollections[2]} />
                            <HomepageFeaturedCollection feature={featuredCollections[3]} />
                        </div>
                    </div>
                    <div className="search">
                      <div className="row">
                        <Selection
                          onInput={this.onInput}
                          onSelect={this.handleSelect}
                          onRemove={this.handleRemove}
                          selected={this.state.selected}
                          options={this.state.options}
                        />
                      </div>

                    </div>
                    <div className="homepage__banners">
                        <Carousel images={this.state.banners.filter(function (banner) {
                            return banner.body && banner.body.image;
                        }).map(function (banner) {
                            return {
                                src: `//${banner.body.image.url}`,
                                link: banner.body.link
                            };
                        })} />
                    </div>
                </div>

                {this.state.articles.length > 0 ?
                    <div className="homepage__articles">
                        {this.state.articles.map((content, idx) => {
                            let articleRouteParams = ({
                                contentId: content.id,
                                contentSlug: slugify(intlStore.getMessage(content.name))
                            }, routeParams);
                            return (
                                <div key={idx} className="homepage__article-item">
                                    <Link className="homepage__article-link" to="article-slug"
                                          params={articleRouteParams}>
                                        <ArticleSummary key={idx} size="small" content={content} hideLink={true} />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    :
                    null
                }

                <div className="homepage__products">
                    <ProductList title={featuredProductsTitle()}
                                 filters={productFilters()}
                                 products={this.state.featuredProducts} />
                </div>
            </div>
        );
    }
}

/**
 * Flux
 */
Homepage = connectToStores(Homepage, [CollectionsStore, ProductsHomepageStore], (context) => {
    return {
        _banners: context.getStore(ContentsListStore).getOrderedContentsOfType('banner', ['homepage'], true),
        _articles: context.getStore(ContentsListStore).getOrderedContentsOfType('article', ['homepage'], true),
        _collections: context.getStore(CollectionsStore).getOrderedCollections(['homepageFeatured'], true, 'homepageFeaturedOrder'),
        _featuredCategories: context.getStore(CollectionsStore).getCollections(['category', 'homepage']),
        _featuredCollections: context.getStore(CollectionsStore).getCollections(['collection', 'homepage']),
        _featuredProducts: context.getStore(ProductsHomepageStore).getProducts(),
        _options: context.getStore(SearchStore).getOptionsList(),
        _selected: context.getStore(SearchStore).getSelectedItems(),
    };
});

/**
 * Export.
 */
export default Homepage;
