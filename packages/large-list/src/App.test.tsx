import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from './App';

describe('shallowRenderer', () => {
    const renderer = new ShallowRenderer();
    it('should render correctly', () => {
        renderer.render(<App/>);
        const result = renderer.getRenderOutput();
        expect(result.type).toBe('div');
    })
})