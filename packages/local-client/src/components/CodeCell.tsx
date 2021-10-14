import { useEffect } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useCumulativeCode } from "../hooks/useCumulativeCode";
import "./CodeCell.css";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { content, id } = cell;
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[id]);
  const cumulativeCode = useCumulativeCode(id);

  useEffect(() => {
    if (!bundle) {
      createBundle(id, cumulativeCode);
      return;
    }

    const timerId = setTimeout(async () => {
      createBundle(id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={content}
            onChange={(value) => updateCell(id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
