import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import App from '../App'

describe('Search Input test', () => { 
    let searchInput;
    beforeEach(()=>{
        render(<App/>)
        searchInput = screen.getByLabelText("inputTest")
    })
    test("render after filter",() =>{
        const value = "Grinning"
        userEvent.type(searchInput,value)
        expect(screen.getByText(value)).toBeInTheDocument();
    })

})