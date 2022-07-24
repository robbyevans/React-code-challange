import React,{useEffect,useState} from "react";
import PoemsContainer from "./PoemsContainer";
import NewPoemForm from "./NewPoemForm";

function App() {

  const [poemList,setPoemList]=useState([])
  const[isTrue,setIsTrue]=useState(true)

  useEffect(()=>{
    fetch("http://localhost:8004/poems")
    .then((resp)=>(resp.json()))
    .then((poem)=>setPoemList(poem))
  },[])

  function addNewPoem(newPoem){
    setPoemList([...poemList,newPoem])
  }

  function onDelete(item){
    const updatedPoemList=poemList.filter(poem=>poem.id !=item.id)
    setPoemList(updatedPoemList)
    window.location.reload()

  }
  useEffect(()=>{
    console.log('item deleted')
  },[])

    function handleClick(){
      setIsTrue(!isTrue)
    }

  return (
    <div className="app">
      <div className="sidebar">
        <button onClick={handleClick}>Show/hide new poem form</button>
        {isTrue ? <NewPoemForm onAdd={addNewPoem} /> : null}
      </div>
      <PoemsContainer poemList={poemList} onDelete={onDelete} />
    </div>
  );
}

export default App;
