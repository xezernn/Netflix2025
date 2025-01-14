import { IoIosArrowForward } from "react-icons/io"
import { PiLockKey } from "react-icons/pi"
import { Link } from "react-router-dom"

function Step3() {
    return (
        <main className="px-4 flex flex-col max-w-[1100px] mx-auto justify-center items-center min-h-[700px]">
            <div className="max-w-[600px] mx-auto py-8 text-center ">
                <PiLockKey className="text-red-600 text-5xl w-full my-6" />
                <p className="uppercase text-sm">step <span className="font-semibold"> 3 </span> of <span className="font-semibold">3</span></p>
                <h1 className="text-3xl font-semibold text-[#333]">Choose how to pay</h1>
                <p className="text-lg py-5">Your payment is encrypted and you can change how you pay anytime.</p>
                <p className="font-semibold text-lg">Secure for peace of mind. <br />
                    Cancel easily online.</p>
                <Link to={'/signup/creditoption'} className="flex items-center min-h-[60px] rounded-md w-[90%] mx-auto justify-between px-8 border-2 border-[#c5c5c5] my-8 ">
                    <div className="flex items-center flex-col sm:flex-row gap-3 py-2">
                        <p>Credit or Denit Card</p>
                        <div className="flex gap-3">
                        <img className="w-[25px] h-[15px] sm:w-[40px] sm:h-[25px]" src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/VISA.png" alt="visa" />
                        <img className="w-[25px] h-[15px] sm:w-[40px] sm:h-[25px]" src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/MASTERCARD.png" alt="mastercard" />
                        <img className="w-[25px] h-[15px] sm:w-[40px] sm:h-[25px]" src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/AMEX.png" alt="amex" />
                        </div>
                    </div>
                    <IoIosArrowForward className="text-2xl" />
                </Link>
            </div>
        </main>
    )
}
export default Step3