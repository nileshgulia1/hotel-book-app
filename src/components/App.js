import React from "react";
import ResponsiveContainer from "./ResponsiveContainer";
import {
  Container,
  Grid,
  Header,
  Image,
  List,
  Segment,
} from "semantic-ui-react";
import Fetch from "../helpers/Fetch";
import { Link } from "react-router-dom";
import logo from "../logo-17.svg";
import { Helmet } from "react-helmet";
import Cards from "./Card";

class HomepageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const parsedJson = Fetch(
      "http://trivago-magazine-work-sample-server.s3-website.eu-central-1.amazonaws.com/latest_posts.json"
    );
    parsedJson.then((value) => {
      this.setState({
        data: value,
      });
    });
  }

  render() {
    return (
      <ResponsiveContainer>
        <Helmet title={"Book Hotel"} />
        <Segment className="ui-segment" vertical>
          <Grid columns={3} doubling stackable>
            {this.state.data.map((item, i) => (
              <Grid.Column>
                <Link
                  to={{
                    pathname: `/article/${item.slug}`,
                    state: { url: `${item.uri}`, id: `${item.id}` },
                  }}
                >
                  <Cards items={item} />
                </Link>
              </Grid.Column>
            ))}
          </Grid>
        </Segment>
        <Segment inverted vertical style={{ padding: "5em 0em" }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item as="a">Sitemap</List.Item>
                    <List.Item as="a">Contact Us</List.Item>
                    <List.Item as="a">Religious Ceremonies</List.Item>
                    <List.Item as="a">Gazebo Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Services" />
                  <List link inverted>
                    <List.Item as="a">Pre-Book Hotel</List.Item>
                    <List.Item as="a">DNA FAQ</List.Item>
                    <List.Item as="a">How To Access</List.Item>
                    <List.Item as="a">Search</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Link to="/">
                    <Image
                      src={logo}
                      size="small"
                      className="hotel-logo-footer"
                    ></Image>
                  </Link>
                  <p>
                    Chilling out on the bed in your hotel room watching
                    television, while wearing your own pajamas, is sometimes the
                    best part of a vacation.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </ResponsiveContainer>
    );
  }
}

export default HomepageLayout;
