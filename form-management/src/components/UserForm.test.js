import { render, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/react/cleanup-after-each";
import UserForm from "./UserForm";

describe("UserForm", () => {
  it("mounts to screen without crashing", () => {
    render(<UserForm />);
  });
  it("it shows h3 Sign Up Text", () => {
    const text = render(<UserForm />);
    text.getByText(/Sign Up/i);
  });
  it("submit buttonhas been clicked", () => {
    const { getByText } = render(
      <UserForm onClick={() => console.log("submit button clicked")} />
    );
    const submitButton = getByText(/submit/i);
    fireEvent.click(submitButton);
  });
});
