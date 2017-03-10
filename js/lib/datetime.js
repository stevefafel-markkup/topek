import moment from "moment"

let REFERENCE = moment(); // fixed just for testing, use moment();
let TODAY = REFERENCE.clone().startOf('day');
let YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
let A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');

moment.isToday = function (momentDate) {
  return momentDate.isSame(TODAY, 'd');
}

moment.isYesterday = function (momentDate) {
  return momentDate.isSame(YESTERDAY, 'd');
}

export function isWithinAWeek(momentDate) {
  return momentDate.isAfter(A_WEEK_OLD);
}

export function isTwoWeeksOrMore(momentDate) {
  return !isWithinAWeek(momentDate);
}

export default moment;