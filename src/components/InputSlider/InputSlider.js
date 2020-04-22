import React, { Fragment } from 'react';
import arrowRight from '../../img/icons/arrow-right.svg';
import arrowLeft from '../../img/icons/arrow-left.svg';

export default function InputSlider({min, max, value, height, width}) {

    return (
        <Fragment>
            <input 
                type='range' 
                min={ min.toString() } 
                max={ max.toString() } 
                value={ value } 
                className='slider' 
                style={ {height, width} }
                step={1}
                disabled={true}
            />
        </Fragment>
    )
}
