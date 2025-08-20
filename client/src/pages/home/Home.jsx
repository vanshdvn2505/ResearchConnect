import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import { 
    FaDna, 
    FaStethoscope, 
    FaLaptopCode, 
    FaAtom, 
    FaUsers, 
    FaBookOpen, 
    FaLeaf, 
    FaChartBar,
    FaChartLine,
    FaCogs // For Engineering & Robotics
} from 'react-icons/fa';

function Home() {
  return (
    <div className="home">
      <Featured />
      {/* <TrustedBy /> */}
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>Unlock the world of academic research and collaboration</h1>
            <div className="title">
                <img src="./img/check.png" alt="Checkmark" />
                Access to Diverse Research Fields
            </div>
            <p style={{ paddingLeft: '28px' }}>
                Explore projects across various disciplines, from STEM to the humanities, and find the perfect match for your academic interests.
            </p>
            <div className="title">
                <img src="./img/check.png" alt="Checkmark" />
                Gain Hands-On Experience
            </div>
            <p style={{ paddingLeft: '28px' }}>
                Move beyond theory. Apply your knowledge to real-world research projects and develop practical skills under expert mentorship.
            </p>
            <div className="title">
                <img src="./img/check.png" alt="Checkmark" />
                Guidance from Expert Mentors
            </div>
            <p style={{ paddingLeft: '28px' }}>
                Collaborate directly with experienced professors who provide valuable feedback, guidance, and support throughout your research journey.
            </p>
            <div className="title">
                <img src="./img/check.png" alt="Checkmark" />
                Build Your Academic Portfolio
            </div>
            <p style={{ paddingLeft: '28px' }}>
                Showcase your completed projects, build a strong portfolio, and network with faculty to advance your academic and professional career.
            </p>
          </div>
          <div className="item">
            <video src="./img/video.mp4" controls />
          </div>
        </div>
      </div>
      <div className="explore">
        <div className="container">
            <h1>Explore Research Disciplines</h1>
            <div className="items">
                {/* Item 1 */}
                <div className="item">
                    <FaDna className="icon" />
                    <div className="line"></div>
                    <span>Life Sciences & Genetics</span>
                </div>
                {/* Item 2 */}
                <div className="item">
                    <FaStethoscope className="icon" />
                    <div className="line"></div>
                    <span>Health & Medicine</span>
                </div>
                {/* Item 3 */}
                <div className="item">
                    <FaLaptopCode className="icon" />
                    <div className="line"></div>
                    <span>Computer Science & AI</span>
                </div>
                {/* Item 4 */}
                <div className="item">
                    <FaCogs className="icon" />
                    <div className="line"></div>
                    <span>Engineering & Robotics</span>
                </div>
                {/* Item 5 */}
                <div className="item">
                    <FaAtom className="icon" />
                    <div className="line"></div>
                    <span>Physical Sciences</span>
                </div>
                {/* Item 6 */}
                <div className="item">
                    <FaUsers className="icon" />
                    <div className="line"></div>
                    <span>Social Sciences</span>
                </div>
                {/* Item 7 */}
                <div className="item">
                    <FaBookOpen className="icon" />
                    <div className="line"></div>
                    <span>Humanities</span>
                </div>
                {/* Item 8 */}
                <div className="item">
                    <FaLeaf className="icon" />
                    <div className="line"></div>
                    <span>Environmental Science</span>
                </div>
                {/* Item 9 */}
                <div className="item">
                    <FaChartBar className="icon" />
                    <div className="line"></div>
                    <span>Data Science</span>
                </div>
                {/* Item 10 */}
                <div className="item">
                    <FaChartLine className="icon" />
                    <div className="line"></div>
                    <span>Economics & Business</span>
                </div>
            </div>
        </div>
    </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              ResearchConnect <i>for Faculty</i>
            </h1>
            <h1>
              A platform designed to build your <i>research team</i>
            </h1>
            <p>
              Access a suite of tools to find talented students, manage projects, and accelerate your research output.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              Discover bright, motivated students from diverse academic backgrounds.
            </div>

            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              Utilize our smart matching algorithm to find students whose skills align with your project needs.
            </div>

            <div className="title">
              <img src="./img/check.png" alt="Checkmark" />
              Collaborate seamlessly with integrated tools for communication and progress tracking.
            </div>
            <button>Explore Faculty Features</button>
          </div>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="A team of researchers collaborating around a table with laptops"
              />
            </div>
        </div>
    </div>
      {/* <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide> */}
    </div>
  );
}

export default Home;
