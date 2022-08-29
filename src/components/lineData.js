const energySources = [{ value: 'value' }];

const countriesInfo = [
  {
    day: 'USA',
    value: 59.8,
  },
  {
    day: 'China',
    value: 74.2,
  },
  {
    day: 'Russia',
    value: 40,
  },
  {
    day: 'Japan',
    value: 22.6,
    // oil: 241.5,
    // gas: 64.9,
    // coal: 120.8,
    // nuclear: 64.8,
  },
  {
    day: 'India',
    value: 19,
    // oil: 119.3,
    // gas: 28.9,
    // coal: 204.8,
    // nuclear: 3.8,
  },
  {
    country: 'Germany',
    value: 6.1,
    // oil: 123.6,
    // gas: 77.3,
    // coal: 85.7,
    // nuclear: 37.8,
  },
];

export default {
  getEnergySources() {
    return energySources;
  },
  getCountriesInfo() {
    return countriesInfo;
  },
};
