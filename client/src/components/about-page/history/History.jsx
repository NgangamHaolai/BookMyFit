import TertiaryHeading from "../../headings/TertiaryHeading";

import mountain from "../../../images/about-page/mountain.png";
import target from "../../../images/about-page/target.png";
import img1 from "../../../images/about-page/img1.webp";
import img2 from "../../../images/about-page/img2.webp";

function History() {
  return (
    <section className="bg-[url('./images/about-page/bg.png')] bg-cover px-6 py-32 text-center">
      <div className="container grid shadow-2xl xl:grid-cols-2 ">
        <div className="flex h-full flex-col gap-4 self-center bg-white p-4">
          <img
            src={target}
            alt=""
            className="hover:rotate-y-180 mx-auto w-32 transition-all duration-700"
          />
          <TertiaryHeading>Our history</TertiaryHeading>
          <p className="font-medium text-gray-300">
          BookMyFit was founded with a passion for fitness and a commitment to helping individuals achieve their best selves. What started as a small training space has grown into a premier fitness community, offering expert coaching, cutting-edge equipment, and a supportive environment. Over the years, we have empowered countless members to push their limits, break barriers, and embrace a healthier lifestyle. At BookMyFit, your fitness journey is our mission!
          </p>
        </div>

        <div className="overflow-hidden">
          <img
            src={img1}
            alt=""
            className="h-full transition-all duration-300 hover:scale-110"
          />
        </div>

        <div className="flex h-full flex-col gap-4 self-center bg-white p-4 xl:order-4">
          <img
            src={mountain}
            alt=""
            className="hover:rotate-y-180 mx-auto transition-all duration-700"
          />
          <TertiaryHeading>Our Mission</TertiaryHeading>
          <p className="font-medium text-gray-300">
          At BookMyFit, our mission is to inspire and empower individuals to achieve their fitness goals through expert guidance, innovative training, and a supportive community. We are committed to fostering a healthier, stronger, and more confident you!
          </p>
        </div>

        <div className="overflow-hidden">
          <img
            src={img2}
            alt=""
            className="h-full transition-all duration-300 hover:scale-110"
          />
        </div>
      </div>
    </section>
  );
}

export default History;
