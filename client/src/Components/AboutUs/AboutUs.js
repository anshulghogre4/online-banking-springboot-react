import React from "react";
import aniket from "../../assets/images/Aniket.jpg";
import anup from "../../assets/images/Anup.jpg";
import pratap from "../../assets/images/An_Pratap.jpg";
import Anshul from "../../assets/images/Anshul.jpg";
import baghel from "../../assets/images/nofillpng.png";

const AboutUs = () => {
  return (
    <div className=" ">
      {/* Section -1 */}
      <section className="2xl:container 2xl:mx-auto lg:py-16  p-0 m-0  md:py-12 md:px-6 py-9">
        <div className=" section1  flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
              About Project
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 ">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum.In the first place we have granted to
              God, and by this our present charter confirmed for us and our
              heirs forever that the English Church shall be free, and shall
              have her rights entire, and her liberties inviolate; and we will
              that it be thus observed; which is apparent from
            </p>
          </div>
          <div className="w-full lg:w-8/12 ">
            <img
              className="w-full h-full"
              src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
              alt="A group of People"
            />
          </div>
        </div>
      </section>

      {/* Section -2 */}

      <section className="section2 text-center pt-[4rem] ">
        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 py-8 mb-8 ">
          Our Contributions And Learnings.
        </h1>
      </section>

      {/* section 3 */}

      <section className=" bg-[#ff7979] w-full px-[4rem] h-[60vh]  flex flex-row justfy-around items-center">
        <div className="wrapper w-full h-full flex flex-row justify-around items-center space-x-[-5rem] ">
          {/* Pic and introduction */}
          <div className=" flex flex-col flex-1  justify-center items-center mr-[10rem]  ">
            <div className="flex flex-row justify-center items-center border-[0.5rem] rounded-full border-gray-300">
              <img
                className="w-[15rem] h-[15rem] object-cover rounded-full"
                src={Anshul}
                alt="Anshul's pic"
              />
            </div>
            <h3 className="text-[#f7f1e3] mt-[2rem] font-bold">
              NAME: ANSHUL GHOGRE(LEAD)
            </h3>
            <h3 className="text-[#f7f1e3] mt-[0.5rem] font-bold ">
              PRN:220950120031
            </h3>
          </div>
          {/* Contribution and learnings */}
          <div className=" flex flex-col flex-1 space-y-[4rem] ">
            <div className=" flex flex-col justify-center">
              <h2 className="text-[1.5rem] font-semibold ">My Contribution</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
                libero facilis nesciunt, doloribus explicabo dolore aliquam
                inventore porro cumque aspernatur.
              </p>
            </div>

            <div className=" flex flex-col justify-center">
              <h2 className="text-[1.5rem] font-semibold ">My Learnings</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ratione, a itaque. Enim tempore magni adipisci ullam omnis odio
                nesciunt aliquid?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 */}

      <section className=" bg-[#33d9b2] w-full px-[4rem] h-[60vh]  flex flex-col justfy-around items-center mt-[10rem] ">
        <div className="wrapper w-full h-full flex flex-row-reverse justify-around items-center space-x-[-5rem] ">
          {/* Pic and introduction */}
          <div className=" flex flex-col flex-1  justify-center items-center">
            <div className="flex flex-row justify-center items-center border-[0.5rem] rounded-full border-gray-300">
              <img
                className="w-[15rem] h-[15rem] object-cover rounded-full"
                src={aniket}
                alt="Aniket's pic"
              />
            </div>
            <h3 className="text-[#f7f1e3] mt-[2rem] font-bold">
              NAME: ANIKET SAMBHAJI GHOGARE
            </h3>
            <h3 className="text-[#f7f1e3] mt-[0.5rem] font-bold ">
              PRN:220950120023
            </h3>
          </div>
          {/* Contribution and learnings */}
          <div className=" flex flex-col flex-1  relative left-[5rem] space-y-[4rem]  ">
            <div className=" flex flex-col justify-center">
              <h2 className="text-[1.5rem] font-semibold ">My Contribution</h2>
              <p>
                In this project I designed backend layers for transactions, account, Fundtransfer like controller, 
                services and repository. Also designed frontend pages for the backend functionality using react-js.
                Also contributed for to connect backend with frontend. <br/>
                Technologies used: SpringBoot, java, mysql, react, html, tailwind-css, nodejs, etc.
              </p> 
            </div>

            <div className=" flex flex-col justify-center">
              <h2 className="text-[1.5rem] font-semibold ">My Learnings</h2>
              <p>
                I learned lot of things from this project like UI design, three tier architecture, springboot, security etc.
                The git & github platform helps us to develope this project remotely and also for contribution of the team members.
                I learned all the functionality of the github. The most interesting part is the connect backend with frontend that I understand 
                during this project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 5 */}

      <section className=" bg-[#ffda79] w-full px-[4rem] h-[60vh]  flex flex-row justfy-around items-center mt-[10rem]">
        <div className="wrapper w-full h-full flex flex-row justify-around items-center space-x-[-5rem] ">
          {/* Pic and introduction */}
          <div className=" flex flex-col flex-1  justify-center items-center mr-[10rem]  ">
            <div className="flex flex-row justify-center items-center border-[0.5rem] rounded-full border-gray-300">
              <img
                className="w-[15rem] h-[15rem] object-cover rounded-full"
                src={anup}
                alt="Anup's pic"
              />
            </div>
            <h3 className="text-[#303952] mt-[2rem] font-bold">
              NAME: ANUP KUMAR
            </h3>
            <h3 className="text-[#303952] mt-[0.5rem] font-bold ">
              PRN:220950120032
            </h3>
          </div>
          {/* Contribution and learnings */}
          <div className=" flex flex-col flex-1 space-y-[4rem] ">
            <div className=" flex flex-col justify-center">
              <h2 className="text-[1.5rem] font-semibold ">My Contribution</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
                libero facilis nesciunt, doloribus explicabo dolore aliquam
                inventore porro cumque aspernatur.
              </p>
            </div>

            <div className=" flex flex-col justify-center">
              <h2 className="text-[1.5rem] font-semibold ">My Learnings</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ratione, a itaque. Enim tempore magni adipisci ullam omnis odio
                nesciunt aliquid?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 6 */}

      <section className=" bg-[#485460] w-full px-[4rem] h-[60vh]  flex flex-col justfy-around items-center mt-[10rem] ">
        <div className="wrapper w-full h-full flex flex-row-reverse justify-around items-center space-x-[-5rem] ">
          {/* Pic and introduction */}
          <div className=" flex flex-col flex-1  justify-center items-center">
            <div className="flex flex-row justify-center items-center border-[0.5rem] rounded-full border-gray-300">
              <img
                className="w-[15rem] h-[15rem] object-cover rounded-full"
                src={pratap}
                alt="pratap's pic"
              />
            </div>
            <h3 className="text-[#f7f1e3] mt-[2rem] font-bold">
              NAME: ANURAG PRATAP SINGH
            </h3>
            <h3 className="text-[#f7f1e3] mt-[0.5rem] font-bold ">
              PRN:220950120033
            </h3>
          </div>
          {/* Contribution and learnings */}
          <div className=" flex flex-col flex-1  relative left-[5rem] space-y-[4rem]  ">
            <div className=" flex flex-col justify-center">
              <h2 className="text-[1.5rem] font-semibold text-[#f7f1e3]">
                My Contribution
              </h2>
              <p className="text-[#f7f1e3]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
                libero facilis nesciunt, doloribus explicabo dolore aliquam
                inventore porro cumque aspernatur.
              </p>
            </div>

            <div className=" flex flex-col justify-center">
              <h2 className="text-[1.5rem] font-semibold text-[#f7f1e3] ">
                My Learnings
              </h2>
              <p className="text-[#f7f1e3]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ratione, a itaque. Enim tempore magni adipisci ullam omnis odio
                nesciunt aliquid?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 7 */}

      <section className=" bg-[#778beb] w-full px-[4rem] h-[60vh]  flex flex-row justfy-around items-center mb-[6rem] mt-[10rem]">
        <div className="wrapper w-full h-full flex flex-row justify-around items-center space-x-[-5rem] ">
          {/* Pic and introduction */}
          <div className=" flex flex-col flex-1  justify-center items-center mr-[10rem]  ">
            <div className="flex flex-row justify-center items-center border-[0.5rem] rounded-full border-gray-300">
              <img
                className="w-[15rem] h-[15rem] object-cover rounded-full"
                src={baghel}
                alt="baghel's pic"
              />
            </div>
            <h3 className="text-[#f7f1e3] mt-[2rem] font-bold">
              NAME:ANURAG SINGH BAGHEL
            </h3>
            <h3 className="text-[#f7f1e3] mt-[0.5rem] font-bold ">
              PRN:220950120034
            </h3>
          </div>
          {/* Contribution and learnings */}
          <div className=" flex flex-col flex-1 space-y-[4rem] ">
            <div className=" flex flex-col justify-center">
              <h2 className="text-[1.5rem] font-semibold ">My Contribution</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
                libero facilis nesciunt, doloribus explicabo dolore aliquam
                inventore porro cumque aspernatur.
              </p>
            </div>

            <div className=" flex flex-col justify-center">
              <h2 className="text-[1.5rem] font-semibold ">My Learnings</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ratione, a itaque. Enim tempore magni adipisci ullam omnis odio
                nesciunt aliquid?
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 py-8 mb-8 ">
          Thank You!
        </h1>
      </section>
    </div>
  );
};

export default AboutUs;
