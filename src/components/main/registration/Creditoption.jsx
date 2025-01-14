import React, { useState } from 'react'
import { BsCreditCard } from 'react-icons/bs'
import { FaRegCircleQuestion } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Creditoption() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleClick = () => {
        if (!isChecked) {
            toast.error("Please check the checkbox to proceed.");
        }
    };
    return (
        <main className="px-4 flex flex-col max-w-[1100px] mx-auto justify-center items-center min-h-[900px]">
            <div className="max-w-[600px] mx-auto py-8 text-start ">
                <p className="uppercase text-sm">step <span className="font-semibold"> 3 </span> of <span className="font-semibold">3</span></p>
                <h1 className="text-3xl font-semibold text-[#333]">Set up your credit or debit card</h1>
                <div className='flex py-3'>
                    <img className="w-[40px] h-[25px]" src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/VISA.png" alt="visa" />
                    <img className="w-[40px] h-[25px]" src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/MASTERCARD.png" alt="mastercard" />
                    <img className="w-[40px] h-[25px]" src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/AMEX.png" alt="amex" />
                </div>
                <div className='relative'>
                    <input type="text"
                        placeholder='Card number'
                        className="w-full pl-3 border-[1px] h-[60px] border-[#888] rounded-md" />
                    <BsCreditCard className='absolute top-4 right-5 text-2xl text-[#888]' />
                </div>
                <div className="flex justify-between my-3 gap-3">
                    <div className='flex flex-1'>
                        <input type="text"
                            placeholder='Expiration date'
                            className="w-full pl-3 border-[1px] h-[60px] border-[#888] rounded-md" />
                    </div>
                    <div className='relative flex flex-1'>
                        <input type="text"
                            placeholder='CVV'
                            className="w-full pl-3 border-[1px] h-[60px] border-[#888] rounded-md" />
                        <FaRegCircleQuestion className='absolute top-4 right-5 text-2xl text-[#888]' />
                    </div>
                </div>
                <input type="text"
                    placeholder='Name on card'
                    className="w-full pl-3 border-[1px] h-[60px] border-[#888] rounded-md" />
                <div className='flex justify-between items-center bg-[#f5f5f5] p-3 rounded-md my-2'>
                    <div>
                        <h1 className='font-semibold'>EUR 9.99/month (pre-tax)</h1>
                        <p>Standard</p>
                    </div>
                    <a href="#" className='hover:underline text-blue-600 font-semibold'>Change</a>
                </div>
                <p className='text-sm text-[#666]'>By checking the checkbox below, you agree to our <span className='text-blue-600 hover:underline'> Terms of Use</span>, <span className='text-blue-600 hover:underline'> Privacy Statement</span>, and that you are over 18. Netflix will automatically continue your membership and charge the membership fee (currently EUR 9.99/month (pre-tax)) to your payment method until you cancel. You may cancel at any time to avoid future charges.</p>
                <div>
                    <label><input type="checkbox" className='mr-2 my-4'
                        checked={isChecked}
                        onChange={handleCheckboxChange} />I agree.</label>
                </div>
                <ToastContainer />
                {isChecked ?
                    <Link to={'/account'} className=" w-full font-semibold mb-6 my-4 bg-red-600 hover:bg-red-500 h-[55px] text-white text-2xl flex justify-center items-center rounded-sm">
                        Start Membership
                    </Link>
                    : <span onClick={handleClick} className=" w-full font-semibold mb-6 my-4 bg-red-600 hover:bg-red-500 h-[55px] text-white text-2xl flex justify-center items-center rounded-sm">
                        Start Membership
                    </span>
                }
            </div>
        </main>
    )
}

export default Creditoption