import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { Store } from "../../Store";
import {toast} from 'react-toastify';
import { getError } from "../../utils";
const Signup = () => {
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {userInfo}=state;
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res=await axios.post('https://amigosbackend.onrender.com/api/users/signup',{
                data,
            })
            ctxDispatch({type:'USER_SIGNIN',payload:res});
            localStorage.setItem('userInfo',JSON.stringify(res));
			navigate("/login");
		}catch (err) {
            alert("user already exist");
			toast(getError(err));
		}
	};
    useEffect(()=>{
        if(userInfo){
            navigate('/login');
        }
    },[navigate,userInfo]);

	return (
		<div className='signup_container'>
			<div className='signup_form_container'>
				<div className='left'>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className='white_btn'>
							Sign in
						</button>
					</Link>
				</div>
				<div className='right'>
					<form className='form_container' onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						
						<input
							type="text"
							placeholder="Name"
							name="name"
							onChange={handleChange}
							value={data.name}
							required
							className='input'
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className='input'
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className='input'
						/>
						{error && <div className='error_msg'>{error}</div>}
						<input type='submit' value='signUp' className="green_btn"></input>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;