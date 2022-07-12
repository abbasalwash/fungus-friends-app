import { Color, Spots } from '../services/Mushroom';

import getValuesFromEnum from '../helpers/helpers';

export const colorId = 'color';
export const spotId = 'spot';

export default function Filter(props: { handleOnClick: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void }) {
    const colors = getValuesFromEnum(Color);
    const spots = getValuesFromEnum(Spots);

    function renderFilterElement(name: string, index: number, id: string) {
        const loweredCaseName = name.toLowerCase();

        return (
            <div className="form-check" key={index} >
                <input className="form-check-input" type="checkbox" value={loweredCaseName} id={id} onClick={(event) => props.handleOnClick(event)} />
                <label className="form-check-label" htmlFor={id}>
                    {loweredCaseName}
                </label>
            </div>
        );
    }

    function renderColorFilterOptions() {
        return colors.map((color, index) => {
            return renderFilterElement(color, index, colorId);
        });
    }

    function renderSpotFilterOptions() {
        return spots.map((spot, index) => {
            return renderFilterElement(spot, index, spotId);
        });
    }

    function renderBody() {
        return (
            <>
                <div className='row'>
                    <div className='col-12'>
                        <a className="btn btn-primary mt-2 mb-2" data-bs-toggle="collapse" href="#filter" role="button" aria-expanded="false" aria-controls="filter">
                            Filters
                        </a>
                    </div>

                </div>
                <div className="collapse row" id="filter" data-testid="filter">
                    <div className='col-6'>{renderColorFilterOptions()}</div>
                    <div className='col-6'>{renderSpotFilterOptions()}</div>
                </div>
            </>
        );
    }

    return renderBody();
}
