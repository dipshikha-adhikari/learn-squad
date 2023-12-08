import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IListing, Image } from "../../../types";
import { useEffect, useState } from "react";

interface Item {
  item: IListing | undefined;
}

export default function SimpleSlider({ item }: Item) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => debounce(handleResize));

    return () =>
      window.removeEventListener("resize", () => debounce(handleResize));
  }, []);

  function debounce(cb: any) {
    let flag = false;
    return () => {
      if (flag) return;
      flag = true;
      setTimeout(() => {
        cb();
        flag = false;
      }, 400);
    };
  }

  function handleResize() {
    if (window.innerWidth >= 600 && item?.images.length === 2) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: item?.images.length === 2 ? 2 : 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider
        {...settings}
        className="overflow-hidden "
        afterChange={(cur) => {
          setCurrentSlide(cur + 1);
        }}
      >
        {item?.images.map((i: Image) => {
          return (
            <img
              src={i.url}
              alt="image"
              className="h-80 object-cover"
              key={i.url}
            />
          );
        })}
      </Slider>
      <span className={`${isHidden && "hidden"}`}>
        {currentSlide + "/" + item?.images.length}
      </span>
    </>
  );
}
