import React, { Component } from "react";
import "./index.css";
import Cards, { Card } from "react-swipe-deck";
import swal from "sweetalert";
import { Carousel } from "react-bootstrap";

class CardComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      myData: {}
    };
  }
  componentDidMount() {
    console.log("this.props***********************");
    console.log(this.props);
  }
  action(res) {
    console.log(res);
  }
  rightSwape(res) {
    console.log(res);

    swal(`“Do you want to meet ${res.name}?”`, {
      buttons: ["No", "Yes"]
    }).then(value => {
      if (value) {
        this.getVenues(res);
      }
    });
  }
  getVenues(res) {
    this.setState(
      { myData: JSON.parse(localStorage.getItem("meetingAppUserData")) },
      () => {
        console.log("my Data *************");
        console.log(this.state.myData);
        console.log("user Data *************");
        console.log(res);
        this.goToDir({
          location: "/meetupLocation",
          myData: this.state.myData,
          userData: res
        });
      }
    );
  }
  goToDir = res => {
    console.log("going to ***" + res);
    this.props.meetuplocation(res);
  };
  render() {
    const { list } = this.props;
    return (
      <Cards
        size={[, 400]}
        cardSize={[300, 400]}
        onEnd={() => {
          this.action("end");
        }}
        className="master-root"
      >
        {list.map(item => (
          <Card
            onSwipeLeft={() => {
              this.action("rejected********" + item);
            }}
            onSwipeRight={() => {
              this.rightSwape(item);
            }}
            // onSwipeTop={() => {this.action('swipe Top')}}
            // onSwipeBottom={() => {this.action('swipe Bottom')}}
          >
            <div className="divInside">
              <Carousel>
                {item.imgList.map(res => {
                  return (
                    <Carousel.Item>
                      <div
                      className="cardImg"
                        style={{
                          backgroundImage: `url(${res})`,
                          width: "300px",
                          height: "400px",
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                      />
                      <Carousel.Caption>
                        <h2 style={{ color: "white" }}>{item.name}</h2>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </Card>
        ))}
      </Cards>
    );
  }
}

export default CardComponent;
