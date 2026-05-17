import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import InvestigationForm from "./InvestigationForm";

describe("InvestigationForm", () => {
  it("keeps submit disabled when the error log is empty", () => {
    render(
      <InvestigationForm onSubmit={vi.fn()} loading={false} error={null} />,
    );

    expect(
      screen.getByRole("button", { name: /investigate failure/i }),
    ).toBeDisabled();
  });

  it("fills the form with a Playwright sample error", async () => {
    const user = userEvent.setup();

    render(
      <InvestigationForm onSubmit={vi.fn()} loading={false} error={null} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /use sample playwright error/i,
      }),
    );

    const errorLogInput = screen.getByLabelText(
      /error \/ stack trace/i,
    ) as HTMLTextAreaElement;

    expect(errorLogInput.value).toContain("Timeout 5000ms exceeded");

    const contextInput = screen.getByLabelText(
      /context/i,
    ) as HTMLTextAreaElement;

    expect(contextInput.value).toContain(
      "The submit button is rendered only after",
    );

    expect(screen.getByLabelText(/framework/i)).toHaveValue("playwright");
  });

  it("submits a valid investigation payload", async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <InvestigationForm onSubmit={onSubmit} loading={false} error={null} />,
    );

    await user.type(
      screen.getByLabelText(/error \/ stack trace/i),
      "Expected button to be visible",
    );

    await user.type(
      screen.getByLabelText(/context/i),
      "Playwright test fails in CI",
    );

    await user.selectOptions(screen.getByLabelText(/framework/i), "playwright");

    await user.click(
      screen.getByRole("button", {
        name: /investigate failure/i,
      }),
    );

    expect(onSubmit).toHaveBeenCalledWith({
      errorLog: "Expected button to be visible",
      context: "Playwright test fails in CI",
      framework: "playwright",
    });
  });
});
