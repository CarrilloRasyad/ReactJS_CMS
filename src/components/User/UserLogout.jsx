import { useNavigate } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertError } from "../../lib/alert";
import { userLogout } from "../../lib/api/UserApi";

export default function UserLogout() {
    const [token, setToken] = useLocalStorage("token", "");
    const navigate = useNavigate();

    async function handleLogout() {
        const response = await userLogout(token);
        const responseBody = await response.json();
        console.log(responseBody);
        console.log(response);

        if (response.status === 200) {
            setToken("");
            await navigate({
                pathname: "/login",
            });
        } else {
            await alertError(responseBody.errors);
        }
    }

    useEffectOnce(() => {
        handleLogout()
        .then(() => console.log("Berhasil keluar"));
    });

    return <>
    </>
}