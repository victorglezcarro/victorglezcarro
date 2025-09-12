import './Landing.css';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';

function Landing({ sectionId }: { sectionId: string }) {
  return (
    <section id={sectionId} className="landing-content">
      <div className="name-image">
        <img src="src/assets/profile.png" alt="profile img" className='profile-img' data-aos="fade-right" />
        <div className="info">
          <div className="name">
            <h1 data-aos="fade-down">Víctor</h1>
            <h1 data-aos="fade-left">González Carro</h1>
          </div>
          <div className="icons" data-aos="fade-up">
            <FiLinkedin></FiLinkedin>
            <FiGithub></FiGithub>
            <FiTwitter></FiTwitter>
            <FiInstagram></FiInstagram>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;