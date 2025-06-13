import { useEffect, useState } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDelete, contactList } from "../../lib/api/ContactApi";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";

export default function ContactList() {

    const [token, _] = useLocalStorage("token", "");
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [contacts, setContacts] = useState([]);
    const [reload, setReload] = useState(false);

    function getPages() {
        const pages = [];
        for(let i = 1; i<=pages; i++ ) {
            pages.push(i);
        }
        return pages;
    }

    async function handleSearchContacts(e) {
        e.preventDefault();
        setPage(1);
        setReload(!reload);
    }

    async function handlePageChange(page) {
        setPage(page);
        setReload(!reload);
    }

    async function fetchContacts() {
        const response = await contactList(token,{name, phone, email, page});
        const responseBody = await response.json();
        console.log(responseBody);

        if(response.status === 200) {
            setContacts(responseBody.data);
            setTotalPage(responseBody.paging.total_page);
        } else {
            await alertError(responseBody.errors);
        }
    }

    async function handleContactDelete(id) {
        if (!await alertConfirm("Apakah anda yakin ingin menghapus kontak ini?")) {
            return;
        }

        const response = await contactDelete(token, id);
        const responseBody = await response.json();
        console.log(responseBody);

        if(response.status === 200) {
            await alertSuccess("Berhasil menghapus data kontak");
        } else {
            await alertError(responseBody.errors);
        }
    }

    useEffect(() => {
        fetchContacts()
        .then(() => console.log("Data kontak berhasil di ambil"));
    }, [reload])

    useEffectOnce(() => {
        const toggleButton = document.getElementById('toggleSearchForm');
        const searchFormContent = document.getElementById('searchFormContent');
        const toggleIcon = document.getElementById('toggleSearchIcon');

        searchFormContent.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out';
        searchFormContent.style.overflow = 'hidden';
        searchFormContent.style.maxHeight = '0px';
        searchFormContent.style.opacity = '0';
        searchFormContent.style.marginTop = '0';

        function toggleSearchForm() {
        if (searchFormContent.style.maxHeight !== '0px') {
            searchFormContent.style.maxHeight = '0px';
            searchFormContent.style.opacity = '0';
            searchFormContent.style.marginTop = '0';
            toggleIcon.classList.remove('fa-chevron-up');
            toggleIcon.classList.add('fa-chevron-down');
        } else {
            // Show the form
            searchFormContent.style.maxHeight = searchFormContent.scrollHeight + 'px';
            searchFormContent.style.opacity = '1';
            searchFormContent.style.marginTop = '1rem';
            toggleIcon.classList.remove('fa-chevron-down');
            toggleIcon.classList.add('fa-chevron-up');
        }
        }

        toggleButton.addEventListener('click', toggleSearchForm);

        return () => {
        toggleButton.removeEventListener('click', toggleSearchForm);
        }
    })
}