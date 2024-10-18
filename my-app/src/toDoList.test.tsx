import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";

describe("ToDoList", () => {
  test("creates and reads a new note", () => {
    render(<ToDoList />);

    const itemsText = screen.getByText("Items bought: 0");
    expect(itemsText).toBeInTheDocument();
    expect(screen.getByText("Apples")).toBeInTheDocument();
    expect(screen.getByText("Bananas")).toBeInTheDocument();
    const apple = screen.getByTestId("checkbox-Apples");
    fireEvent.click(apple);
    const bannana = screen.getByTestId("checkbox-Bananas");
    fireEvent.click(bannana);
    expect(screen.getByText("Items bought: 2")).toBeInTheDocument();
  });
});
