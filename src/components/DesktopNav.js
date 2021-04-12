import PropTypes from "prop-types";
import React, { Component } from "react";
import { Container, Menu, Segment, Visibility, Image } from "semantic-ui-react";
import { createMedia } from "@artsy/fresnel";
import HomepageHeading from "./Header";
import logo from "../logo-6.svg";
import { Link } from "react-router-dom";

const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920,
  },
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { data, children } = this.props;
    const { fixed } = this.state;
    return (
      <>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            className={!data && "desktop-menu-segment"}
            style={
              data && {
                backgroundImage: `url(${data.thumbnail_url})`,
                backgroundSize: "cover",
              }
            }
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
              borderless
            >
              <Container>
                <Link to="/">
                  <Menu.Item as="a">
                    <Image
                      src={logo}
                      size="medium"
                      className="hotel-logo"
                    ></Image>
                  </Menu.Item>
                </Link>
              </Container>
            </Menu>
            <HomepageHeading data={data} />
          </Segment>
        </Visibility>

        {children}
      </>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

export default DesktopContainer;
