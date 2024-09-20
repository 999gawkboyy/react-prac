import {useSelector, useDispatch} from 'react-redux'

const Counter = () => {
    const count = useSelector((state) => {return state.count});
    const dispatch = useDispatch();
    return (
      <div>
        <h1>Count: {count}</h1>
        <button onClick={() => dispatch({type: 'INCREMENT'})}>INCREMENT</button>
        <button onClick={() => dispatch({type: 'DECREMENT'})}>DECREMENT</button>
      </div>
    );
}

export default Counter;