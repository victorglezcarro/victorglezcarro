import { FiMapPin } from "react-icons/fi";
import useAosInView from "../../hooks/useAosInView";
import "./StudyCard.css";

interface StudyData { title: string; institute: string; ubicacion: string; imgUrl: string; link: string; }

function StudyCard({ index, study }: { index: number; study: StudyData }) {
    const cardRef = useAosInView<HTMLDivElement>({ threshold: 0.15, once: true });
    const evenOdd = index % 2 === 0 ? 'even' : 'odd';

    return (
        <div className={`study-card ${evenOdd}`} ref={cardRef} data-aos={evenOdd === 'even' ? 'fade-right' : 'fade-left'} data-aos-delay={(index + 1) * 250} >
            <div className="img-container">
                <img src={study.imgUrl} alt={study.institute} />
            </div>
            <div className="spacer"></div>
            <div className="info">
                <h2>{study.title}</h2>
                <a href={study.link} target="_blank" rel="noopener noreferrer">{study.institute}</a>
                <div className="location"><FiMapPin /><span>{study.ubicacion}</span></div>
            </div>
        </div>
    );
}

export default StudyCard;