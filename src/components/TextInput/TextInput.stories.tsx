import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Componentes/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Texto del placeholder del input',
      defaultValue: 'Escribe aquí...',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Usuario: Story = {
  args: {
    text: 'Nombre de usuario',
  },
};

export const Correo: Story = {
  args: {
    text: 'Correo electrónico',
  },
};

export const Contraseña: Story = {
    args: {
      text: 'Contraseña',
    },
  };

  export const NuevaContraseña: Story = {
    args: {
      text: 'Nueva Contraseña',
    },
  };

  export const CambiarUsuario: Story = {
    args: {
      text: 'Cambiar Usuario',
    },
  };

  export const CambiarCorreoElectronico: Story = {
    args: {
      text: 'Cambiar Correo Electronico',
    },
  };

  export const CambiarContrasena: Story = {
    args: {
      text: 'Cambiar Contraseña',
    },
  };