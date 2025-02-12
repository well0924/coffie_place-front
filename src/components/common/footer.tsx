
export default function footerPage() {
    return <>
        <footer className="bg-gray-800 text-white fixed bottom-0 inset-x-0 h-16 flex items-center">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center p-2 sm:p-4 md:p-6 text-sm sm:text-base">
                <p className="font-bold">Coffies</p>
                <p>
                    email:
                    <a href="mailto:well414965@gmail.com" className="text-blue-400 hover:underline ml-1">
                        well414965@gmail.com
                    </a>
                </p>
                <p>
                    github:
                    <a href="https://github.com/well4149" target="_blank" className="text-blue-400 hover:underline ml-1">
                        github.com/well4149
                    </a>
                </p>
            </div>
        </footer>
    </>

}