import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center bg-gray-100 p-5">
                <div className="max-w-4xl w-full p-5 bg-white shadow-lg rounded-lg">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
