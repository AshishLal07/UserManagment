/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import {useContext, createContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const userContext = createContext();

export const UserContextProvider = ({children}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [msg, setMsg] = useState('');
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState('');
	const navigate = useNavigate();

	const [input, setInput] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
	});

	// fetch all users

	const getUsers = async () => {
		const resp = await fetch('https://jsonplaceholder.typicode.com/users');
		const data = await resp.json();
		if (data) {
			setUsers([...data]);
			setIsLoading(false);
		}
	};

	// handle toast message

	const notify = () => {
		if (msg.length > 0) {
			toast(msg);
		}
		setMsg('');
	};

	// filter on search bar

	const filter = () => {
		if (search.length === 0) {
			getUsers();
		} else {
			const value = users.filter((user) => {
				const regex = new RegExp(search, 'gi');
				return user.name.match(regex);
			});
			setUsers([...value]);
		}
	};

	//handle Edit/Submit of the Form

	const handleSubmit = async (e, id = null) => {
		e.preventDefault();

		if (
			input.name === '' ||
			input.email === '' ||
			(input.phone === '') | (input.address === '')
		) {
			setMsg('Fill out the form before submitting');
		} else if (id) {
			const resp = await fetch(
				`https://jsonplaceholder.typicode.com/users/${id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(input),
				}
			);
			if (resp.ok) {
				setMsg('Update Successfully');
				navigate('/');
			} else {
				setMsg(`Error ${resp.status}`);
			}

			setInput({name: '', email: '', phone: '', address: ''});
		} else {
			const resp = await fetch('https://jsonplaceholder.typicode.com/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(input),
			});
			if (resp.ok) {
				setMsg('Submitted Succefully');
				navigate('/');
			} else {
				setMsg(`Error ${resp.status}`);
			}
			setInput({name: '', email: '', phone: '', address: ''});
		}
	};

	// handle editting of user

	const handleEdit = (e) => {
		e.preventDefault();
		const id = e.target.getAttribute('data-id');
		const editdata = users.filter((user) => user.id === Number(id));

		setInput({
			name: editdata[0].name,
			email: editdata[0].email,
			phone: editdata[0].phone,
			address: `${editdata[0].address['suite']}, ${editdata[0].address['street']}, ${editdata[0].address['city']}`,
		});

		navigate(`/createUser/${id}`);
	};

	// handle delete of the users

	const handleDelete = async (e) => {
		e.preventDefault();
		const id = e.target.getAttribute('data-id');

		const resp = await fetch(
			`https://jsonplaceholder.typicode.com/users/${id}`,
			{
				method: 'DELETE',
			}
		);
		if (resp.ok) {
			setMsg('Deleted Successfully');
		} else {
			setMsg(`Error ${resp.status}`);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<userContext.Provider
			value={{
				isLoading,
				users,
				msg,
				input,
				search,
				setSearch,
				filter,
				setInput,
				setMsg,
				setIsLoading,
				getUsers,
				handleSubmit,
				handleEdit,
				handleDelete,
				notify,
				setUsers,
			}}
		>
			{children}
		</userContext.Provider>
	);
};

export const userGloabalContext = () => useContext(userContext);
