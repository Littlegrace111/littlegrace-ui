import React from 'react';
import ReactDOM from 'react-dom';
import SpriteAnimationView from './';

it('sprite animation view renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SpriteAnimationView />, div);
  ReactDOM.unmountComponentAtNode(div);
});