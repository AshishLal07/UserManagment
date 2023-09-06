/* eslint-disable react/prop-types */
import {Link} from 'react-router-dom';
import {userGloabalContext} from '../userContext';
import {useEffect} from 'react';

const UserList = ({userList}) => {
	const {isLoading, handleEdit, notify, msg, handleDelete} =
		userGloabalContext();

	useEffect(() => notify(), [msg]);

	if (isLoading) {
		return <p className="p-5 text-center text-xl">Loading, Please wait...</p>;
	}

	return (
		<>
			<div className="flex flex-col">
				<div className="flex-1">
					{userList.length > 0 ? (
						userList.map((user, index) => (
							<div
								key={index}
								className="p-2  m-auto grid grid-cols-1 md:grid-cols-[1fr_repeat(4,2fr)] items-center justify-items-center gap-2 odd:bg-gray-100   "
							>
								<div className="text-center">{user.name}</div>
								<div>{user.email}</div>
								<div>{user.phone}</div>
								<div>
									{user.address['suite']}, {user.address['street']},
									{user.address['city']}
								</div>

								<div className="flex">
									<Link
										onClick={handleEdit}
										className="p-2 bg-green-500  flex justify-center rounded-xl border-2 items-center cursor-pointer hover:bg-gray-100 hover:border-green-500"
										data-id={user.id}
									>
										Edit
									</Link>
									<Link
										onClick={handleDelete}
										className="p-2 bg-red-500  flex justify-center rounded-xl border-2 items-center cursor-pointer hover:bg-gray-100 hover:border-red-500"
										data-id={user.id}
									>
										Delete
									</Link>
								</div>
							</div>
						))
					) : (
						<p className="p-5 text-center text-xl ">
							Please Reset Page, No Data Found
						</p>
					)}
				</div>
			</div>
		</>
	);
};

export default UserList;
