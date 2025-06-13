import { useState } from "react";
import { useLocalStorage } from "react-use";

export default function ContactList() {

    const [token, _] = useLocalStorage("token", "");
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [page, setPage] = useState('');

    function getPages() {
        const pages = [];
        for(let i = 1; i<=pages; i++ ) {
            pages.push(i);
        }
        return pages;
    }
}