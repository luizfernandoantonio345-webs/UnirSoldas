import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'ghost', 'dark'] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary', children: 'Solicitar orçamento' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Ver trabalhos' } };
export const Dark: Story = { args: { variant: 'dark', children: 'Falar no WhatsApp' } };
