import React from 'react';
import { render } from '@testing-library/react-native';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    const { getByTestId } = render(<Checkbox checked={false} />);
    const checkbox = getByTestId('checkbox');
    expect(checkbox.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: '#fff' })
      ])
    );
  });

  it('renders checked when checked=true', () => {
    const { getByTestId } = render(<Checkbox checked={true} />);
    const checkbox = getByTestId('checkbox');
    expect(checkbox.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: '#007AFF' })
      ])
    );
  });
}); 