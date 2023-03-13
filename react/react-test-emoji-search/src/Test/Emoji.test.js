import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import emojiList from '../emojiList.json'
import App from '../App'

describe('Emoji Test', () => {
    beforeEach(()=>{
        render(<App/>)
    })
    test("emoji list render", () => {
        let emojies = emojiList.slice(0, 20);
        emojies.map((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument()
        })
    })


})