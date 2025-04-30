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
      description: 'Tipo de input (text/password)',
      defaultValue: 'text',
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
  },
};

export const Correo: Story = {
  args: {
    placeholder: 'Correo electrónico',
    value: '',
  },
};

export const Contraseña: Story = {
  args: {
    placeholder: 'Contraseña',
    value: '',
    type: 'password',
  },
};

export const NuevaContraseña: Story = {
  args: {
    placeholder: 'Nueva Contraseña',
    value: '',
    type: 'password'
  },
};

export const CambiarUsuario: Story = {
  args: {
    placeholder: 'Cambiar Usuario',
    value: '',
  },
};

export const CambiarCorreoElectronico: Story = {
  args: {
    placeholder: 'Cambiar Correo Electrónico',
    value: '',
  },
};

export const CambiarContrasena: Story = {
  args: {
    placeholder: 'Cambiar Contraseña',
    value: '',
  },
};

export const Rol: Story = {
  args: {
    placeholder: 'Rol',
    value: '',
  },
};