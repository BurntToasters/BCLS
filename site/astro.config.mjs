// SPDX-License-Identifier: MPL-2.0
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [
    starlight({
      title: "BCLS",
      description: "BurntToasters Changelog Standard",
      customCss: ["./src/styles/custom.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/BurntToasters/bcls"
        }
      ],
      sidebar: [
        {
          label: "Start Here",
          items: [
            { label: "Overview", slug: "" },
            { label: "Release Builder", link: "/builder/" },
            { label: "Standard", slug: "generated/standard" },
            { label: "Agent Checklist", slug: "generated/agents" },
            { label: "Changelog", slug: "generated/changelog" }
          ]
        },
        {
          label: "Templates",
          items: [{ autogenerate: { directory: "generated/templates" } }]
        },
        {
          label: "Examples",
          items: [{ autogenerate: { directory: "generated/examples" } }]
        }
      ]
    }),
    react()
  ]
});
