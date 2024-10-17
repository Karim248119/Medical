"use client";
import { IMGS } from "@/utilities/Image";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { MdFormatQuote } from "react-icons/md";

const quotes = [
  {
    quote: "When people show you who they are believe them the first time.",
    author: "Maya Angelou",
  },

  {
    quote:
      "A woman unaffected by insults has made her enemies absolutely powerless.",
    author: "Entity",
  },

  {
    quote: "Life is the flower for which love is the honey.",
    author: "Victor Hugo",
  },

  {
    quote:
      "Love’s greatest gift is its ability to make everything it touches, sacred.",
    author: "Barbara De Angelis",
  },

  {
    quote: "Be yourself as everyone else is taken.",
    author: "Oscar Wilde",
  },

  {
    quote:
      "Your practice of forgiveness is your ticket to clarity, vitality and freedom",
    author: "Iyanla Vanzant",
  },

  {
    quote: "Change the world by being yourself.",
    author: "Amy Poehler",
  },

  {
    quote: "Every moment is a fresh beginning.",
    author: "T.S. Eliot",
  },

  {
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo De Vinci",
  },

  {
    quote: "What we think we become.",
    author: "Buddha",
  },
];
export default function Quotes() {
  return (
    <div
      className="w-full h-[50vh] my-20"
      style={{
        backgroundImage: `url(${IMGS.welcome.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Carousel className=" w-full h-full bg-primary/80">
        <CarouselContent>
          {quotes?.map((quote: any, index: number) => (
            <CarouselItem key={index} className="basis-1/1 ">
              <div className="flex w-screen h-[50vh] flex-col gap-8 justify-center items-center text-white text-center px-3">
                <MdFormatQuote className="md:text-6xl text-4xl text-accent" />
                <p className="md:text-2xl text-lg  ">{quote.quote}</p>
                <div className="md:h-[2px] h-[1px] md:w-1/4 w-1/3 bg-accent" />
                <p className="md:text-base text-sm">{quote.author}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
