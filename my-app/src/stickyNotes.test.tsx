import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("StickyNotes", () => {
  test("creates and reads a new note", () => {
    render(<StickyNotes />);

    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentTextarea = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    fireEvent.change(titleInput, { target: { value: "Test Note" } });
    fireEvent.change(contentTextarea, { target: { value: "Test Content" } });
    fireEvent.click(createButton);

    expect(screen.getByText("Test Note")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("updates a note", () => {
    render(<StickyNotes />);

    // Create a note first
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentTextarea = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    fireEvent.change(titleInput, { target: { value: "Update Test" } });
    fireEvent.change(contentTextarea, { target: { value: "Original Content" } });
    fireEvent.click(createButton);

    // Find the created note and update its content
    const noteContent = screen.getByText("Original Content");
    fireEvent.focus(noteContent);
    fireEvent.input(noteContent, { target: { innerHTML: "Updated Content" } });
    fireEvent.blur(noteContent);

    expect(noteContent.innerHTML).toBe("Updated Content");
  });

  test("deletes a note", () => {
    render(<StickyNotes />);

    // Create two notes
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentTextarea = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    fireEvent.change(titleInput, { target: { value: "Test Note 1" } });
    fireEvent.change(contentTextarea, { target: { value: "Content 1" } });
    fireEvent.click(createButton);

    fireEvent.change(titleInput, { target: { value: "Test Note 2" } });
    fireEvent.change(contentTextarea, { target: { value: "Content 2" } });
    fireEvent.click(createButton);


    // Delete the notes
    const deleteButton = screen.getByTestId("delete-buttonTest Note 1");
    fireEvent.click(deleteButton);
    const deleteButton2 = screen.getByTestId("delete-buttonTest Note 2");
    fireEvent.click(deleteButton2);
    expect(screen.queryByTestId("Test Note 1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("Test Note 2")).not.toBeInTheDocument();
  });
});
