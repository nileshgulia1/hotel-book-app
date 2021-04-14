import React from "react";
import ResponsiveContainer from "./ResponsiveContainer";
import {
  Container,
  Grid,
  Header,
  Image,
  Card,
  Icon,
  List,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { compose } from "redux";
import { Link } from "react-router-dom";
import logo from "../logo-17.svg";
import { Helmet } from "react-helmet";
import Toast from "./Toast";

class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const { data } = this.props;
    if (data && Object.keys(data).length !== 0) {
      setTimeout(() => {
        toast.info(
          <Toast
            info
            title={"New Booking"}
            content={`Mr ${this.props.data.fullname} wants to book a property from ${this.props.data.date}`}
          />
        );
      }, 2000);
    }
  }

  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer>
        <Helmet title={"Book Hotel"} />
        <Segment className="ui-segment" vertical>
          {data && Object.keys(data).length !== 0 ? (
            <Grid doubling stackable>
              <Grid.Column>
                <Card>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                    <Card.Header>{data.fullname}</Card.Header>
                    <Card.Meta>
                      <span className="date">{data.duration}</span>
                    </Card.Meta>
                    <Card.Description>
                      Hey there I want to book a Room!
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name="user" />
                      {data.guests}
                    </a>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid>
          ) : (
            <Header as="h2">No bookings yet</Header>
          )}
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

export default compose(
  connect(
    (state, props) => ({
      data: state.saveData.data,
    }),
    {}
  ),
  withRouter
)(Host);
