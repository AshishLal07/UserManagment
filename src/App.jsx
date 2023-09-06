import {Route, Routes} from 'react-router-dom';
import './App.css';
import Layout from './layout';
import Home from './pages/Home';
import CreateUser from './pages/CreateUser';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />}></Route>
					<Route path="/createUser" element={<CreateUser />}></Route>
					<Route path="/createUser/:id" element={<CreateUser />}></Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
