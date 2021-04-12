import PropTypes from 'prop-types'
import React from 'react'
import {
    Button,
    Container,
    Header,
    Icon,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const HomepageHeading = ({ mobile, data }) => (
    <Container text>
        <Header
            as='h6'
            content={data ? data.card_title : 'Imagine-a-Hotel.'}
            inverted
            className={mobile ? 'mobile-heading-home-h1' : 'desktop-heading-home-h1'}
        />
        <Header
            as='h2'
            content={data ? data.slug : 'Go wherever you want when you want to.'}
            inverted
            className={mobile ? 'mobile-heading-home-h2' : 'desktop-heading-home-h2'}
        />
        <Link to='/'>
            <Button basic color='black' size='large'>
                Get Started
        <Icon name='right arrow' />
            </Button>
        </Link>
    </Container >
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}

export default HomepageHeading