import { addUser } from "@/app/lib/actions"
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css"

const AddUserPage = () => {
    return (
        <div className={styles.container}>
            <form action={addUser} className={styles.form}>
                <input required type="text" placeholder="username" name="username" />
                <input required type="text" placeholder="email" name="email" />
                <input required type="password" placeholder="password" name="password" />
                <input type="text" placeholder="phone" name="phone" />
                <select name="isAdmin" id="isAdmin">
                    <option value={false}>is admin?</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <select name="isActive" id="isActive">
                    <option value={true}>is active?</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <textarea name="address" id="address" rows="16" placeholder="Address"></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddUserPage
