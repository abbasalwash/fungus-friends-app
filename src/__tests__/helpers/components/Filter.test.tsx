import { fireEvent, render, screen } from '@testing-library/react';

import Filter from '../../../components/Filter';

test('<Filter />', () => {
    const mockedOnClick = jest.fn()

    render(<Filter handleOnClick={mockedOnClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('filter')).toHaveClass('collapse');
});