jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: unknown) => fn,
}));

// import axios from 'axios';
// import { throttledGetDataFromApi } from './index';
// import { throttle } from 'lodash';

// const responseData = {
//   data: 'this is data',
// };

// const mockedAxios = axios as jest.Mocked<typeof axios>;
// const spyCreate: jest.SpyInstance = jest.spyOn(axios, 'create');
// const spyGet = jest.spyOn(axios, 'get');

// mockedAxios.create.mockReturnValue({
//   get: jest.fn().mockResolvedValue(responseData),
// } as never);
// spyCreate.mockReturnValue({
//   get: jest.fn().mockResolvedValue(responseData),
// });
// spyGet.mockResolvedValue(responseData);
describe('throttledGetDataFromApi', () => {
  // const relativePath = 'relativePath';
  // const baseUrl = 'https://jsonplaceholder.typicode.com';
  test('should create instance with provided base url', async () => {
    // const spyCreate = jest.spyOn(axios, 'create');
    // (axios.get as jest.Mock).mockResolvedValue(responseData);
    // return throttledGetDataFromApi(relativePath).then((data) =>
    //   expect(data).toBe(responseData),
    // );
    // await throttledGetDataFromApi(relativePath);
    // // expect(spyCreate).toHaveBeenCalledWith(baseUrl);
    // expect(mockedAxios.create).toHaveBeenCalledWith({
    //   baseURL: baseUrl,
    // });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // jest.spyOn(axios, 'get');
    // throttledGetDataFromApi()
  });
});
