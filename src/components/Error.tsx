import errorMushroom from '../assets/error.jpg';

export default function Error() {
    return (
        <>
            <div className='col-12 d-flex justify-content-center'>
                <div className='alert alert-danger' role='alert'>
                    Sorry, some mushrooms went crazy...
                </div>
            </div>
            <div className='col-12 d-flex justify-content-center'>
                <img src={errorMushroom} className='img-fluid' alt='crazy mushroom' />
            </div>
        </>
    );
}
