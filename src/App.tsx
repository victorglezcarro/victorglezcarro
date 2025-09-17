import { useEffect } from 'react';
import './App.css'
import NavBar from './components/NavBar/NavBar';
import Landing from './pages/Landing/Landing';
import 'aos/dist/aos.css';
import Aos from 'aos';
import Particles from './Backgrounds/Particles/Particles';
import Projects from './pages/Projects/Projects';
import Studies from './pages/Studies/Studies';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

function App() {

  useEffect(() => {
    Aos.init({
      duration: 1500,
      once: true,
    });
  }, []);

  return (
    <>
      <div className='particles'>
        <Particles
          particleColors={['#daa520', '#ffffff']}
          particleCount={100}
          particleBaseSize={70}
          particleSpread={10}
          speed={0.10}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={true}
        />
      </div>
      <NavBar />
      <Landing sectionId="inicio" />
      <About sectionId="sobre-mí" />
      <Projects sectionId="proyectos" />
      <Studies sectionId="estudios" />
      <Contact sectionId='contacto'/>
    </>
  )

}

export default App;
