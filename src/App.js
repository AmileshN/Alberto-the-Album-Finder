import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Album from "./Album";
import User from "./User";
function App(){
    return(
        <Router>
            <Routes>
                <Route index path="/album" element={<Album/>} />
                <Route path="/album/user" element={<User/>} />
            </Routes>
            
        </Router>
    )
}

export default App;