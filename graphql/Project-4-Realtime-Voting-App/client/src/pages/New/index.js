import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { NEW_QUESTION_MUTATION } from './queries'

const initialOptions = [{ title: '' }, { title: '' }];

export default function NewQuestion() {
  const [addQuestion, { loading, data }] = useMutation(NEW_QUESTION_MUTATION)
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(initialOptions);

  const handleChangeOption = ({ target }) => {
    const newArray = options;
    newArray[target.id].title = target.value;

    setOptions([...newArray]);
  };

  const handleSave = () => {
    const filledOptions = options.filter((option) => option.title !== '');

    if (title === '' || filledOptions.length < 2) return false;

    addQuestion({
      variables: {
        input: {
          title,
          options: {
            data: filledOptions,
          }
        },
      },
    });

    setTitle('');
    setOptions(initialOptions);
  };

  return (
    <div>
      <h2>Question</h2>
      <input
        placeholder="type your question..."
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        disabled={loading}
      />

      <h2>Options</h2>
      {
        options.map((option, index) => (
          <div key={index}>
            <input
              placeholder="Type your option..."
              value={option.title}
              id={index}
              onChange={handleChangeOption}
              disabled={loading}
            />
          </div>
        ))
      }
      <button
        onClick={() => setOptions([...options, { title: '' }])}
        disabled={loading}
      >
        New Option
      </button>

      <button disabled={loading} onClick={handleSave}>Save</button>
    </div>
  )
}
