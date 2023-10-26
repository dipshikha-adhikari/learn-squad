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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  let debouncedFn = debounced(handleResize, 400);

  useEffect(() => {
    window.addEventListener("resize", debouncedFn);

    return () => window.removeEventListener("resize", debouncedFn);
  }, []);

  function debounced(fn: Function, delay: any) {
    let timeout: any;
    return function () {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn();
      }, delay);
    };
  }

  function handleResize() {
    setScreenWidth(window.innerWidth);
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
      {item?.images.length !== undefined && (
        <span className="">
          {screenWidth > 600
            ? currentSlide + 1 + '/' + item.images.length
            : currentSlide + '/' + item.images.length}
        </span>
      )}
    </>
  );
}
