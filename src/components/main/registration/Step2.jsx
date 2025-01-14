import { GoCheckCircle } from "react-icons/go"
import { LuCheck } from "react-icons/lu"
import { Link } from "react-router-dom"

function Step2() {
    return (
        <main className="px-4 flex flex-col max-w-[1100px] mx-auto justify-center items-center min-h-[700px] ">
            <div className="max-w-[600px] mx-auto py-8 text-center ">
                <GoCheckCircle className="text-red-600 text-5xl w-full my-6" />
                <p className="uppercase text-sm">step <span className="font-semibold"> 2 </span> of <span className="font-semibold">3</span></p>
                <h1 className="text-3xl font-semibold text-[#333]">Choose your plan.</h1>
                <div className="flex flex-col min-h-[250px] py-6 max-w-[300px] px-4 justify-between">
                    <div className="flex items-start">
                        <LuCheck className="text-red-600 text-4xl mr-4" />
                        <h3 className="text-xl text-left">No commitments, cancel anytime.</h3>
                    </div>
                    <div className="flex items-start">
                        <LuCheck className="text-red-600 text-4xl mr-4" />
                        <h3 className="text-xl text-left">Everything on Netflix for one low price.</h3>
                    </div>
                    <div className="flex items-start">
                        <LuCheck className="text-red-600 text-4xl mr-4" />
                        <h3 className="text-xl text-left">Unlimited viewing on all your devices.</h3>
                    </div>
                </div>
                <Link to={'/signup/planform'} className="relative w-full mb-6 my-4 bg-red-600 hover:bg-red-500 h-[55px] text-white text-2xl rounded-sm flex justify-center items-center">
                        Next
                </Link>
            </div>
        </main>
    )
}
export default Step2