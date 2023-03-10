import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import  "./login.css";
import { Store } from "../../Store";
import { toast } from 'react-toastify';
import { getError } from "../../utils";
const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
    const navigate=useNavigate();
    const[click,setClick]=useState('false');
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {userInfo}=state;
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
            const res=await axios.post('https://amigosbackend.onrender.com/api/users/signin',{
                data,
            });
            ctxDispatch({type:'USER_SIGNIN',payload:res});
            localStorage.setItem('userInfo',JSON.stringify(res));
            navigate('/');
             alert('login succesfull');
        }catch(error){ 
            alert('login failed');
            toast.error(getError(error));
        }
	};
    useEffect(()=>{
        if(!userInfo){
            navigate('/login');
        }
    },[navigate,click,userInfo]);
	return (
		<div className='login_container'>
			<div className='login_form_container'>
				<div className='left-log'>
					<form className='form_container' onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
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
						<button type="submit" className='green_btn'>
							Sign in
						</button>
					</form>
				</div>
				<div className='right'>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className='white_btn'>
							Sign up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;