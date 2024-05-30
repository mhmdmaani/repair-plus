export const getDurationAndDistance = (directions: any) => {
  // from google directions api
  const legs = directions?.routes[0]?.legs;
  if (legs) {
    const distance = legs.reduce((acc: any, leg: any) => {
      return acc + leg.distance.value;
    }, 0);
    const duration = legs.reduce((acc: any, leg: any) => {
      return acc + leg.duration.value;
    }, 0);
    return {
      distance: ((distance / 1000) * 0.621371).toFixed(2) || 0,
      duration: parseInt((duration / 60).toFixed(0)),
      durationInWords:
        legs[0].duration.text
          .replace('hours', 'hrs')
          .replace('mins', 'mins')
          .replace('hour', 'hr') || 0,
      distanceInWords: `${((distance / 1000) * 0.621371).toFixed(2) || 0} mi`,
    };
  } else {
    return {
      distance: 0,
      duration: 0,
      durationInWords: '0 mins',
      distanceInWords: '0 miles',
    };
  }
};
