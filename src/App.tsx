import { useEffect } from 'react';
import './App.css'
import NavBar from './components/NavBar/NavBar';
import Landing from './pages/Landing/Landing';
import 'aos/dist/aos.css';
import Aos from 'aos';
import Particles from './Backgrounds/Particles/Particles';

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
      <div className="ss" id="proyectos"></div>
    </>
  )

}

export default App;
