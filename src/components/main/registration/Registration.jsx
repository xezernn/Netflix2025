import { useEffect } from "react"
import { Link } from "react-router-dom"

function Registration() {
    useEffect(() => {
        document.body.style.overflow = "auto";

    }, []);
    return (
        <main className="px-4 flex flex-col max-w-[1100px] mx-auto justify-center items-center min-h-[700px]">
            <div className="max-w-[500px] min-w-[150px] mx-auto flex justify-center flex-col items-center py-8 text-center ">
                <img className="xs:w-[260px] w-[180px] py-6" src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png" alt="devices" />
                <p className="uppercase text-sm pt-4">step <span className="font-semibold"> 1 </span> of <span className="font-semibold">3</span></p>
                <h1 className="text-xl xs:text-3xl font-semibold text-[#333] min-w-[140px] max-w-[400px]">Finish setting up your account</h1>
                <p className="min-w-[140px] max-w-[400px] py-4">Netflix is personalized for you. Create a password to watch on any device at any time.</p>
                <Link to={'/signup/password'} className="w-[140px] xs:w-[350px] mb-6 my-4 bg-red-600 hover:bg-red-500 h-[55px] text-white text-2xl rounded-sm flex justify-center items-center">
                    Next
                </Link>
            </div>
        </main>
    )
}
export default Registration