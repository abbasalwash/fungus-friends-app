import './App.css';

import Filter, { colorId } from './components/Filter';
import mushroomApi, { Color, Mushroom, Spots } from './services/Mushroom';
import { useEffect, useState } from 'react';

import Error from './components/Error';
import Loading from './components/Loading';
import Map from './components/Map';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [mushrooms, setMushrooms] = useState<Mushroom[]>([]);
    const [filteredMushrooms, setFilteredMushrooms] = useState<Mushroom[]>([]);
    const [colorFilter, setColorFilter] = useState<string[]>([]);
    const [spotFilter, setSpotFilter] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            mushroomApi()
                .then(response => {
                    setMushrooms(response);
                    setFilteredMushrooms(response);
                })
                .catch(error => setIsError(true))
                .finally(() => setIsLoading(false));
        }

        fetchData();
    }, [setMushrooms, setFilteredMushrooms]);

    useEffect(() => {
        function updateFilterOptions(data: { colors: string[], spots: string[] }) {
            let filteredMushrooms = mushrooms;

            if (data.colors.length >= 1) {
                filteredMushrooms = filteredMushrooms.filter(mushroom => {
                    const color = Color[mushroom.color].toLowerCase();

                    return data.colors.includes(color);
                });
            }

            if (data.spots.length >= 1) {
                filteredMushrooms = filteredMushrooms.filter(mushroom => {
                    const spot = Spots[mushroom.spots].toLowerCase();

                    return data.spots.includes(spot);
                });
            }

            setFilteredMushrooms(filteredMushrooms);
        }

        updateFilterOptions({ colors: colorFilter, spots: spotFilter });
    }, [colorFilter, spotFilter, setFilteredMushrooms, mushrooms]);

    function handleOnClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        const eventTarget = event.target as HTMLInputElement
        const checked = eventTarget.checked;
        const value = eventTarget.value;
        const id = eventTarget.id;

        if (checked) {
            if (id === colorId) {
                setColorFilter(current => [...current, value]);
            } else {
                setSpotFilter(current => [...current, value]);
            }
        } else {
            if (id === colorId) {
                setColorFilter(colorFilter.filter(color => color !== value));
            } else {
                setSpotFilter(spotFilter.filter(spot => spot !== value));
            }
        }
    }

    function renderBody() {
        let element = <Error />;

        if (!isError) {
            element = <Map mushrooms={filteredMushrooms} />;
        }

        return element;
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                {isLoading ? '' : <Filter handleOnClick={handleOnClick} />}
            </div>
            <div className='row'>
                {isLoading ? <Loading /> : renderBody()}
            </div>
        </div>
    );
}
