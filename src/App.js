import React, { Component } from "react";

import MediaSession from "@mebtte/react-media-session";

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}

class App extends Component {
  state = {
    selectedTrack: null,
    player: "stopped"
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selectedTrack !== prevState.selectedTrack &&
      this.state.selectedTrack !== null
    ) {
      this.player.src = this.state.selectedTrack.url;
      this.player.play();
      this.setState({ player: "playing" });
    }
    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        this.setState({ selectedTrack: null });
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ) {
        this.player.play();
      }
    }
  }

  componentDidMount() {
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
  }
  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  render() {
    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);
    const list = [
      {
        id: 1,
        title: "Chapter 01 - The Beginning of Things",

        album: "Railway Children",
        url:
          "https://ia802803.us.archive.org/2/items/railway_children_librivox/railwaychildren_01_nesbit_64kb.mp3"
      },
      {
        id: 2,
        title: "Chapter 02 - Peter's Coal-mine",

        album: "Railway Children",
        url:
          "https://ia802803.us.archive.org/2/items/railway_children_librivox/railwaychildren_02_nesbit_64kb.mp3"
      },
      {
        id: 3,
        title: "Chapter 03 - The Old Gentleman",

        album: "Railway Children",
        url:
          "https://ia802803.us.archive.org/2/items/railway_children_librivox/railwaychildren_03_nesbit_64kb.mp3"
      },

      {
        id: 4,
        title: "Chapter 04 - The Engine Burglar",

        album: "Railway Children",
        url:
          "https://ia802803.us.archive.org/2/items/railway_children_librivox/railwaychildren_03_nesbit_64kb.mp3"
      },

      {
        id: 5,
        title: "Chapter 05 - Prisoners and Captives",

        album: "Railway Children",
        url:
          "https://ia802803.us.archive.org/2/items/railway_children_librivox/railwaychildren_03_nesbit_64kb.mp3"
      },

      {
        id: 6,
        title: "Chapter 06 - Saviours of the Train",

        album: "Railway Children",
        url:
          "https://ia802803.us.archive.org/2/items/railway_children_librivox/railwaychildren_03_nesbit_64kb.mp3"
      },

      {
        id: 7,
        title: "Chapter 07 - For Valour",

        album: "Railway Children",
        url:
          "https://ia802803.us.archive.org/2/items/railway_children_librivox/railwaychildren_03_nesbit_64kb.mp3"
      },

      {
        id: 8,
        title: "Chapter 08 - The Amateur Firemen ",

        album: "Railway Children",
        url:
          "https://ia802803.us.archive.org/2/items/railway_children_librivox/railwaychildren_03_nesbit_64kb.mp3"
      },

      {
        id: 9,
        title: "Chapter 09 - The Pride of Perks ",

        album: "Railway Children",
        url:
          "https://ia802803.us.archive.org/2/items/railway_children_librivox/railwaychildren_03_nesbit_64kb.mp3"
      },

      {
        id: 10,
        title: "Chapter 10 - The Terrible Secret ",

        album: "Railway Children",
        url:
          "https://ia802803.us.archive.org/2/items/railway_children_librivox/railwaychildren_03_nesbit_64kb.mp3"
      }
    ].map(item => {
      return (
        <li
          className="list-item"
          key={item.id}
          onClick={() => this.setState({ selectedTrack: item })}
        >
          {item.title}
        </li>
      );
    });
    return (
      <div className="wrapper">
        <div className="card frame">
          <h1 className="card-title header center" style={{marginTop:"20px"}}>
       
            Railway Children audiobook
          </h1>
          <hr />
          <ul className="list-wrapper">{list}</ul>
          <div>
            {this.state.player === "paused" && (
              <button onClick={() => this.setState({ player: "playing" })}>
                Play
              </button>
            )}
            {this.state.player === "playing" && (
              <button onClick={() => this.setState({ player: "paused" })}>
                Pause
              </button>
            )}
            {this.state.player === "playing" ||
            this.state.player === "paused" ? (
              <button onClick={() => this.setState({ player: "stopped" })}>
                Stop
              </button>
            ) : (
              " "
            )}{" "}
          </div>
          <div>
            {this.state.player === "playing" ||
            this.state.player === "paused" ? (
              <div>
                {" "}
                {currentTime}/{duration}
              </div>
            ) : (
              " "
            )}
          </div>
          <audio ref={ref => (this.player = ref)} />
          {this.state.selectedTrack !== null ? (
            <MediaSession
              title={this.state.selectedTrack.title}
              artist={this.state.selectedTrack.artist}
              album={this.state.selectedTrack.album}
              artwork={[
                {
                  src: "https://images.zattoo.com/9e746/128x128.jpg",
                  type: "image/jpeg"
                },
                {
                  sizes: "256x256",
                  src: "https://images.zattoo.com/9e746/256x256.jpg",
                  type: "image/jpeg"
                },
                {
                  sizes: "512x512",
                  src: "https://images.zattoo.com/9e746/512x512.jpg",
                  type: "image/jpeg"
                }
              ]}
              onPlay={() => this.setState({ player: "playing" })}
              onPause={() => this.setState({ player: "paused" })}
              onSeekBackward={() =>
                (this.player.currentTime = this.player.currentTime - 5)
              }
              onSeekForward={() =>
                (this.player.currentTime = this.player.currentTime + 5)
              }
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
export default App;
