/**
 * Imports
 */
import React from 'react';
import _ from 'lodash';
// import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

import {slugify} from '../../../utils/strings';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Heading from '../typography/Heading';
import Text from '../typography/Text';

// Translation data for this component
import intlData from './ArticleSummary.intl';

/**
 * Component
 */
class ArticleSummary extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ArticleSummary.scss');
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: intlStore.getCurrentLocale()}; // Base route params
        let articleRouteParams = _.assign({
            contentId: this.props.content.id,
            contentSlug: slugify(intlStore.getMessage(this.props.content.name))
        }, routeParams);

        let headingSize = 'medium';
        if (['small', 'large'].indexOf(this.props.size) !== -1) {
            headingSize = this.props.size;
        }

        let showReadMore = this.props.content.body.markdown && this.props.content.body.markdown[intlStore.getCurrentLocale()]
            && this.props.content.body.markdown[intlStore.getCurrentLocale()] !== ''
            && !this.props.hideLink;

        //
        // Return
        //
        return (
            <div className="article-summary">
                <Heading size={headingSize}>
                    {intlStore.getMessage(this.props.content.name)}
                </Heading>
                <div className="article-summary__content">
                    <Text size="small">
                        {intlStore.getMessage(this.props.content.body.summary)}
                        {showReadMore ?
                            <Link className="article-summary__link"
                                  to="article-slug"
                                  params={articleRouteParams}>
                                  message={intlStore.getMessage(intlData, 'readMore')}
                                <i className="fa fa-file-text-o" aria-hidden="true" />
                            </Link>
                            :
                            null
                        }
                    </Text>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default ArticleSummary;
