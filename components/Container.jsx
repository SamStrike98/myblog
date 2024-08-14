// CONTAINER COMPONENT TO KEEP CONTENTS TO A MAX OF 1280PX 
const Container = ({ children }) => {
    return (
        <div className="mx-auto h-fit w-full max-w-7xl flex flex-col flex-1 items-center">
            {children}
        </div>
    );
};

export default Container;