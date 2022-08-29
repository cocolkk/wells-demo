import moment from 'moment';
export function dateFomat(value) {
  return value ? moment(value).format('YYYY/M/DD') : '';
}
