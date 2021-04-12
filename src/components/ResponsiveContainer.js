import PropTypes from 'prop-types'
import React from 'react'
import DesktopContainer from './DesktopNav'
import MobileContainer from './MobileNav'

const ResponsiveContainer = (props) => (
    <div>
        <DesktopContainer data={props ? props.res : null}>{props.children}</DesktopContainer>
        <MobileContainer>{props.children}</MobileContainer>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}
export default ResponsiveContainer