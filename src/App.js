import React, { useState, useCallback } from 'react';
import './App.css';

import SortableComponentDragHandle from "./components/SorteableElementsDragHandle";
import { arrayMove } from "./components/SorteableElementsDragHandle/utils";

function App() {
  const [ images, setImages ] = useState([
    "https://static3.srcdn.com/wordpress/wp-content/uploads/2017/02/Orlando-Bloom-as-Legolas-Greenleaf-Knives-in-The-Hobbit.jpg",
    "https://dz7u9q3vpd4eo.cloudfront.net/wp-content/legacy/posts/ecf84a37-f2d4-4a32-982f-4d5ea9d10489.jpg",
    "https://stephencwinter.files.wordpress.com/2016/09/theoden01.jpg",
    "https://vignette.wikia.nocookie.net/lotr/images/b/b9/Eomer_-_Close_up.PNG/revision/latest?cb=20120922113500"
  ]);

  // eslint-disable-next-line no-undef
  const onSortEndImages = useCallback((data) => {
    console.log(data.oldIndex, data.newIndex);
    const ordenated = arrayMove(images, data.oldIndex, data.newIndex);
    setImages(arrayMove(images, data.oldIndex, data.newIndex));
    console.log({images});
    console.log(ordenated);
  }, [images]);

  return (
    <div className="App">
      <h1 className="title">Argentina</h1>
      <SortableComponentDragHandle
        axis="x"
        items={images}
        shouldShowDragHangle={i => true}
        onSortEnd={onSortEndImages}
        renderMyChildren={i => (
          <img alt="move" className="image" src={images[i]} />
        )}
      />
    </div>
  );
}

export default App;
