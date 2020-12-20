import {{objectname}} from "../{{objectname}}"
import mockAxios from "axios";

// setup
mockAxios.get.mockImplementationOnce(() =>
  Promise.resolve({
    data: { results: ["good"] }
  })
);


const valueValidation = (defaults) => {
	return "good";
}

describe('When we instantiate {{objectname}}', () => {
  
  it('populates a list of {{objectname}} values via mocked REST call', () => {
   
    valueValidation(emptyDefaults)
      .then(value => {
        fail('good:' + value);
      })
      .catch(e => {
        expect(e.results).toEqual(
          'bad'
        );
      });
  
  });
  
});