function Loading() {
    return (
        <div className="z-[999] bg-[#141414] h-screen w-full fixed top-0 xs:top-[70px] ">
            <div className="flex flex-col xs:flex-row gap-4 m-8 rounded absolute top-28 animate-pulse h-40 items-end">
                <div className="flex flex-col gap-4">
                    <div className="h-6 w-32 rounded-t bg-[#313131]"></div>
                    <div className="h-44 xs:h-28 w-60 sm:w-64  rounded-t bg-[#202020]"></div>
                </div>
                <div className="h-44 xs:h-28  w-60 sm:w-64 rounded-t bg-[#202020]"></div>
                <div className="h-44 xs:h-28  w-60 sm:w-64 rounded-t bg-[#202020]"></div>
            </div>
        </div>
    )
}
export default Loading