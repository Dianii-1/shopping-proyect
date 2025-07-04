"use client";

import Image from "next/image";

import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "./slideshow.css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {

  return (
    <div className={className}>
      <Swiper
      style={{
        width:'100vh',
        height:'500px'
      }}
        pagination
        modules={[FreeMode, Autoplay, Pagination]}
        autoplay={{delay:2500}}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              alt={title}
              src={`/products/${image}`}
              width={600}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
