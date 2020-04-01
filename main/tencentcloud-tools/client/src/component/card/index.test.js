import React from 'react';
import { shallow, mount } from 'enzyme';
import Card from '.';

describe("Card", () => {
    it("should render correctly", () => {
        const wrap = mount(<Card />, { attachTo: document.body });
        expect(wrap.children().type()).toBe("div");
    })
})