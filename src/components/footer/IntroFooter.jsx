import { HiLanguage } from "react-icons/hi2"

function IntroFooter() {
  return (
    <footer className="bg-[#0f0f0f]">
      <div className="text-[#ffffffb3] max-w-[1100px] mx-auto px-6">
        <div className="py-10 ">
          <p className="underline cursor-pointer">Questions? Contact us.</p>
        </div>
        <div className=" underline text-[.9rem] grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <p className="cursor-pointer">FAQ</p>
          <p className="cursor-pointer">Help Center</p>
          <p className="cursor-pointer">Account</p>
          <p className="cursor-pointer">Media Center</p>
          <p className="cursor-pointer">Investor Relations</p>
          <p className="cursor-pointer">Ways to Watch</p>
          <p className="cursor-pointer">Privacy</p>
          <p className="cursor-pointer">Corporate Information</p>
          <p className="cursor-pointer">Speed Test</p>
          <p className="cursor-pointer">Only on Netflix</p>
          <p className="cursor-pointer">Help Center</p>
          <p className="cursor-pointer">Media Center</p>
          <p className="cursor-pointer">Jobs</p>
          <p className="cursor-pointer">Terms of Use</p>
          <p className="cursor-pointer">Cookie Preferences</p>
          <p className="cursor-pointer">Contact Us</p>
          <p className="cursor-pointer">Legal Notices</p>
        </div>
        <div className='relative py-10'>
          <HiLanguage className='text-white absolute top-[50px] left-2' />
          <select className='rounded-full h-[35px] w-[140px] pl-6 bg-[#191919b2] text-white outline-none border-[#dddddd4c] border-[1px]'>
            <option value="eng">English</option>
            <option value="ru">Russian</option>
            <option value="aze">Azerbaijani</option>
          </select>
        </div>
        <p className="py-8 text-[.9rem]">Netflix Azerbaijan</p>
      </div>
    </footer>
  )
}
export default IntroFooter