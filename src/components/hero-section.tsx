interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {}

export default function HeroSection({ ...props }: HeroSectionProps) {
  const {} = props;

  return (
    <section className="relative flex">
      <div className="moshn-container z-[999] pt-[24vw] md:pt-[calc(3.57vw+clamp(45px,3.57vw,200px))] h-screen">
        <div className="z-10 flex flex-col justify-between h-full">
          <div>
            <h1 className=" heading-large leading-[130%] whitespace-nowrap font-title">
              Creative Design <br /> & Development <br /> Agency
            </h1>
          </div>

          <div className="hidden md:grid grid-cols-3 text-center text-large border-t h-20 font-title">
            <div className="border-r flex items-center justify-center">
              Advertising
            </div>
            <div className=" flex items-center justify-center">Marketing</div>
            <div className="border-l flex items-center justify-center">
              3D Modeling
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
