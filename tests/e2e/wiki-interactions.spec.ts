import { expect, test } from "@playwright/test";

function isMobile(width: number | null) {
  return (width ?? 0) < 768;
}

function sectionByHeading(page: import("@playwright/test").Page, heading: string) {
  return page.locator("section").filter({
    has: page.getByRole("heading", { name: heading }),
  });
}

test("Brainrot explorer filters, sorts, resets, and shows zero state", async ({ page }, testInfo) => {
  test.skip(isMobile(testInfo.project.use.viewport?.width ?? null), "desktop table behavior");
  await page.goto("/brainrots");

  await page.getByLabel("Search").fill("Noobini Pizzanini");
  await expect(page.getByText("1 matching records")).toBeVisible();

  await page.getByLabel("Rarity").selectOption("Common");
  await page.getByLabel("Availability").selectOption("Obtainable");
  await page.getByLabel("Sort").selectOption("income-desc");
  await expect(page.locator("tbody tr").first()).toContainText("Noobini Pizzanini");

  await page.getByLabel("Search").fill("not a real brainrot");
  await expect(page.getByText("No records match these controls.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.getByText("69 matching records")).toBeVisible();

  await page.getByLabel("Sort").selectOption("income-desc");
  await expect(page.locator("tbody tr").first()).toContainText("Spaghetti Tualetti");
});

test("Trait explorer filters, sorts, resets, and renders mobile cards", async ({ page }, testInfo) => {
  await page.goto("/traits");
  const explorer = sectionByHeading(page, "Searchable Trait Explorer");

  await explorer.getByLabel("Search").fill("Strawberry");
  await expect(explorer.getByText("1 matching records")).toBeVisible();
  await explorer.getByLabel("Category").selectOption("OG");
  await explorer.getByLabel("Sort").selectOption("multiplier-desc");
  await expect(explorer.getByRole("link", { name: /Strawberry/ })).toBeVisible();

  await explorer.getByRole("button", { name: "Reset" }).click();
  await expect(explorer.getByText("24 matching records")).toBeVisible();

  if (isMobile(testInfo.project.use.viewport?.width ?? null)) {
    await expect(explorer.locator("table")).toBeHidden();
    await expect(explorer.getByRole("link", { name: /Strawberry/ })).toBeVisible();
  } else {
    await expect(explorer.locator("table")).toBeVisible();
  }

  await explorer.getByLabel("Search").fill("not a real trait");
  await expect(explorer.getByText("No Traits match these filters.")).toBeVisible();
});

test("Mutation explorer searches, sorts, resets, and renders mobile cards", async ({ page }, testInfo) => {
  await page.goto("/mutations");
  const explorer = sectionByHeading(page, "Mutation Explorer");
  const mobile = isMobile(testInfo.project.use.viewport?.width ?? null);
  const mutationRow = (name: string) => explorer.locator("tbody tr").filter({ hasText: name }).first();
  const mutationCard = (name: string) => explorer.locator(".rounded-lg").filter({ hasText: name }).last();

  await explorer.getByLabel("Search").fill("Rainbow");
  await expect(explorer.getByText("1 matching records")).toBeVisible();
  await explorer.getByLabel("Sort").selectOption("multiplier-desc");
  await expect(mobile ? mutationCard("Rainbow") : mutationRow("Rainbow")).toBeVisible();

  await explorer.getByRole("button", { name: "Reset" }).click();
  await expect(explorer.getByText("14 matching records")).toBeVisible();

  await explorer.getByLabel("Sort").selectOption("spawn-asc");
  await expect(mobile ? mutationCard("Rainbow") : mutationRow("Rainbow")).toBeVisible();

  if (mobile) {
    await expect(explorer.locator("table")).toBeHidden();
    await expect(mutationCard("Phantom")).toBeVisible();
  } else {
    await expect(explorer.locator("table")).toBeVisible();
  }

  await explorer.getByLabel("Search").fill("not a real mutation");
  await expect(explorer.getByText("No Mutations match these filters.")).toBeVisible();
});

test("Header dropdowns and mobile menu work", async ({ page }, testInfo) => {
  await page.goto("/");

  if (isMobile(testInfo.project.use.viewport?.width ?? null)) {
    await page.getByRole("button", { name: "Open menu" }).click();
    const mobileNav = page.getByLabel("Mobile navigation");
    await expect(mobileNav.getByRole("button", { name: "Database" })).toBeVisible();
    await mobileNav.getByRole("button", { name: "Database" }).click();
    await mobileNav.getByRole("link", { name: "Traits" }).click();
    await expect(page).toHaveURL(/\/traits$/);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  } else {
    await page.getByRole("button", { name: "Database" }).hover();
    await expect(page.getByRole("menuitem", { name: "Mutations" })).toBeVisible();
  }
});

test("FAQ accordion opens and closes", async ({ page }) => {
  await page.goto("/faq");
  const question = page.getByRole("button", { name: "What is Steal a Brainrot?" });
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Steal a Brainrot is a Roblox tycoon")).toBeVisible();
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "false");
});

test("Key routes fit responsive viewports and titles do not repeat site name", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "single responsive sweep");

  const routes = [
    "/",
    "/brainrots",
    "/traits",
    "/mutations",
    "/index",
    "/best-brainrots",
    "/admin-abuse",
    "/taco-tuesday",
    "/faq",
    "/brainrots/noobini-pizzanini",
    "/brainrots/spaghetti-tualetti",
    "/traits/strawberry",
    "/traits/colon-three",
  ];

  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${route} at ${width}px should not overflow horizontally`).toBeLessThanOrEqual(1);
    }
  }

  for (const route of ["/", "/brainrots/noobini-pizzanini", "/traits/strawberry", "/mutations", "/best-brainrots"]) {
    await page.goto(route);
    const title = await page.title();
    expect(title.match(/Steal a Brainrot Guide/g)?.length ?? 0, `${route} title should not repeat site name`).toBeLessThanOrEqual(1);
  }
});
