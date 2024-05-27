import { Box, Button, Stack } from "@mui/material";
import { useReducer } from "react";

interface State {
  count: number
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; payload: number };
  
//Tambien se puede hacer con interfaces de la siguiente manera:
//   interface IAction {type: string;}
//     interface IncrementAction extends IAction {type: 'INCREMENT';}
//     interface DecrementAction extends IAction {type: 'DECREMENT';}
//     interface SetAction extends IAction {type: 'SET'; payload: number;}

const CounterBox = () => {
  const initialState: State = {
    count: 0,
  };

  function counterReducer(state: State, action: Action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
        break;
      case "decrement":
        return { count: state.count - 1 };
        break;
      case "set":
        return { count: action.payload };
        break;
      case "reset":
        return { count: 0 };
        break;
      default:
        throw new Error("Action not found");
    }
  }

  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <Box>
      <p>CounterBox: {state.count}</p>
      <Stack direction={"row"}>
        <Button onClick={() => dispatch({ type: "increment" })}>
          Increment
        </Button>
        <Button onClick={() => dispatch({ type: "decrement" })}>
          Decrement
        </Button>
        <Button onClick={() => dispatch({ type: "reset" })}>
          Reset
        </Button>
        <Button onClick={() => dispatch({ type: "set", payload: 10 })}>
          Set 10
        </Button>
      </Stack>
    </Box>
  );
};

export default CounterBox;
