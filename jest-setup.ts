import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// eslint-disable-next-line import/no-relative-packages
import './web/public/config/env.testing';

Enzyme.configure({ adapter: new Adapter() });
