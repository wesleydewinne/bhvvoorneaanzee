import { Helmet } from 'react-helmet';

const Meta = () => (
    <Helmet>
        <meta name="theme-color" content="#317EFB" />
        <meta name="author" content="W&S Adviesgroep BV" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
    </Helmet>
);

export default Meta;
