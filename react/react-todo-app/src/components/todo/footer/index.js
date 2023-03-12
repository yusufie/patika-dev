import React, { useState, useEffect } from 'react'
import './../../todo/style.css'

function Footer({ tasks,filterValueSelected, clearCompleted }) {
	const buttonList = [
		{
			name: 'All',
			selected: false
		},
		{
			name: 'Active',
			selected: false
		},
		{
			name: 'Comleted',
			selected: false
		},
	]
	
	const [btnList, setBtnList] = useState(buttonList);
	const [changeStyle, setChangeStyle] = useState({});
	
	useEffect(() => {
		const newStyle = {};
		btnList.forEach((b, i) => {
			newStyle[i] = b.selected ? "selected" : "";
		});
		setChangeStyle(newStyle);
	}, [btnList]);

	

	const handleCheck = (tiklananBtn,taskIndex) => {
        const newTasks = [...btnList];
        newTasks.forEach((b, i) => {
			if (i === taskIndex) {
			  b.selected = true;
			} else {
			  b.selected = false;
			}
		  });
        setBtnList(newTasks);
		filterValueSelected(tiklananBtn.name);
    }


	return (
		<div>
			<footer className="footer">
				<span className="todo-count">
					<strong>{tasks.length} </strong>
					items left
				</span>

				<ul className="filters">
					{btnList.map((btn, b) => (
						<li key={b} >
							<a href="#/" className={changeStyle[b]} onClick={()=> handleCheck(btn,b)}>{btn.name}</a>
						</li>
					))}
				</ul>

				<button className="clear-completed" onClick={() => clearCompleted()}>
					Clear completed
				</button>
			</footer>
		</div>
	)
}

export default Footer