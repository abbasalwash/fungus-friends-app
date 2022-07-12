import { render, screen } from '@testing-library/react';

import Loading from '../../../components/Loading';

test('<Loading />', () => {
    render(<Loading />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
});