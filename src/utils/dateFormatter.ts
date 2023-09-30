import moment from 'moment';

const currentTime = moment();
const FORMAT_TIME = (createdAt: moment.Moment) => {
    const duration = moment.duration(currentTime.diff(createdAt));
    let formattedTime = '';

    if (duration.asSeconds() < 60) {
        formattedTime = 'Just now';
    } else if (duration.asMinutes() < 60) {
        formattedTime = `${Math.floor(duration.asMinutes())} min ago`;
    } else if (duration.asHours() < 24) {
        formattedTime = `${Math.floor(duration.asHours())} hour ago`;
    } else if (duration.asDays() < 7) {
        formattedTime = `${Math.floor(duration.asDays())} days ago`;
    } else if (duration.asWeeks() < 4) {
        formattedTime = `${Math.floor(duration.asWeeks())} weeks ago`;
    } else if (duration.asMonths() < 12) {
        formattedTime = `${Math.floor(duration.asMonths())} months ago`;
    } else {
        formattedTime = `Created ${Math.floor(duration.asYears())} year ago`;
    }
    return formattedTime;

};
export default FORMAT_TIME