import React from 'react'
import Banner from './'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom';

// test('Banner changes when animating', () => {
//     const imgList = [
//         'https://img.alicdn.com/tfs/TB1XpR6bVT7gK0jSZFpXXaTkpXa-1280-720.png',
//         'https://img.alicdn.com/tfs/TB1f3x.b7L0gK0jSZFAXXcA9pXa-2560-1440.png',
//         'https://img.alicdn.com/tfs/TB1ZeSibW61gK0jSZFlXXXDKFXa-4096-2304.jpg',
//     ];

//     const component = renderer.create(
//         <Banner
//             width={800}
//             height={500}
//             imgList={imgList}
//         />
//     );

//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// })

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Banner />, div);
    ReactDOM.unmountComponentAtNode(div);
});