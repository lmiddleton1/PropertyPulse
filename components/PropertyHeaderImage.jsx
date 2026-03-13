import Image from "next/image";

const PropertyHeaderImage = ({ image }) => {
  return (
    <section className="relative">
      <div className="w-full h-[550px] relative">
        <Image
          src={image}
          alt=""
          className="object-cover"
          fill
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
