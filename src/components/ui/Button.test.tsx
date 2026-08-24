import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renderiza o texto e dispara onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Enviar</Button>);
    const btn = screen.getByRole('button', { name: 'Enviar' });
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renderiza como link quando as="a"', () => {
    render(
      <Button as="a" href="https://exemplo.com">
        Ir
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Ir' });
    expect(link).toHaveAttribute('href', 'https://exemplo.com');
  });
});
