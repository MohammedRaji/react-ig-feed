import React, { useState, useEffect, useRef } from "react";
import styles from './styles.module.css'

const InstagramFeed = props => {

  const { token, counter } = props;
  const placeholder = useRef();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const type = showImage ? 'hidePlaceholder' : 'placeholder';

  let url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url,caption&&access_token=${token}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      fetch(url)
        .then(response => response.json())
        .then(result => {
          setData(result.data)
          console.log('JavaScript version is here https://codecanyon.net/item/instaget-javascript-library-for-instagram/26300578');
        })
        .catch((error) => setIsError(true));
      setIsLoading(false);
    };

    fetchData();

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowImage(true);
        }
      });
    };

    const options = {
      threshold: 1.0
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(placeholder.current);

    // intersection observer set-up
    return () => observer.disconnect();

  }, [url]);


  return (
    <div>
      {isLoading ? (<div> Loading... </div>)
        : isError ? (
          <div>
            <p className="errorMessage"> the access token is not valid</p>
          </div>)
          : (
            <div className={styles.instagramItems} ref={placeholder}>
              {showImage && (
                data.slice(0, counter).map((item, index) => (
                  <div key={index} className={styles.instagramItem}>
                    <a
                      key={index}
                      href={item.permalink}
                      className="ig-instagram-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {(item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM') ?
                       <img
                          className={styles.instagramImg}
                          key={index}
                          src={item.media_url}
                          alt="description"
                        /> : <video className={styles.instagramImg} key={index} src={item.media_url} alt={item.caption} type="video/mp4"></video>
                      }


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
                )))}
            </div>)}
    </div>
  );
}
export default InstagramFeed;
