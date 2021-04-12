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
  Segment,
  Embed,
  Rating,
} from "semantic-ui-react";
import Fetch from "../helpers/Fetch";
import { Link } from "react-router-dom";
import axios from "axios";
import { find } from "lodash";
import logo from "../logo-17.svg";
import { Helmet } from "react-helmet";
import getSrc from "../helpers/getSrc";
import { parseHTML, isParseError } from "../helpers/parseHTML";

let def;
class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rating: "",
      articleArray: [],
    };
    this.handleRate = this.handleRate.bind(this);
    this.putDataToDB = this.putDataToDB.bind(this);
    this.deleteFromDB = this.deleteFromDB.bind(this);
    this.updateDataToDB = this.updateDataToDB.bind(this);
  }

  componentDidMount() {
    const parsedJson = Fetch(this.props.location.state.url);
    parsedJson.then((value) => {
      this.setState({
        data: value,
      });
    });
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then((data) => data.json())
      .then((res) => {
        this.setState({ articleArray: res.data });
      })
      .then((e) => {
        if (
          this.state.articleArray.length > 0 &&
          undefined !==
            find(this.state.articleArray, [
              "id",
              parseInt(this.props.location.state.id),
            ])
        ) {
          def = find(this.state.articleArray, [
            "id",
            parseInt(this.props.location.state.id),
          ]).rating;
          this.setState({
            rating: def,
          });
        }
      });
  };

  handleRate(e, { rating, maxRating }) {
    this.setState({ rating, maxRating });
    this.putDataToDB(rating);
  }

  putDataToDB = (message) => {
    if (this.state.articleArray.length > 0) {
      let newid = this.props.location.state.id;
      let ratingobj = find(this.state.articleArray, ["id", parseInt(newid)]);
      if (ratingobj !== undefined) {
        this.updateDataToDB(ratingobj.id, message);
      } else {
        axios.post("http://localhost:3001/api/putData", {
          id: this.props.location.state.id,
          rating: message,
        });
      }
    } else
      axios
        .post("http://localhost:3001/api/putData", {
          id: this.props.location.state.id,
          rating: message,
        })
        .then((e) =>
          this.setState({
            rating: message,
          })
        );
  };

  updateDataToDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.articleArray.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });
    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: { rating: updateToApply },
    });
  };

  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.articleArray.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objIdToDelete,
      },
    });
    this.setState({
      rating: null,
    });
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
                <Header as="h2">Rate Us:</Header>
                <Rating
                  maxRating={5}
                  onRate={this.handleRate}
                  icon="star"
                  size="huge"
                  clearable={true}
                  rating={this.state.rating}
                />
                <Button
                  basic
                  color="grey"
                  onClick={() =>
                    this.deleteFromDB(this.props.location.state.id)
                  }
                >
                  Clear
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
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

export default Article;
