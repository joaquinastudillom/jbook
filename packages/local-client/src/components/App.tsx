import { Provider } from "react-redux";
import "bulmaswatch/darkly/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { store } from "../state";
import CellList from "./CellList";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

export default App;
