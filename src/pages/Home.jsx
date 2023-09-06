import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {userGloabalContext} from '../userContext';
import UserList from '../components/UserList';

const Home = () => {
	const {users, filter, search, setSearch} = userGloabalContext();

	useEffect(() => {
		filter();
	}, [search]);

	return (
		<>
			<div className="m-5 flex flex-col md:flex-row items-center gap-5 ">
				<div className="border-b-2 ">
					<i className="fa-solid fa-magnifying-glass ml-2 text-gray-500 text-xl "></i>
					<input
						name="name"
						className="p-4 outline-none"
						type="text"
						placeholder="Search Users..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<div className="border-2 p-2  rounded-xl hover:bg-gray-300">
					<button name="reset" onClick={() => setSearch('')}>
						Reset
					</button>
				</div>
				<Link
					className="bg-orange-400 p-2 text-white rounded-lg border border-gray-200 ml-0 md:ml-52"
					to="/createUser"
				>
					Create New User
				</Link>
			</div>
			<div className="p-2 font-bold hidden md:grid md:grid-cols-[1fr_repeat(4,2fr)] items-center justify-items-center  gap-2 ">
				<p>Name</p>
				<p>Email</p>
				<p>Mobile No</p>
				<p>Address</p>
				<p>Action</p>
			</div>
			<hr />
			<div>
				<UserList userList={users}></UserList>
			</div>
		</>
	);
};

export default Home;

// import {Link} from 'react-router-dom';
// // import UserList from '../components/UserList';
// import {userGloabalContext} from '../UserContext';

// const Home = () => {
// 	const {filter, setValue, filterUser} = userGloabalContext();

// 	return (
// 		<>
// 			<div className="m-5 flex flex-wrap  items-center gap-5 ">
// 				<div className="border-b-2 ">
// 					<i className="fa-solid fa-magnifying-glass ml-2 text-gray-500 text-xl "></i>
// 					<input
// 						name="name"
// 						className="p-4 outline-none"
// 						type="text"
// 						placeholder="Search Users..."
// 						value={filter.name}
// 						onChange={setValue}
// 					/>
// 				</div>

// 				<div className="border-2 p-2  rounded-xl hover:bg-gray-300">
// 					<button name="reset" onClick={setValue}>
// 						Reset
// 					</button>
// 				</div>
// 				<Link
// 					className="bg-orange-400 p-2 text-white rounded-lg border border-gray-200 ml-52"
// 					to="/createTeam"
// 				>
// 					Check Team List
// 				</Link>
// 			</div>
// 			<hr />

// 			<div>{/* <UserList filterList={filterUser}></UserList> */}</div>
// 		</>
// 	);
// };

// export default Home;
