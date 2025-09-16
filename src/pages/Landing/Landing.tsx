import './Landing.css';
import { FiExternalLink, FiGithub, FiLinkedin } from 'react-icons/fi';

function Landing({ sectionId }: { sectionId: string }) {

  const openLink = (url: string) => {
    window.open(url, "_blank");
  }

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
            <div className="icon-button" onClick={() => openLink("https://www.linkedin.com/in/victorglezcarro/")}><span>LinkedIn</span><FiLinkedin /></div>
            <div className="icon-button" onClick={() => openLink("https://github.com/victorglezcarro")}><span>GitHub</span><FiGithub /></div>
            <div className="icon-button" onClick={() => openLink("src/files/CV_Victor_Gonzalez_Carro.pdf")}><span>CV Vitae</span><FiExternalLink /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;