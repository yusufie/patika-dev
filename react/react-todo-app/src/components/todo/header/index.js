import React, { useState, useEffect } from 'react'

const initialFormValues = {isChecked:false, taskName:''};


function Header({addTask,tasks}) {

    const [form, setForm] = useState(initialFormValues);

    useEffect(()=>{
        setForm(initialFormValues);
    },[tasks])

    //Inputta bir değişiklik olduğu zaman değişen nesneyi direkt form değişkenine atıyoruz.
    const onChangeInput = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    //console.log(addTask,' asdasd')


    const onSubmit = (e) =>{
        e.preventDefault();

        if(form.taskName === ''){
            return false;
        }
        addTask([...tasks, form]);
        //console.log(form,'1111');
    }

  return (
    <div>
        <header className="header">
		<h1>todos</h1>
		<form onSubmit={onSubmit}>
			<input name='taskName' className="new-todo" placeholder="What needs to be done?" value={form.taskName} onChange={onChangeInput} autoFocus />
		</form>
	</header>
    </div>
  )
}

export default Header