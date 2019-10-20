import {{objectname}} from ../{{objectname}}
import mockAxios from "axios";

// setup
mockAxios.get.mockImplementationOnce(() =>
  Promise.resolve({
    data: { results: ["good"] }
  })
);

describe('{{objectname}}', () => {
  
  it('populates a list of {{objectname}} via REST call', () => {
   
    addressValidation(emptyDefaults)
      .then(value => {
        fail('bad');
      })
      .catch(e => {
        expect(e.results).toEqual(
          'good'
        );
      });
  
  });
  
});