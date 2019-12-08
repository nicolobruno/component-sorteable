import React, { useState, useCallback } from "react";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import PropTypes from "prop-types";

import { arrayMove } from "./utils";
import "./styles.css";

const DragHandle = sortableHandle(({ classNameImageMove }) => (
  <img
    className={`${classNameImageMove || "imageMove"}`}
    src="https://cdn4.iconfinder.com/data/icons/vectory-multimedia-1/40/move_4-512.png"
    alt="move"
  />
));

const SortableItem = sortableElement(
  ({ children, shouldShowDragHangle, index, classNameImageMove }) => (
    <li>
      {shouldShowDragHangle(index) && (
        <DragHandle classNameImageMove={classNameImageMove} />
      )}
      {children}
    </li>
  )
);

const SortableContainer = sortableContainer(({ children, sortActived }) => (
  <ul className={`containerHorizontal ${sortActived ? "sortActived" : ""}`}>
    {children}
  </ul>
));

function SortableComponentDragHandle({ items, axis, renderMyChildren, onSortEnd, shouldShowDragHangle, classNameImageMove}) {
  const [ sortActived, setSortActived] = useState(false);

  const onSortStart = useCallback(
    sortActived && setSortActived(true)
  , [sortActived]);

  const handleOnSortEnd = useCallback((oldIndex, newIndex) => {
    if (onSortEnd) {
      onSortEnd(oldIndex, newIndex);
    }
  }, [onSortEnd]);

  return (
    items && (
      <SortableContainer
      axis={axis}
      onSortEnd={handleOnSortEnd}
      onSortStart={onSortStart}
      sortActived={sortActived}
      useDragHandle
    >
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          shouldShowDragHangle={shouldShowDragHangle}
          classNameImageMove={classNameImageMove}
          value={value}
        >
          {renderMyChildren(index)}
        </SortableItem>
      ))}
    </SortableContainer>
    )
  );
}

SortableComponentDragHandle.propTypes = {
  renderMyChildren: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object),
  onSortEnd: PropTypes.func,
  shouldShowDragHangle: PropTypes.func,
  axis: PropTypes.string,
  classNameImageMove: PropTypes.string
};

SortableComponentDragHandle.defaultProps = {
  axis: "x"
};

export default SortableComponentDragHandle;
