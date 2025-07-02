import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const PageMeta = ({ title, description, keywords, url, image }) => (
    <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        {url && <link rel="canonical" href={url} />}
        {image && <meta property="og:image" content={image} />}
    </Helmet>
);

PageMeta.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string,
};

export default PageMeta;