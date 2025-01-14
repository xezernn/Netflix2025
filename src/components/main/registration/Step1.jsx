import { useState } from "react";
import { Link } from "react-router-dom"

function Step1() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleInput = (e, type) => {
        const value = e.target.value;
        if (type === "email") {
            setEmail(value);
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            setEmailError(!emailRegex.test(value));
        } else if (type === "password") {
            setPassword(value);
            setPasswordError(value.length < 6);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) {
            setEmailError("Email is required.")
            return
        }
        if (!password) {
            setPasswordError("password is required.")
            return
        }
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email format.")
            return;
        }
        setEmailError("")
    };

    const isFormValid = email && password && !emailError && !passwordError;

    return (
        <main className="px-4 max-w-[1100px] mx-auto flex justify-center items-center min-h-[700px]">
            <div className="max-w-[500px] mx-auto py-8">
                <p className="uppercase text-sm">step <span className="font-semibold"> 1 </span> of <span className="font-semibold">3</span></p>
                <h1 className="text-3xl font-semibold text-[#333]">Create a password to start your membership</h1>
                <p className="text-lg py-2 leading-5 max-w-[320px]">Just a few more steps and you're done!
                    We hate paperwork, too.
                </p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p className="text-lg pt-2">Email</p>
                        <div className="relative w-[90%] my-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => handleInput(e, "email")}
                                placeholder="Enter your email"
                                className={`peer focus:outline-2 outline-offset-2 h-[55px] pl-3 rounded-sm text-[#333] border-[#767676] border-[1px] w-full placeholder:text-transparent focus:pt-6 focus:pb-6 py-2`}
                            />
                            <label
                                className="absolute top-1 left-0 p-3 h-full text-[#767676] text-sm truncate pointer-events-none transition-all ease-in-out duration-100
        origin-[0_0] peer-focus:scale-90 peer-focus:-translate-x-1 peer-focus:-translate-y-4 peer-focus:text-gray-400
        peer-[:not(:placeholder-shown)]:scale-90  peer-[:not(:placeholder-shown)]:-translate-x-1  peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-400"
                            >
                                Email
                            </label>
                            {emailError && <p className="text-red-600 text-sm mt-1">Please enter a valid email.</p>}
                        </div>
                        <div className="relative w-[90%] my-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => handleInput(e, "password")}
                                placeholder="Enter your password"
                                className={`peer focus:outline-2 outline-offset-2 h-[55px] pl-3 rounded-sm text-[#333] border-[#767676] border-[1px] w-full placeholder:text-transparent focus:pt-6 focus:pb-6 py-2`}
                            />
                            <label
                                className="absolute top-1 left-0 p-3 h-full text-[#767676] text-sm truncate pointer-events-none transition-all ease-in-out duration-100
        origin-[0_0] peer-focus:scale-90 peer-focus:-translate-x-1 peer-focus:-translate-y-4 peer-focus:text-gray-400
        peer-[:not(:placeholder-shown)]:scale-90  peer-[:not(:placeholder-shown)]:-translate-x-1  peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-400"
                            >
                                Add a password
                            </label>
                            {passwordError && <p className="text-red-600 text-sm mt-1">Password must be at least 6 characters.</p>}
                        </div>
                    </div>
                    <p className="text-blue-500 mb-3 cursor-pointer hover:underline">Forgot your password? </p>
                    <label> <input
                        type="checkbox"
                        className="text-blue-500 cursor-pointer hover:underline"
                    /><span className="ml-2">Please do not email me Netflix offers.</span></label>
                    <button className="relative w-[90%] mb-6 my-4 bg-red-600 hover:bg-red-500 h-[55px] text-white text-2xl rounded-sm">
                        {isFormValid ?
                            <Link to={'/signup'} className=" h-full flex justify-center items-center">
                                Next
                            </Link> : <span className=" h-full flex justify-center items-center">
                                Next
                            </span>
                        }
                    </button>
                </form>
            </div>
        </main >
    )
}
export default Step1