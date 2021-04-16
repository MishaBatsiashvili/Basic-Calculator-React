import React, { useState, useEffect } from 'react';
import './App.css';
import Numbers from './Numbers';

const App = () => {
	/*
	GENERAL PROCESS OVERVIEW:
	1. select first number
	2. select operation / if op selected change operation
	3. select third number
	4. select next operation -> calculate previous operation / press "=" and calculate current operation
	*/

	const [firstNum, setFirstNum] = useState(0);
	const [secondNum, setSecondNum] = useState(0);

	// this should store operation index
	const [operationIndex, setOperationIndex] = useState(null);
	// /.

	/*
	Steps:
	0 - select first number
	1 - operation selected & change operation & select second number
	2 - second number selected & awaiting next operation / awaiting "=" to be pressed
	*/
	const [step, setStep] = useState(0);
	// /.

	const operations = [
		{
			// divide
			value: '&#247;',
		},
		{
			// multiply
			value: '&#215;',
		},
		{
			value: '+',
		},
		{
			value: '-',
		},
	]

	const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	const numColumns = 3;

	useEffect(() => {
		console.log(operationIndex);
	}, [operationIndex])


	const numberClickHandler = (num) => {
		if (step === 0) {
			if (firstNum === 0) {
				setFirstNum(num.toString());
			} else {
				setFirstNum(firstNum + num.toString());
			}
		} else if (step === 1 || step === 2) {
			setStep(2);
			if (secondNum === 0) {
				setSecondNum(num.toString());
			} else {
				setSecondNum(secondNum + num.toString());
			}
		}
	}

	const operationClickHandler = (opIndex) => {
		if (step === 0) {
			setStep(1);
			setOperationIndex(opIndex);
		} else if (step === 1) {
			if (opIndex !== operationIndex) {
				setOperationIndex(opIndex);
			}
		} else if (step === 2) {
			calculateClickHandler(opIndex);
		}
	}

	const calculateClickHandler = (nextOperation = null) => {

		const first = parseInt(firstNum);
		const second = secondNum ? parseInt(secondNum) : first;
		let result = 0;

		switch (operationIndex) {
			case 0:
				result = first / second;
				break;
			case 1:
				result = first * second;
				break;
			case 2:
				result = first + second;
				break;
			case 3:
				result = first - second;
				break;
		}


		setFirstNum(result);
		setSecondNum(0);
		setOperationIndex(nextOperation);
		setStep(nextOperation ? 1 : 0);
	}


	const clearAll = () => {
		setFirstNum(0);
		setSecondNum(0);
		setOperationIndex(null);
		setStep(0);
	}


	const renderMainInput = () => {
		switch (step) {
			case 0:
				return firstNum
			case 1:
				return firstNum + operations[operationIndex].value
			case 2:
				return secondNum;
		}

	}


	return (
		<div className="App">
			<h3 className="main-input" dangerouslySetInnerHTML={{ __html: renderMainInput() }} />
			<div className="numbersWrp">
				<div className="number" onClick={clearAll}>AC</div>
				<Numbers
					numbers={numArr.reverse()}
					numColumns={numColumns}
					numberClickHandler={numberClickHandler}
				/>

				<div className="operationsWrp">
					{operations.map((el, i) => (
						<div
							key={i}
							className={`operation ${i === operationIndex ? 'operation-selected' : ''}`}
							dangerouslySetInnerHTML={{ __html: el.value }}
							onClick={() => operationClickHandler(i)}
						/>
					))}
					<div className="operation" onClick={() => calculateClickHandler()}>=</div>
				</div>

			</div>
		</div>
	);
}

export default App;
