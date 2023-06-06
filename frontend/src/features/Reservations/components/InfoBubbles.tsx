import Img from "components/Img";

interface BubbleProps {
  image?: string;
  date: Date;
}

const Bubble = ({ image, date }: BubbleProps) => {
  return (
    <div className="relative border rounded-full w-20 h-20 bg-white overflow-hidden">
      <Img
        src={image}
        alt="Logo"
        className="w-full h-full object-cover contrast-125"
      />
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-[#00000033]"></div>
      <div className="absolute w-full bottom-0 flex justify-center bg-green-600 text-white text-sm font-semibold">
        hello
      </div>
    </div>
  );
};

const InfoBubbles = () => {
  const date = new Date();
  return (
    <div className="absolute sm:flex flex-col right-0 top-0 pr-2 pt-2 gap-2 hidden">
      <Bubble image="/bar.jpeg" date={date} />
      <Bubble image="/barber.jpg" date={date} />
      <Bubble image="/hotel.png" date={date} />
      <Bubble image="/bar.jpeg" date={date} />
    </div>
  );
};

export default InfoBubbles;
