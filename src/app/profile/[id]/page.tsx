

const UserProfilePage=({params}: any) => {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray ">
            <h1>Profile</h1>
            <p className="text-4xl">Profile Page
            <span className="text-blue-500"> {params.id}</span></p>

        </div>
    )
}

export default UserProfilePage;