import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default function ButtonScrollToTop() {

  return (        
    <button className="scroll-top scroll-to-target" data-target="html">
      <FontAwesomeIcon icon={faAngleUp} />
    </button>
  );
}