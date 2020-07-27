import React from 'react';
import Button from '../components/styling/Button';

export default function Pagination( { gotoNextPage, gotoPreviousPage}) {
    return (
        <div>
            {gotoPreviousPage && <Button onClick= {gotoPreviousPage}>Previous</Button>}
            {gotoNextPage && <Button onClick= {gotoNextPage}>Next</Button>}
        </div>
    )
}
