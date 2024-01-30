import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Album from "./Album";
import User from "./User";
function App(){
    return(
        <Router>
            <Routes>
                <Route index exact path="/" element={<Album/>} />
                <Route path="/user" element={<User/>} />
            </Routes>
            
        </Router>
    )
}

export default App;