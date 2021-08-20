import React, { useState } from "react";
import Swiper from "react-id-swiper";
import Noimage from "../../assets/img/noimage.png";
import "swiper/css/swiper.css";

const ImageSwiper = (props) => {
  const [params, setstate] = useState({
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });

  const images = props.images;

  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div className="pmedia__thumb">
          <img src={Noimage} alt="no image" />
        </div>
      ) : (
        images.map((image) => (
          <div className="p-media__thumb">
            <img src={image.path} alt="Product Image" />
          </div>
        ))
      )}
    </Swiper>
  );
};

export default ImageSwiper;
