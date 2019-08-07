import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import SpriteAnimationView from './'


describe('test SpriteAnimationView Component', () => {
  const props = {
    frameWidth: 138,
    frameHeight: 160,
    frameDuration: 100,
    frameImgList: [
      'https://img.alicdn.com/tfs/TB1uzExbO_1gK0jSZFqXXcpaXXa-969-160.png'
    ]
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SpriteAnimationView {...props}/>);
  })
  // it('sprite animation view renders without crashing', () => {
  //   const div = document.createElement('div');
  //   ReactDOM.render(wrapper, div);
  //   ReactDOM.unmountComponentAtNode(div);
  // });

  it('should render the component to match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})


// test('test equal', () => {
//   expect(2 + 2).toBe(4)
// })

// test('test boolean', () => {
//   expect(1).toBeTruthy()
//   expect(0).toBeFalsy()
// })