import Header from "@/components/shared/Header";
import DocCard from "@/components/cards/DocCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { getAllDoctors } from "@/api/doctors";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await getAllDoctors(1, 100, "", "");
      setDoctors(response.data);
    };
    fetchDoctors();
  }, [doctors]);
  return (
    <div className="w-full">
      <Header subtitle="trusted care" title="Our Doctors" className="mb-10" />
      <Carousel
        opts={{
          align: "center",
        }}
        className=" w-[90%] mx-auto  "
      >
        <CarouselContent>
          {doctors.map((doctor, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/1 lg:basis-1/5 flex justify-center items-center"
            >
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
