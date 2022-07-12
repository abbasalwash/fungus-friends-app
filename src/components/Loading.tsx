export default function Loading() {
    return (
        <div className='col-12 d-flex justify-content-center'>
            <button className='btn btn-primary btn-lg' type='button' disabled>
                <span
                    className='spinner-grow spinner-grow-sm'
                    role='status'
                    aria-hidden='true'
                />
                &nbsp;Loading
            </button>
        </div>
    );
}
