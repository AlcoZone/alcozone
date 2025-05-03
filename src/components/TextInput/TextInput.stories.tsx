import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Componentes/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Texto que se muestra como ayuda en el input',
      defaultValue: 'Escribe aquí...',
    },
    type: {
      control: 'text',
      description: 'Tipo de input (text/password/email)',
      defaultValue: 'text',
    },
    value: {
      control: 'text',
      description: 'Valor del input',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Muestra un botón para alternar la visibilidad de la contraseña',
      defaultValue: false,
    },
    onChange: {
      action: 'changed',
      description: 'Función que se ejecuta al cambiar el valor del input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Usuario: Story = {
  args: {
    placeholder: 'Nombre de usuario',
    value: '',
    type: 'text',
  },
};

export const Correo: Story = {
  args: {
    placeholder: 'Correo electrónico',
    value: '',
    type: 'email',
  },
};

export const Contraseña: Story = {
  args: {
    placeholder: 'Contraseña',
    value: '',
    type: 'password',
    showPasswordToggle: true,
  },
};

export const NuevaContraseña: Story = {
  args: {
    placeholder: 'Nueva Contraseña',
    value: '',
    type: 'password',
    showPasswordToggle: true,
  },
};

export const CambiarUsuario: Story = {
  args: {
    placeholder: 'Cambiar Usuario',
    value: '',
    type: 'text',
  },
};

export const CambiarCorreoElectronico: Story = {
  args: {
    placeholder: 'Cambiar Correo Electrónico',
    value: '',
    type: 'email',
  },
};

export const CambiarContrasena: Story = {
  args: {
    placeholder: 'Cambiar Contraseña',
    value: '',
    type: 'password',
    showPasswordToggle: true,
  },
};

export const Rol: Story = {
  args: {
    placeholder: 'Rol',
    value: '',
    type: 'text',
  },
};
