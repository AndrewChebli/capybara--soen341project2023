import SignIn from '../components/SignIn';
import ReactDOM from 'react-dom';


describe('SignIn', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignIn />, div);
  });
});
