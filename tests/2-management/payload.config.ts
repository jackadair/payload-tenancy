import { buildConfig } from "payload/config";
import { tenancy } from "../../src/plugin";
import { firstRootUser, rootTenant } from "./data";

export default buildConfig({
  plugins: [tenancy({ isolationStrategy: "user" })],
  collections: [
    {
      slug: "users",
      auth: true,
      fields: [],
      admin: {
        useAsTitle: "email",
      },
    },
    {
      slug: "tenants",
      fields: [],
      admin: {
        useAsTitle: "slug",
      },
    },
  ],
  admin: {
    user: "users",
  },
  onInit: async (payload) => {
    await payload.create({
      collection: "users",
      data: { email: firstRootUser.email, password: firstRootUser.password },
    });
    await payload.create({
      collection: "tenants",
      data: {
        slug: rootTenant.slug,
        domains: rootTenant.domains.map((domain) => ({ domain })),
      },
    });
  },
});