import React, { Component } from "react";
import styles from "./styles.module.css";

class InstagramFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    let url = `https://graph.instagram.com/me/media?fields=media_count,permalink,media_url&&access_token=${this.props.token}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            feeds: result.data,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, feeds } = this.state;

    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <div className={styles.instagramItems}>
          {feeds.slice(0, this.props.counter).map((feed, index) => (
            <div key={index} className={styles.instagramItem}>
              <a
                key={index}
                href={feed.permalink}
                className="ig-instagram-link"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={styles.instagramImg}
                  key={index}
                  src={feed.media_url}
                  alt="description"
                />

                <div className={styles.instagramIcon}>
                  <div className="instagram-count-item">
                    <span className="icon">
                      {/*change your svg icon*/}

                      <svg height="18" viewBox="0 0 512 512" width="18">
                        <path
                          fill="currentColor"
                          d="m256 386c-71.683 0-130-58.317-130-130 7.14-172.463 252.886-172.413 260 .001 0 71.682-58.317 129.999-130 129.999zm0-220c-49.626 0-90 40.374-90 90 4.944 119.397 175.074 119.362 180-.001 0-49.625-40.374-89.999-90-89.999zm236 346h-472c-11.046 0-20-8.954-20-20v-472c0-11.046 8.954-20 20-20h472c11.046 0 20 8.954 20 20v472c0 11.046-8.954 20-20 20zm-452-40h432v-432h-432zm372-392c-11.046 0-20 8.954-20 20 0 11.046 8.954 20 20 20 11.046 0 20-8.954 20-20 0-11.046-8.954-20-20-20z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default InstagramFeed;
