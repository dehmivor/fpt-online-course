import PropTypes  from 'prop-types';

import Review from "./Review";
import Avatar from './Avatar';

function FeedbackCard({ review, feedback, profile, className}) {
    return (
        <div className={`bg-white flex flex-col justify-center items-center shadow-xl min-h-full rounded-3xl gap-y-7 ${className}`}>
            <Review stars={review} />
            <q className='text-center text-xl'> {feedback} </q>
            <Avatar img={profile.img} name={profile.name} direction='horizontal' />
        </div>
    )
    
}

FeedbackCard.prototype = {
    id: PropTypes.number.isRequired,
    review: PropTypes.number.isRequired,
    feedback: PropTypes.string.isRequired,
    className: PropTypes.string,
    profile: PropTypes.shape({
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
}

export default FeedbackCard;