import './manage.css'
import { useState } from "react"
function Manage() {
    const [contact, setContact] = useState("")
    const [message, setMessage] = useState("")

    const printValues = e => {
        e.preventDefault();
        setContact("");
        setMessage("");
        console.log(contact);
        console.log(message);
    };
    return (
        <div className='manage'>
            <div className="header">
                <h2>Send a Reminder Sms</h2>
            </div>
            <form className='form' onSubmit={printValues}>
                <div className=''>
                    <label htmlFor="phone">To:</label>
                    <input type="text" name="phone" id="phone" className='phone-field'
                        placeholder='Enter receipient phone number'
                        onChange={(e) => setContact(e.target.value)}
                        value={contact}
                    />
                </div>
                <div className='message'>
                    <label htmlFor="msg">Message:</label>
                    <textarea name="message" id="msg"
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Send a message to any student or tutor in the Academy..."
                        value={message}>
                    </textarea>
                </div>
                <button className='send-btn'>send</button>
            </form>
        </div>
    )
}

export default Manage