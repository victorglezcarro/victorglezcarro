import { useRef } from 'react';
import VariableProximity from '../../TextAnimations/VariableProximity/VariableProximity';
import './Studies.css';
import StudyCard from '../../components/StudyCard/StudyCard';

interface StudyData { title: string; institute: string; ubicacion: string; imgUrl: string; link: string; }

const studies: StudyData[] = [
    {
        title: "Ingeniería informática",
        institute: "Univertat Oberta de Catalunya (UOC)",
        ubicacion: 'Online',
        imgUrl: "src/assets/UOC.png",
        link: "https://www.uoc.edu/es/estudios/grados/grado-ingenieria-informatica",
    },
    {
        title: "Master en Ciberseguridad",
        institute: "Universidad CEU San Pablo",
        ubicacion: 'Sevilla, España',
        imgUrl: "src/assets/CEU.png",
        link: "https://www.ceuandalucia.es/master-reglado-fp/curso-de-especializacion-en-ciberseguridad-entornos-las-tecnologias-la-informacion/",
    },
    {
        title: "Desarrollo de Aplicaciones Multiplataforma",
        institute: "Salesianos de San Pedro",
        ubicacion: 'Sevilla, España',
        imgUrl: "src/assets/Salesianos.png",
        link: "https://triana.salesianos.edu/colegio/cfgs-desarrollo-de-aplicaciones-multiplataforma/",
    },
];

function Studies({ sectionId }: { sectionId: string }) {
    const containerRef = useRef(null);

    return (
        <section id={sectionId} className="studies-content" ref={containerRef}>
            <VariableProximity
                label={'Estudios'}
                className={'variable-proximity-demo'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='gaussian'
                style={{ fontSize: '45px' }}
            />
            <div className="studies-grid">
                {studies.map((study, index) => (
                    <StudyCard key={index} index={index} study={study} />
                ))}
            </div>
        </section>
    );
}

export default Studies;