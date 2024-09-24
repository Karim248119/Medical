import bones from "../../public/assets/icons/bones.png";
import cardiology from "../../public/assets/icons/cardiology.png";
import ear from "../../public/assets/icons/ear.png";
import kidney from "../../public/assets/icons/kidney.png";
import neurology from "../../public/assets/icons/neurology.png";
import ophthalmology from "../../public/assets/icons/ophthalmology.png";
import pulmonology from "../../public/assets/icons/pulmonology.png";
import dermatology from "../../public/assets/icons/dermatology.png";
import gastroenterology from "../../public/assets/icons/gastroenterology.png";
import gynecology from "../../public/assets/icons/gynecology.png";
import urology from "../../public/assets/icons/urology.png";
import oncology from "../../public/assets/icons/oncology.png";

export const SPECIALTIES = [
  { id: 1, name: "Cardiology", icon: cardiology },
  { id: 2, name: "Dermatology", icon: dermatology },
  { id: 3, name: "Otorhinolaryngology", icon: ear },
  { id: 4, name: "Gastroenterology", icon: gastroenterology },
  { id: 5, name: "Gynecology", icon: gynecology },
  { id: 6, name: "Neurology", icon: neurology },
  { id: 7, name: "Ophthalmology", icon: ophthalmology },
  { id: 8, name: "Pulmonology", icon: pulmonology },
  { id: 9, name: "Urology", icon: urology },
  { id: 10, name: "Orthopedic Surgery", icon: bones },
  { id: 11, name: "Renal Medicine", icon: kidney },
  { id: 12, name: "Oncology", icon: oncology },
];

export const DOCTORS = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: SPECIALTIES[0],
    img: "https://images.pexels.com/photos/6627931/pexels-photo-6627931.jpeg",
  },
  {
    id: 2,
    name: "Dr. Mary Jane",
    specialty: SPECIALTIES[1],
    img: "https://images.pexels.com/photos/6627898/pexels-photo-6627898.jpeg",
  },
  {
    id: 3,
    name: "Dr. Lara Smith",
    specialty: SPECIALTIES[2],
    img: "https://images.pexels.com/photos/5214950/pexels-photo-5214950.jpeg",
  },
  {
    id: 4,
    name: "Dr. David Lee",
    specialty: SPECIALTIES[3],
    img: "https://images.pexels.com/photos/6129573/pexels-photo-6129573.jpeg",
  },
  {
    id: 5,
    name: "Dr. Emily Brown",
    specialty: SPECIALTIES[4],
    img: "https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg",
  },
  {
    id: 6,
    name: "Dr. Michael Davis",
    specialty: SPECIALTIES[5],
    img: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg",
  },
  {
    id: 7,
    name: "Dr. Sarah Taylor",
    specialty: SPECIALTIES[6],
    img: "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg",
  },
  {
    id: 8,
    name: "Dr. William White",
    specialty: SPECIALTIES[7],
    img: "https://images.pexels.com/photos/8460094/pexels-photo-8460094.jpeg",
  },
  {
    id: 9,
    name: "Dr. Olivia Martin",
    specialty: SPECIALTIES[8],
    img: "https://images.pexels.com/photos/5998482/pexels-photo-5998482.jpeg",
  },
  {
    id: 10,
    name: "Dr. James Johnson",
    specialty: SPECIALTIES[9],
    img: "https://images.pexels.com/photos/7469496/pexels-photo-7469496.jpeg",
  },
];

export const NEWS = [
  {
    id: 1,
    title: "New Study Finds Link Between Diet and Cancer",
    description:
      "A recent study has found a link between diet and cancer, with certain foods increasing" +
      "the risk of developing the disease.",
    date: "2024-01-01",
    img: "https://th.bing.com/th/id/R.b0feeb02dfc06aec87915f1696cac196?rik=FT4FaH6F2YEWXg&pid=ImgRaw&r=0",
    reacts: 65,
    views: 96,
  },
  {
    id: 2,
    title: "New Treatment for Rare Disease Approved",
    description:
      "A new treatment for a rare disease has been approved by the FDA, offering hope to those affected.",
    date: "2024-01-15",
    img: "https://th.bing.com/th/id/R.de929bd1f4df80d7fb864742c9678f08?rik=UoadW3ly%2bqo%2bzw&pid=ImgRaw&r=0",
    reacts: 45,
    views: 78,
  },
  {
    id: 3,
    title: "New Study Finds Link Between Exercise and Mental Health",
    description:
      "A recent study has found a link between exercise and mental health, with regular physical" +
      "activity improving symptoms of anxiety and depression.",
    date: "2024-02-16",
    img: "https://th.bing.com/th/id/OIP.geW5VMVOBBdJGLtsvBd54wHaDs?w=2160&h=1077&rs=1&pid=ImgDetMain",
    reacts: 90,
    views: 120,
  },
  {
    id: 4,
    title: "New Study Finds Link Between Sleep and Weight Loss",
    description:
      "A recent study has found a link between sleep and weight loss, with adequate sleep" +
      "improving weight loss efforts.",
    date: "2024-03-01",
    img: "https://adelaidesleep.com.au/wp-content/uploads/2020/01/adelaide-sleep-a-good-nights-sleep-makes-all-the-difference.jpg",
    reacts: 75,
    views: 100,
  },
];
