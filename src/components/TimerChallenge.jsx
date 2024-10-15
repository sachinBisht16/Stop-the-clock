import { useState, useRef }  from 'react';
import Result from './Result';

export default function ({title, targetTime}) {
    let timer = useRef(); 
    let dialog = useRef(); 
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const activeTimer = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart () {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10)
    };
    
    function handleStop () {
        clearInterval(timer.current);
        dialog.current.open();
    };

    return (
        <>
            <Result ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    <button onClick={activeTimer ? handleStop : handleStart}> 
                        {activeTimer ? 'Stop' : 'Start'} Time
                    </button>
                </p>
                <p className={activeTimer ? 'Time is running' : 'Timer Inactive'}>{activeTimer ? 'Time is running out...' : 'Timer Inactive'}</p>
            </section>
        </>
    )
}