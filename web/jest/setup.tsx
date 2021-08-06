import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'jest-enzyme';
import { mockConfig } from 'src/helpers/jest';

Enzyme.configure({ adapter: new Adapter() });

window.env = mockConfig;

// jest.mock('react-redux', () => {
//     return {
//         useSelector: jest.fn().mockImplementation(() => {
//             return {};
//         }),
//         useDispatch: jest.fn().mockImplementation(() => null),
//     };
// });

// jest.mock('custom-lib', () => {
//     return {};
// });
