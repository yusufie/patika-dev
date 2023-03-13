import React from 'react'
import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

describe("Header Render Test",()=> {
    let headerComp;
    beforeEach(()=>{
        render(<App/>)
        headerComp = screen.getByText("Emoji Search")
    });
    test('Document should be have HeaderComponent', () => {
        expect(headerComp).toBeInTheDocument()
    });
})