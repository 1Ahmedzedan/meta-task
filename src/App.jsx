import { useReducer } from "react";

const left = new Set ([1 , 2 , 3]) ; 
const right = new Set ([4 , 5 , 6]) ;


const intialState = {
  right: right,
  left: left,
  selected: new Set(),
};


function provider(state , action){
  switch(action.type){
    case "toRight":
      if(state.selected.size ===0){
        alert("you don't select any thing") ; 
        return state; 
      }
      // operations
      Array.from(state.selected).map(val=>(state.right.add(val))) ;
      Array.from(state.selected).map(val=>(state.left.delete(val))) ;
      // return new state
      return{
        ...state,
        right:  new Set([...state.right].sort()),
        left: new Set([...state.left].sort()),
        selected: new Set() ,
      };
    case "toLeft":
      if(state.selected.size ===0){
        alert("you don't select any thing") ; 
        return state; 
      } 
      // operations
      Array.from(state.selected).map(val=>(state.left.add(val))) ;
      Array.from(state.selected).map(val=>(state.right.delete(val))) ;
      // return new state
      return{
        ...state,
        right:  new Set([...state.right].sort()),
        left: new Set([...state.left].sort()),
        selected: new Set(),
      };
    case "set":
      state.selected.add(action.payload);
      return{
        ...state,
        selected: state.selected,
      };
    case "remove":
      state.selected.delete(action.payload);
      return{
        ...state,
        selected: state.selected,
      };
  }
}

function App(){
  const [state , dispatch] = useReducer(provider,intialState) ; 

  function handleCheckbox(e , val){
      dispatch({type:`${e.target.checked?"set":"remove"}` , payload:val}) ; 
  }


  return (
      <div className="container">

        <div className="card">
          {
            Array.from(state.left).map(val=>(
              <div key={val}>
                <input type="checkbox" onChange={(e)=>handleCheckbox(e , val)} checked={state.selected.has(val)}/>
                <label>check {val}</label>
              </div>
            ))
          }
        </div>

        <div className="card">
          {
            Array.from(state.right).map(val=>(
              <div key={val}>
                <input type="checkbox" onChange={(e)=>handleCheckbox(e , val)} checked={state.selected.has(val)}/>
                <label>check {val}</label>
              </div>
            ))
          }
        </div>

        <div className="btns">
          <button onClick={()=>dispatch({type:"toLeft"})}>move to left</button>
          <button onClick={()=>dispatch({type:"toRight"})}>move to right</button>
        </div>

      </div>
  );

}
export default App ;