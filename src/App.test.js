import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import App from "./App";
// import ContactForm from "./components/ContactForm";

test("First Name should have arbitrary length", async () => {
   await act(async () => {
      render(<App />);
   });

   const input1 = screen.getByPlaceholderText("Edd", { exact: false });
   const input2 = screen.getByPlaceholderText("Burke", { exact: false });
   const input3 = screen.getByPlaceholderText("bluebill1049@hotmail.com", {
      exact: false,
   });
   const input4 = screen.getByLabelText("Message", { exact: false });
   let submit = screen.getByRole("button");

   userEvent.type(input1, "tests");

   expect(screen.getByPlaceholderText("Edd")).toHaveValue("tests");

   userEvent.type(input2, "tests");

   userEvent.type(input3, "test@email.com");

   await act(async () => {
      userEvent.click(submit);
   });

   expect(screen.queryByText("maxLength", { exact: false })).toBeFalsy();
   expect(
      screen.getByText('"email": "test@email.com"', { exact: false })
   ).toBeTruthy();
   // a first name with length >3 should submit normally now
});

test("Email not in the correct format should not submit", async () => {
   await act(async () => {
      render(<App />);
   });

   const input1 = screen.getByPlaceholderText("Edd", { exact: false });
   const input2 = screen.getByPlaceholderText("Burke", { exact: false });
   const input3 = screen.getByPlaceholderText("bluebill1049@hotmail.com", {
      exact: false,
   });
   const input4 = screen.getByLabelText("Message", { exact: false });
   let submit = screen.getByRole("button");

   userEvent.type(input1, "ts");

   expect(screen.getByPlaceholderText("Edd")).toHaveValue("ts");

   userEvent.type(input2, "tests");

   userEvent.type(input3, "test");

   await act(async () => {
      userEvent.click(submit);
   });
   // screen.debug();
   expect(screen.queryByText("tests", { exact: false })).toBeFalsy();
   // the form shouldn't submit when email is not in the correct format.
   expect(screen.queryByText("pattern", { exact: false })).toBeTruthy();
   // there should be a pattern warning on screen.
});

test("sucesses on the default placeholder", async () => {
   await act(async () => {
      render(<App />);
   });

   const input1 = screen.getByPlaceholderText("Edd", { exact: false });
   const input2 = screen.getByPlaceholderText("Burke", { exact: false });
   const input3 = screen.getByPlaceholderText("bluebill1049@hotmail.com", {
      exact: false,
   });
   const input4 = screen.getByLabelText("Message", { exact: false });
   let submit = screen.getByRole("button");

   userEvent.type(input1, "Edd");

   expect(screen.getByPlaceholderText("Edd")).toHaveValue("Edd");

   userEvent.type(input2, "Burke");
   expect(screen.getByPlaceholderText("Burke")).toHaveValue("Burke");

   userEvent.type(input3, "bluebill1049@hotmail.com");
   expect(screen.getByPlaceholderText("bluebill1049@hotmail.com")).toHaveValue(
      "bluebill1049@hotmail.com"
   );

   await act(async () => {
      userEvent.click(submit);
   });

   expect(
      screen.getByText('"firstName": "Edd"', { exact: false })
   ).toBeTruthy();
   expect(
      screen.getByText('"lastName": "Burke"', { exact: false })
   ).toBeTruthy();
   expect(
      screen.getByText('"email": "bluebill1049@hotmail.com"', { exact: false })
   ).toBeTruthy();
});
