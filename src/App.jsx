import { useState } from 'react'
import './App.css';
import { DragDropContext, Droppable , Draggable } from 'react-beautiful-dnd';


const TestingDragDrop = () => {
  const [box, setBox ] = useState(
   [
    {
      id: 0,
      bg: 'first'
    },
    {
      id: 1,
      bg: 'second'
    },
    {
      id: 2,
      bg: 'third'
    },
  ]
  );

  const [secBox, setSecBox ] = useState(
    [
     {
       id: 3,
       bg: 'secfirst'
     },
     {
       id: 4,
       bg: 'secsecond'
     },
     {
       id: 5,
       bg: 'secthird'
     },
   ]
   );



  const handleOnDragEnd = (results) => {
    const { source, destination } = results;
     
    //If there is no destination 
    if (!destination) return;

    //The item is not dragged but touched
    if(source.droppableId === destination.droppableId  && source.index === destination.index) return;
    
    //The item is dragged within the same list
    if(source.droppableId === destination.droppableId ){
       const newList = Array.from(
        source.droppableId === 'boxes' ? box : secBox
      )
      const [draggedItem] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, draggedItem);
      source.droppableId === 'boxes' ? setBox(newList) : setSecBox(newList);
    }
 
    //The item is dragged from list to another
    if(source.droppableId !== destination.droppableId ){
      const sourceList = Array.from(
        source.droppableId === 'boxes'? box : secBox
      )

      const destinationList = Array.from(
        destination.droppableId === 'boxes' ? box : secBox
      )

      const [draggedItem] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, draggedItem);

      source.droppableId === 'boxes' ? setBox(sourceList) : setSecBox(sourceList);
      destination.droppableId === 'boxes' ? setBox(destinationList) : setSecBox(destinationList);

    }
  }


  return (
    <>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="list_1">
      <Droppable droppableId='boxes'>
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {box.map(({id, bg}, index) => 
             <Draggable key={id} draggableId={id.toString()} index={index}>
              {(provided) => (
                <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                  <div className={`box ${bg}`}></div>
                </li>
              )}
             </Draggable>     
            )}  
            {provided.placeholder}      
          </ul> 
        )}     
        </Droppable>
      </div>

      <div className="list_2">
        <Droppable droppableId='secBoxes'>
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
               {secBox.map(({id, bg}, index) => 
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                      <div className={`box ${bg}`}></div>
                    </li>
                  )}
                </Draggable>
               )}
                 {provided.placeholder}    
            </ul>
          )}
        </Droppable>
      </div>
      </DragDropContext>
    </>
  );
}




function App() {

  
  return (
    <>
      <div className="App">    
          <TestingDragDrop />
        </div>   
    </>
  )
}





export default App

