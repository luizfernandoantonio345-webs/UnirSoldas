import { useState } from 'react';

function maskPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2)  return digits.replace(/(\d{0,2})/, '($1');
  if (digits.length <= 6)  return digits.replace(/(\d{2})(\d{0,4})/, '($1) $2');
  if (digits.length <= 10) return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

export function useBrazilianPhone() {
  const [value, setValue] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(maskPhone(e.target.value));
  const digits = value.replace(/\D/g, '');
  const isValid = digits.length >= 10;
  return { value, onChange, isValid, digits };
}
