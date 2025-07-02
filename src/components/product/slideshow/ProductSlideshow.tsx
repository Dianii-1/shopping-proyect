"use client";
import { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Swiper as SwiperObject } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "./slideshow.css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              alt={title}
              src={`/products/${image}`}
              width={1024}
              height={800}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
