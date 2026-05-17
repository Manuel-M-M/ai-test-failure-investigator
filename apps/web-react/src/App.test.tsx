import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "./App";
import { investigateFailure } from "./services/api";

vi.mock("./services/api", () => ({
  investigateFailure: vi.fn(),
}));

const mockedInvestigateFailure = vi.mocked(investigateFailure);

const mockResult = {
  rootCause:
    "The submit button is rendered after async data loading, but the test waits for it too early.",
  debuggingSteps: [
    "Check whether the API request completes before the button is expected.",
    "Wait for the relevant response or UI state before asserting.",
  ],
  suggestedFix:
    "Wait for the API response or use Playwright locators with proper expectations.",
  improvedTestSnippet:
    "await page.waitForResponse('/api/user');\nawait expect(page.locator('.submit-button')).toBeVisible();",
  confidence: "high" as const,
  caveats: ["Assumes the button depends on API-loaded user data."],
};

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    mockedInvestigateFailure.mockReset();

    vi.stubGlobal("crypto", {
      randomUUID: () => "test-investigation-id",
    });
  });

  it("stores an investigation in history and rehydrates it without a new API call", async () => {
    const user = userEvent.setup();

    mockedInvestigateFailure.mockResolvedValue(mockResult);

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: /use sample playwright error/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /investigate failure/i,
      }),
    );

    expect(mockedInvestigateFailure).toHaveBeenCalledTimes(1);

    expect(await screen.findByText(/analysis complete/i)).toBeInTheDocument();

    expect(
      screen.getByText(
        /the submit button is rendered after async data loading/i,
      ),
    ).toBeInTheDocument();

    const historyItem = await screen.findByRole("button", {
      name: /playwright/i,
    });

    await user.click(historyItem);

    expect(mockedInvestigateFailure).toHaveBeenCalledTimes(1);

    const errorLogInput = screen.getByLabelText(
      /error \/ stack trace/i,
    ) as HTMLTextAreaElement;

    expect(errorLogInput.value).toContain("Timeout 5000ms exceeded");

    expect(
      screen.getByText(
        /the submit button is rendered after async data loading/i,
      ),
    ).toBeInTheDocument();
  });
});
