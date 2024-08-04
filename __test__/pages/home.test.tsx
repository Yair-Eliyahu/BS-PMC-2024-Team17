import React from "react";
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import Home from "@/page"; // Adjust the import path to match the actual location of your Home component

test('home test', () => {
    render(<Home />);
    const myText = screen.getByText("hi");
    expect(myText).toHaveTextContent("hi");
})