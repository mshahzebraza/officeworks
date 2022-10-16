import sum from './sum'
// const sum = require('./sum');
// import { render, screen } from '@testing-library/react';
// import Home from '../pages/index';
// import '@testing-library/jest-dom';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});


// __tests__/index.test.js


// describe('Home', () => {
//   it('renders a heading', () => {
//     render(<Home />)

//     const heading = screen.getByRole('heading', {
//       name: /welcome to next\.js!/i,
//     })

//     expect(heading).toBeInTheDocument()
//   })
// });