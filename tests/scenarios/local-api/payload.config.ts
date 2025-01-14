import { buildConfig } from "payload/config";
import { tenancy } from "../../../src/plugin";
import { baseConfig } from "../../baseConfig";

export default buildConfig({
  ...baseConfig,
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
    {
      slug: "posts",
      fields: [
        {
          name: "title",
          type: "text",
        },
      ],
    },
  ],
  admin: {
    ...baseConfig.admin,
    user: "users",
  },
});
