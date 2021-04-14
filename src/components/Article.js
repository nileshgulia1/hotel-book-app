import React from "react";
import ResponsiveContainer from "./ResponsiveContainer";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Checkbox,
  Segment,
  Embed,
  Modal,
  Form,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import { saveData } from "../actions";
import Fetch from "../helpers/Fetch";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { Link } from "react-router-dom";
import Toast from "./Toast";

import logo from "../logo-17.svg";
import { Helmet } from "react-helmet";
import getSrc from "../helpers/getSrc";
import { parseHTML, isParseError } from "../helpers/parseHTML";
class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rating: "",
      articleArray: [],
      open: false,
    };
  }

  componentDidMount() {
    const parsedJson = Fetch(this.props.location.state.url);
    parsedJson.then((value) => {
      this.setState({
        data: value,
      });
    });
  }

  onSubmit = (event) => {
    const values = Array.from(event.target);
    let data = {};
    values.map((item) => {
      data[item.name] = item.value;
    });
    this.props.saveData(data);
    this.setState({ open: false }, () =>
      toast.success(
        <Toast
          info
          title={"Booking Confirmed"}
          content={`Booking confirmed with name ${data.fullname}`}
        />
      )
    );
  };

  render() {
    return (
      <ResponsiveContainer res={this.state.data}>
        <Helmet
          title={this.state.data.length > 0 && this.state.data.seo_meta.title}
          meta={{
            name: "description",
            content: `${
              this.state.data.length > 0 && this.state.data.seo_meta.metadesc
            }`,
          }}
        />
        <Segment className="ui-segment" vertical>
          <Grid columns={2} doubling stackable>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  {this.state.data.title}
                </Header>
                {this.state.data.content ? (
                  <p className="excerpt-title">
                    {parseHTML(this.state.data.content[1].text)}
                  </p>
                ) : null}
                {this.state.data.content ? (
                  <p className="para-layout">
                    {parseHTML(this.state.data.content[0].text)}
                  </p>
                ) : null}
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                {this.state.data.content && this.state.data.content[2].content && (
                  <div>
                    <Embed
                      placeholder={
                        this.state.data.content[3].blocks[1].posts[2]
                          .thumbnail_url
                      }
                      className="embed-video"
                      url={getSrc(this.state.data.content[2].content)}
                      autoplay={true}
                    ></Embed>
                  </div>
                )}
                {this.state.data.content && this.state.data.content[2].gallery && (
                  <div>
                    <Image
                      bordered
                      rounded
                      size="huge"
                      src={this.state.data.content[2].gallery[0].url}
                    />
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1em 0em",
                  }}
                >
                  <Button primary onClick={() => this.setState({ open: true })}>
                    Request to Book
                  </Button>
                  <Link to="/user">
                    <Button secondarys>Go Back</Button>
                  </Link>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Modal
          onClose={() => this.setState({ open: false })}
          open={this.state.open}
        >
          <Modal.Header>Fill details</Modal.Header>
          <Modal.Content image>
            <Image
              size="medium"
              src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
              wrapped
            />
            <Modal.Description>
              <Form onSubmit={this.onSubmit}>
                <Form.Field inline>
                  <label>Full Name</label>
                  <input placeholder="Full Name" name="fullname" />
                </Form.Field>
                <Form.Field inline>
                  <label>Property Name</label>
                  <b name="propertyname">{this.state.data.slug}</b>
                </Form.Field>
                <Form.Field inline>
                  <label>Check-in date:</label>
                  <input placeholder="Date" name="date" />
                </Form.Field>
                <Form.Field inline>
                  <label>No of guests</label>
                  <input name="guests" />
                </Form.Field>
                <Form.Field inline>
                  <label>Stay Duration</label>
                  <input name="duration" />
                </Form.Field>
                <Form.Field inline>
                  <Checkbox label="I agree to the Terms and Conditions" />
                </Form.Field>
                <Modal.Actions>
                  <Button
                    color="black"
                    onClick={() => this.setState({ open: false })}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    content="Submit"
                    labelPosition="right"
                    icon="checkmark"
                    positive
                  />
                </Modal.Actions>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <Segment className="footer-segment" vertical>
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
              {this.state.data.content &&
                this.state.data.content.map((it) => {
                  if (it.type === "text_module")
                    return (
                      it.blocks &&
                      it.blocks.map((item) => {
                        if (item.type === "related_articles")
                          return item.posts.map((ob) => (
                            <Grid.Column className="grid-column">
                              <Header as="h3" className="ui-header">
                                {ob.card_title ? ob.card_title : ob.title}
                              </Header>
                              <p className="para-layout">
                                <Image avatar src={ob.thumbnail_url} />
                                {ob.title}
                              </p>
                            </Grid.Column>
                          ));
                      })
                    );
                })}
            </Grid.Row>
          </Grid>
        </Segment>

        <Header
          as="h1"
          content="Gallery"
          textAlign="center"
          className="ui-header"
        />
        <Grid container columns={2} doubling stackable>
          {this.state.data.content &&
            this.state.data.content.map((it) => {
              if (it.type === "hotel_module")
                return it.gallery.map((item) => (
                  <Grid.Column>
                    <Image src={item.url} size="large"></Image>
                    <Header as="h6" className="ui-header">
                      {item.title}
                    </Header>
                    <Divider />
                  </Grid.Column>
                ));
            })}
        </Grid>
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
  connect((state, props) => ({}), { saveData }),
  withRouter
)(Article);
