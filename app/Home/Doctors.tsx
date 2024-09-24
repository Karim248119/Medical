import Header from "@/components/shared/Header";
import { DOCTORS } from ".";
import DocCard from "@/components/cards/DocCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Doctors() {
  return (
    <div className="w-full">
      <Header subtitle="trusted care" title="Our Doctors" className="mb-10" />
      <Carousel
        opts={{
          align: "center",
        }}
        className=" w-[90%] mx-auto"
      >
        <CarouselContent>
          {DOCTORS.map((doctor, index) => (
            <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/4">
              <DocCard doctor={doctor} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
