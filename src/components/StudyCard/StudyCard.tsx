import { FiMapPin } from "react-icons/fi";
import "./StudyCard.css";

interface StudyData { title: string; institute: string; ubicacion: string; imgUrl: string; link: string; }

function StudyCard({ index, study }: { index: number; study: StudyData }) {
    const evenOdd = index % 2 === 0 ? 'even' : 'odd';

    return (
        <div className={`study-card ${evenOdd}`} >
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