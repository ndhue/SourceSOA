import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Loading from "components/Loading";
import PageNotFound from "containers/PageNotFound";
import { renderRoutesAdmin, renderRoutesHome, renderRoutesUser } from "routes";

function App() {
  
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Switch>
          {renderRoutesHome()} 
          {renderRoutesUser()}
          {renderRoutesAdmin()}
          <Route path="" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
