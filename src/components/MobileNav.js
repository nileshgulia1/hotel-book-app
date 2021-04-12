import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Menu,
  Sidebar,
  Segment,
  Icon,
} from "semantic-ui-react";
import { createMedia } from "@artsy/fresnel";
import HomepageHeading from "./Header";

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

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <>
        <style>{mediaStyles}</style>
        <MediaContextProvider>
          <Segment as={Media} at="mobile">
            <Sidebar
              as={Menu}
              animation="push"
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={sidebarOpened}
            >
              <Menu.Item as="a" active>
                Home
              </Menu.Item>
              <Menu.Item as="a">Work</Menu.Item>
              <Menu.Item as="a">Company</Menu.Item>
              <Menu.Item as="a">Careers</Menu.Item>
              <Menu.Item as="a">Log in</Menu.Item>
              <Menu.Item as="a">Sign Up</Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={sidebarOpened}>
              <Segment
                inverted
                textAlign="center"
                className="mobile-menu-segment"
                vertical
              >
                <Container>
                  <Menu inverted pointing secondary size="large">
                    <Menu.Item onClick={this.handleToggle}>
                      <Icon name="sidebar" />
                    </Menu.Item>
                    <Menu.Item position="right">
                      <Button as="a" inverted>
                        Log in
                      </Button>
                      <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                        Sign Up
                      </Button>
                    </Menu.Item>
                  </Menu>
                </Container>
                <HomepageHeading mobile />
              </Segment>

              {children}
            </Sidebar.Pusher>
          </Segment>
        </MediaContextProvider>
      </>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

export default MobileContainer;
