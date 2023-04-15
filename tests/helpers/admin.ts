import { Helper, Tenant, User, wait } from "./common";

export const createAdminHelper = (): Helper => ({
  login: async (credentials: User) => {
    await page.goto(`${payloadUrl}/admin`);
    await page.waitForSelector("#field-email");
    await page.type("#field-email", credentials.email);
    await page.type("#field-password", credentials.password);
    await wait(500);
    await page.click("[type=submit]");
    await page.waitForNetworkIdle();
  },
  logout: async () => {
    await page.goto(`${payloadUrl}/admin/logout`);
    await page.waitForNetworkIdle();
  },
  createUser: async (user: User) => {
    await page.goto(`${payloadUrl}/admin/collections/users/create`);
    await page.waitForNetworkIdle();
    await page.type("#field-email", user.email);
    await page.type("#field-password", user.password);
    await page.type("#field-confirm-password", user.password);
    await page.click("#field-tenant .react-select");
    await page.waitForNetworkIdle();
    await (
      await (await page.$("#field-tenant .rs__menu")).$("text/" + user.tenant)
    ).click();
    await wait(500);
    await page.click("#action-save");
    await page.waitForNetworkIdle();
  },
  createTenant: async (tenant: Tenant) => {
    await page.goto(`${payloadUrl}/admin/collections/tenants/create`);
    await page.waitForNetworkIdle();
    await page.type("#field-slug", tenant.slug);
    for (let i = 0; i < tenant.domains.length; i++) {
      await page.click("#field-domains .array-field__add-button-wrap button");
      await page.waitForSelector(`#field-domains__${i}__domain`);
      await page.type(`#field-domains__${i}__domain`, tenant.domains[i]);
    }
    if (tenant.parent) {
      await page.click("#field-parent .react-select");
      await page.waitForNetworkIdle();
      await (
        await (
          await page.$("#field-parent .rs__menu")
        ).$("text/" + tenant.parent)
      ).click();
    }
    await wait(500);
    await page.click("#action-save");
    await page.waitForNetworkIdle();
  },
  deleteUser: async (user: User) => {
    await page.goto(`${payloadUrl}/admin/collections/users`);
    await page.waitForNetworkIdle();
    await page.type(".search-filter__input", user.email);
    await page.waitForNetworkIdle();
    await page.click(".row-1 .cell-email a");
    await page.waitForNetworkIdle();
    await page.click("#action-delete");
    await page.waitForNetworkIdle();
    await page.click("#confirm-delete");
    await page.waitForNetworkIdle();
  },
  deleteTenant: async (tenant: Tenant) => {
    await page.goto(`${payloadUrl}/admin/collections/tenants`);
    await page.waitForNetworkIdle();
    await page.type(".search-filter__input", tenant.slug);
    await page.waitForNetworkIdle();
    await page.click(".row-1 .cell-slug a");
    await page.waitForNetworkIdle();
    await page.click("#action-delete");
    await page.waitForNetworkIdle();
    await page.click("#confirm-delete");
    await page.waitForNetworkIdle();
  },
});