
import '../styles/Account.css'

function Account() {
    return(
        <div className="container-account">
            <h1>My account</h1>
            <form action="">
            <div className="col">
                    <p>First name</p>
            <input type="text" className='signUp-input' />
            </div>   <div className="col">
                    <p>Last name</p>
            <input type="text" className='signUp-input' />
            </div>   <div className="col">
                    <p>Email</p>
            <input type="text" className='signUp-input' />
            </div>
            <div className="col">
                    <p>City</p>
            <input type="text" className='signUp-input' />
            </div>
            <div className="col">
                    <p>Address</p>
            <input type="text" className='signUp-input' />
            </div>
            </form>
            <button id='updatePassBtn'>Update password</button>
            <button id='editBtn'>Edit my account</button>
        </div>
    )
}
export default Account