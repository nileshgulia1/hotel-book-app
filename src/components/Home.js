import PropTypes from "prop-types";
import React, { Component } from "react";
import { Container, Menu, Segment, Visibility, Image } from "semantic-ui-react";
import HomepageHeading from "./Header";
import logo from "../logo-6.svg";
import { Link } from "react-router-dom";

class Home extends Component {
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
            className={"home-menu-segment"}
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
            <HomepageHeading data={data} {...this.props} />
          </Segment>
        </Visibility>

        {children}
      </>
    );
  }
}

Home.propTypes = {
  children: PropTypes.node,
};

export default Home;
