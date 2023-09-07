import {useLocation, useParams} from 'react-router-dom';
import {userGloabalContext} from '../userContext';

import {useEffect} from 'react';

const CreateUser = () => {
	const {msg, input, setInput, handleSubmit, notify} = userGloabalContext();
	const {id} = useParams();
	const location = useLocation().pathname;

	useEffect(() => {
		if (id === undefined) {
			setInput({name: '', email: '', address: '', phone: ''});
		}
	}, [location]);

	useEffect(() => notify(), [msg]);

	return (
		<>
			<div className=" h-full md:w-1/2 m-auto bg-gray-50 flex flex-col justify-center items-center">
				<div>
					<h2 className="text-2xl text-center ">Add a new user!</h2>
				</div>
				<form action="" className="mt-5 grid grid-cols-[1fr_3fr] gap-5 p-4 ">
					<label htmlFor="name" className="text-lg text-center">
						Name
					</label>
					<input
						type="text"
						name="name"
						id="name"
						value={input.name}
						onChange={(e) => setInput({...input, name: e.target.value})}
						className="p-2 border-b-2 bg-gray-50 outline-none"
						required
					/>

					<label htmlFor="email" className="text-lg text-center">
						Email
					</label>
					<input
						type="email"
						name="email"
						value={input.email}
						id="email"
						onChange={(e) => setInput({...input, email: e.target.value})}
						className="p-2 border-b-2 bg-gray-50 outline-none"
						required
					/>

					<label htmlFor="phone" className="text-lg text-center">
						Mobile No
					</label>
					<input
						type="text"
						name="phone"
						value={input.phone}
						id="phone"
						onChange={(e) => setInput({...input, phone: e.target.value})}
						className="p-2 border-b-2 bg-gray-50 outline-none"
						required
					/>

					<label htmlFor="address" className="text-lg text-center">
						Address
					</label>
					<input
						type="text"
						name="address"
						value={input.address}
						id="address"
						onChange={(e) => setInput({...input, address: e.target.value})}
						className="p-2 border-b-2 bg-gray-50 outline-none"
						required
					/>

					<button
						onClick={(e) => handleSubmit(e, id)}
						className="bg-green-400 col-span-2 py-2 my-2 rounded-2xl w-3/4 m-auto drop-shadow-md"
						type="submit"
					>
						{id ? 'Edit' : 'Submit'}
					</button>
				</form>
			</div>
		</>
	);
};

export default CreateUser;
