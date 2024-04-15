import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectInput from "./Select";

describe("SelectInput Component", () => {
  const mockOnChange = jest.fn();
  const options = ["Option 1", "Option 2", "Option 3"];
  const placeholder = "Select an option";
  const name = "test-select";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with placeholder and options", () => {
    const wrapper = render(
      <SelectInput
        options={options}
        placeholder={placeholder}
        name={name}
        onChange={mockOnChange}
        value=""
      />,
    );

    expect(wrapper.getByText(placeholder)).toBeInTheDocument();
  });

  it("displays the correct number of options when opened", async () => {
    const wrapper = render(
      <SelectInput
        options={options}
        placeholder={placeholder}
        name={name}
        onChange={mockOnChange}
        value=""
      />,
    );
    const user = userEvent.setup();

    await user.click(wrapper.getByRole("combobox"));

    await waitFor(() =>
      options.forEach((option) => {
        expect(wrapper.getByText(option)).toBeInTheDocument();
      }),
    );
  });

  it("calls onChange with correct values when an option is selected", async () => {
    const wrapper = render(
      <SelectInput
        options={options}
        placeholder={placeholder}
        name={name}
        onChange={mockOnChange}
        value=""
      />,
    );
    const user = userEvent.setup();

    await user.click(wrapper.getByRole("combobox"));

    await waitFor(() => wrapper.getByText("Option 1"));

    await user.click(wrapper.getByText("Option 1"));

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(name, "Option 1");
    });
  });

  it("renders with an initial value", () => {
    const wrapper = render(
      <SelectInput
        options={options}
        placeholder={placeholder}
        name={name}
        onChange={mockOnChange}
        value="Option 1"
      />,
    );

    expect(wrapper.getByText("Option 1")).toBeInTheDocument();
    expect(wrapper.queryByText(placeholder)).not.toBeInTheDocument();
  });
});
