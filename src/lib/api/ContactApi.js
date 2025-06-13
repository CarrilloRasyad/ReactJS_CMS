export const contactCreate = async(token,{first_name, last_name, email, phone}) => {
    return await fetch(`${import.meta.env.VITE_PATH_API}/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            phone
        })
    });
}

export const contactList = async(token, {name, phone, email, page}) => {

    const url = new URL(`${import.meta.env.VITE_PATH_API}/contacts`);
    if (name) url.searchParams.append('name', name);
    if (phone) url.searchParams.append('phone', phone);
    if (email) url.searchParams.append('email', email);
    if (page) url.searchParams.append('page', page);

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    })
}

export const contactDelete = async(token, id) => {
    return await fetch(`${import.meta.env.VITE_PATH_API}/contacts/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    });
}