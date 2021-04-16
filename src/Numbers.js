import React from 'react';

const Numbers = ({ numbers, numColumns, numberClickHandler }) => {
    const numWrpArr = [];

    const fillNumWrpArr = (x, tempArr) => {
        numWrpArr.push((
            <div className="numWrp" key={x}>
                {tempArr.map((el) => (
                    <div
                        key={el}
                        className="number"
                        onClick={() => numberClickHandler(el)}
                    >
                        {el}
                    </div>
                ))}
            </div>
        ))
    }
    // 0 1 2 - 3 4 5 - 6 7 8 - 9
    for (let x = 0; x < numbers.length; x++) {
        // 8+3 = 11 > 10
        if ((x + 1) % numColumns === 0) {

            // eg.2 x = 5, slice(6-3, 5+1) => slice(3, 6)
            // eg.1 numColumns = 3, x = 2, slice(3-3, 2+1) => slice(0, 3) = array from 0 including 2 indexes
            const tempArr = numbers.slice(x + 1 - numColumns, x + 1)
            fillNumWrpArr(x, tempArr);

        } else if (x + numColumns > numbers.length) {
            const tempArr = numbers.slice(x);
            fillNumWrpArr(x, tempArr);
        }
    }

    return (
        <div>
            {numWrpArr}
        </div>
    );

}

export default Numbers;