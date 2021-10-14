import React, { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import "./CellList.css";
import { useActions } from "../hooks/useActions";

interface CellListProps {}

const CellList: React.FC<CellListProps> = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id];
    });
  });

  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  /*   useEffect(() => {
    saveCells();
  }, [JSON.stringify(cells)]); */

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
