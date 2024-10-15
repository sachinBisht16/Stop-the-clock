import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from 'react-dom';

const Result = forwardRef(function Result({result, targetTime, remainingTime, onReset}, ref) {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedTime = (remainingTime/1000).toFixed(2);
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })
    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost ? <h2>You Lost</h2> : 
            <>
                <label htmlFor="">Your Score</label>
                <progress max={String(targetTime * 1000)} value={String(targetTime * 1000 - remainingTime)}></progress>
            </>}
            <p>The target time was <strong>{targetTime}</strong> seconds.</p>
            <p>You stopped the timer with <strong>{formattedTime}</strong> seconds left.</p>
            <form method="dialog" onSubmit={onReset}>
                <button>close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
})

export default Result;