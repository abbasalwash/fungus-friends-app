import { Color, Mushroom, Spots } from '../services/Mushroom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import imageApi, { Photo } from '../services/Image';
import { useEffect, useState } from 'react';

import Empty from './Empty';
import { Icon } from 'leaflet';
import Loading from './Loading';

const mushroomIcon = new Icon({
    iconUrl: '/mushroom-32.png',
    iconSize: [32, 32],
});

export default function Map(props: { mushrooms: Mushroom[] }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [images, setImages] = useState<Photo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            imageApi('mushroom', props.mushrooms.length)
                .then(response => setImages(response.photos))
                .catch(error => setIsError(true))
                .finally(() => setIsLoading(false));
        }

        fetchData();
    }, [props.mushrooms.length]);

    function renderBody() {
        const centerLatLng = props.mushrooms[0].latlng;

        return (
            <div className='col-12'>
                <MapContainer
                    center={centerLatLng}
                    zoom={20}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    {renderMarker()}
                </MapContainer>
            </div>
        );
    }

    function renderImage(index: number) {
        return !isLoading && !isError && (images!.length >= props.mushrooms.length) ?
            <img
                src={images![index].src.tiny}
                className="card-img-top"
                alt={images![index].alt} /> :
            <Loading />;
    }

    function renderMarker() {
        return props.mushrooms.map((mushroom, index) => {
            const color = Color[mushroom.color].toLowerCase();

            return (
                <Marker icon={mushroomIcon} position={mushroom.latlng} key={index}>
                    <Popup>
                        <div className="card">
                            {renderImage(index)}
                            <div className="card-body">
                                <h5 className="card-title"><strong>{mushroom.name.toLowerCase()}</strong></h5>
                                <p className="card-text"><em>Lorem ipsum dolor sit amet consectetur adipisicing elit.</em></p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item" style={{ color: color }}>
                                    <strong>color:</strong>&nbsp;{color}
                                </li>
                                <li className="list-group-item">
                                    <strong>spots:</strong>&nbsp;{Spots[mushroom.spots].toLowerCase()}
                                </li>
                                <li className="list-group-item">
                                    <strong>latitude:</strong>&nbsp;{mushroom.latlng[0]},&nbsp;<strong>longitude:</strong>&nbsp;{mushroom.latlng[1]}
                                </li>
                            </ul>
                        </div>
                    </Popup>
                </Marker>
            );
        })
    }

    return props.mushrooms.length >= 1 ? renderBody() : <Empty />;
}