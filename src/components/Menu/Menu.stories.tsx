import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "@/components/Menu/Menu";
import React from "react";
import { AuthContext } from "@/providers/AuthProvider";
import type { RoleType } from "@/types/Roles";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      const role: RoleType = context.parameters.authRole ?? "datavisualizer";
      const name = role === "admin" ? "Admin Test" : role === "datamanager" ? "Manager Test" : "Visualizer Test";

      return (
        <AuthContext.Provider
          value={{
            user: { uid: "123" } as any,
            loading: false,
            idToken: "mock-token",
            role,
            name,
            email: "test@example.com",
            logout: async () => {
            },
          }}
        >
          <Story />
        </AuthContext.Provider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Menu>;

const children = (
  <div className="p-8">
    <h1 className="text-2xl font-bold">Contenido principal</h1>
    <p className="mt-2 text-muted-foreground">
      Aquí iría el contenido de la página a la derecha del menú lateral.
    </p>
  </div>
);

export const DataVisualizer: Story = {
  render: () => <Menu/>,
  parameters: {
    authRole: "datavisualizer",
  },
};

export const DataManager: Story = {
  render: () => <Menu/>,
  parameters: {
    authRole: "datamanager",
  },
};

export const Administrator: Story = {
  render: () => <Menu/>,
  parameters: {
    authRole: "admin",
  },
};